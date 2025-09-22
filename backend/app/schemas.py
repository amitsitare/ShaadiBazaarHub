from typing import Optional, Literal
from datetime import date
from pydantic import BaseModel, EmailStr


UserRole = Literal["provider", "customer"]


class UserBase(BaseModel):
    name: str
    email: EmailStr
    mobile: str
    whatsapp_number: Optional[str] = None
    address: str
    role: UserRole


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserPublic(BaseModel):
    id: int
    name: str
    email: EmailStr
    mobile: str
    whatsapp_number: Optional[str] = None
    address: str
    role: UserRole


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ServiceBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    photo_url: Optional[str] = None
    location: str


class ServiceCreate(ServiceBase):
    pass


class ServicePublic(ServiceBase):
    id: int
    provider_id: int


class BookingBase(BaseModel):
    service_id: int
    event_date: date
    quantity: Optional[int] = 1
    notes: Optional[str] = None


class BookingCreate(BookingBase):
    pass


class BookingPublic(BookingBase):
    id: int
    customer_id: int
    status: Literal["pending", "confirmed", "cancelled"]



