import psycopg
from contextlib import asynccontextmanager
from .config import settings


async def get_db_conn():
    """FastAPI dependency that yields a fresh DB connection per request."""
    conn = await psycopg.AsyncConnection.connect(settings.database_url)
    try:
        yield conn
    finally:
        # Rollback any pending/aborted transaction and close safely
        try:
            if conn and not conn.closed:
                await conn.rollback()
        except Exception:
            pass
        try:
            if conn and not conn.closed:
                await conn.close()
        except Exception:
            pass


# Backwards-compatible context (not used by FastAPI dependencies directly)
@asynccontextmanager
async def get_db_conn_context():
    async with get_db_conn() as conn:
        yield conn
