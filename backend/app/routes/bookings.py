from fastapi import APIRouter, Depends, HTTPException, status
from typing import List

from ..db import get_db_conn
from ..schemas import BookingCreate, BookingPublic
from .auth import get_current_user


router = APIRouter()


@router.post("/", response_model=BookingPublic)
async def create_booking(data: BookingCreate, payload=Depends(get_current_user), conn=Depends(get_db_conn)):
    if payload.get("role") != "customer":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Customers only")
    customer_id = int(payload["sub"])
    async with conn.cursor() as cur:
        await cur.execute(
            """
            INSERT INTO bookings (service_id, customer_id, event_date, quantity, notes, status)
            VALUES (%s, %s, %s, %s, %s, 'pending')
            RETURNING id, service_id, customer_id, event_date, quantity, notes, status
            """,
            (data.service_id, customer_id, data.event_date, data.quantity, data.notes),
        )
        row = await cur.fetchone()
        await conn.commit()
        return BookingPublic(
            id=row[0], service_id=row[1], customer_id=row[2], event_date=str(row[3]), quantity=row[4], notes=row[5], status=row[6]
        )


@router.get("/my", response_model=List[BookingPublic])
async def my_bookings(payload=Depends(get_current_user), conn=Depends(get_db_conn)):
    role = payload.get("role")
    user_id = int(payload["sub"])
    async with conn.cursor() as cur:
        if role == "customer":
            await cur.execute(
                "SELECT id, service_id, customer_id, event_date, quantity, notes, status FROM bookings WHERE customer_id=%s ORDER BY id DESC",
                (user_id,),
            )
        else:
            # provider: bookings for their services
            await cur.execute(
                """
                SELECT b.id, b.service_id, b.customer_id, b.event_date, b.quantity, b.notes, b.status
                FROM bookings b
                JOIN services s ON s.id = b.service_id
                WHERE s.provider_id = %s
                ORDER BY b.id DESC
                """,
                (user_id,),
            )
        rows = await cur.fetchall()
        return [
            BookingPublic(
                id=r[0], service_id=r[1], customer_id=r[2], event_date=str(r[3]), quantity=r[4], notes=r[5], status=r[6]
            ) for r in rows
        ]



