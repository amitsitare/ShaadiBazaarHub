import psycopg
from contextlib import asynccontextmanager
from .config import settings

# Global connection pool
_pool = None

async def create_pool():
    global _pool
    if _pool is None:
        _pool = await psycopg.AsyncConnection.connect(settings.database_url)
    return _pool

async def get_db_conn():
    """Get a database connection from the pool"""
    return await create_pool()

@asynccontextmanager
async def get_db_conn_context():
    """Context manager for database connections (for manual use if needed)"""
    conn = await create_pool()
    try:
        yield conn
    finally:
        # Don't close the connection as it's from the pool
        pass
