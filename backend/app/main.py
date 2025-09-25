from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .routes import auth as auth_routes
from .routes import services as services_routes
from .routes import bookings as bookings_routes
from .routes import payments as payments_routes
from .config import settings


app = FastAPI(title="ShaadiBazaarHub API", version="0.1.0")

# Configure CORS with frontend URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "ok", "database": f"{settings.db_host}:{settings.db_port}/{settings.db_name}"}


app.include_router(auth_routes.router, prefix="/api/auth", tags=["auth"])
app.include_router(services_routes.router, prefix="/api/services", tags=["services"])
app.include_router(bookings_routes.router, prefix="/api/bookings", tags=["bookings"])
app.include_router(payments_routes.router, prefix="/api/payments", tags=["payments"])


