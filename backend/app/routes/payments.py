from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
import hmac
import hashlib
import razorpay

from ..config import settings
from .auth import get_current_user


router = APIRouter()


class CreateOrderRequest(BaseModel):
    amount: int  # in paise
    currency: str = "INR"
    receipt: str


class VerifyRequest(BaseModel):
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str


def get_client() -> razorpay.Client:
    if not settings.razorpay_key_id or not settings.razorpay_key_secret:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Razorpay is not configured"
        )
    return razorpay.Client(auth=(settings.razorpay_key_id, settings.razorpay_key_secret))


@router.get("/config")
async def get_config():
    if not settings.razorpay_key_id:
        raise HTTPException(status_code=503, detail="Razorpay key not configured")
    return {"key_id": settings.razorpay_key_id}


@router.post("/create-order")
async def create_order(body: CreateOrderRequest, _=Depends(get_current_user)):
    if body.amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid amount")
    client = get_client()
    try:
        order = client.order.create({
            "amount": body.amount,
            "currency": body.currency,
            "receipt": body.receipt,
            "payment_capture": 1,
        })
        return order
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Failed to create order: {e}")


@router.post("/verify")
async def verify_signature(body: VerifyRequest, _=Depends(get_current_user)):
    # Verify signature: generated_signature = HMAC_SHA256(order_id|payment_id, secret)
    try:
        payload = f"{body.razorpay_order_id}|{body.razorpay_payment_id}".encode()
        expected = hmac.new(settings.razorpay_key_secret.encode(), payload, hashlib.sha256).hexdigest()
        if hmac.compare_digest(expected, body.razorpay_signature):
            return {"status": "verified"}
        raise HTTPException(status_code=400, detail="Signature verification failed")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Verification error: {e}")


