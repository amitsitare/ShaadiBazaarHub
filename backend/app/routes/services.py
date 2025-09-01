from fastapi import APIRouter, Depends, HTTPException, status, Header
from typing import Optional, List

from ..db import get_db_conn
from ..schemas import ServiceCreate, ServicePublic
from .auth import get_current_user


router = APIRouter()


@router.post("/", response_model=ServicePublic)
async def create_service(data: ServiceCreate, payload=Depends(get_current_user), conn=Depends(get_db_conn)):
    if payload.get("role") != "provider":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Providers only")
    provider_id = int(payload["sub"])
    async with conn.cursor() as cur:
        await cur.execute(
            """
            INSERT INTO services (provider_id, name, description, price, photo_url, location)
            VALUES (%s, %s, %s, %s, %s, %s)
            RETURNING id, provider_id, name, description, price, photo_url, location
            """,
            (provider_id, data.name, data.description, data.price, data.photo_url, data.location),
        )
        row = await cur.fetchone()
        await conn.commit()
        return ServicePublic(**{
            "id": row[0],
            "provider_id": row[1],
            "name": row[2],
            "description": row[3],
            "price": float(row[4]),
            "photo_url": row[5],
            "location": row[6],
        })


@router.get("/", response_model=List[ServicePublic])
async def list_services(query: Optional[str] = None, location: Optional[str] = None, conn=Depends(get_db_conn)):
    base = "SELECT id, provider_id, name, description, price, photo_url, location FROM services"
    filters = []
    params = []
    if query:
        filters.append("(name ILIKE %s OR description ILIKE %s)")
        like = f"%{query}%"
        params.extend([like, like])
    if location:
        filters.append("location ILIKE %s")
        params.append(f"%{location}%")
    if filters:
        base += " WHERE " + " AND ".join(filters)
    base += " ORDER BY id DESC"
    async with conn.cursor() as cur:
        await cur.execute(base, params)
        rows = await cur.fetchall()
        return [
            ServicePublic(
                id=r[0], provider_id=r[1], name=r[2], description=r[3], price=float(r[4]), photo_url=r[5], location=r[6]
            ) for r in rows
        ]


@router.get("/my", response_model=List[ServicePublic])
async def get_my_services(payload=Depends(get_current_user), conn=Depends(get_db_conn)):
    if payload.get("role") != "provider":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Providers only")
    provider_id = int(payload["sub"])
    async with conn.cursor() as cur:
        await cur.execute(
            "SELECT id, provider_id, name, description, price, photo_url, location FROM services WHERE provider_id = %s ORDER BY id DESC",
            (provider_id,)
        )
        rows = await cur.fetchall()
        return [
            ServicePublic(
                id=r[0], provider_id=r[1], name=r[2], description=r[3], price=float(r[4]), photo_url=r[5], location=r[6]
            ) for r in rows
        ]


@router.get("/{service_id}", response_model=ServicePublic)
async def get_service(service_id: int, conn=Depends(get_db_conn)):
    async with conn.cursor() as cur:
        await cur.execute(
            "SELECT id, provider_id, name, description, price, photo_url, location FROM services WHERE id=%s",
            (service_id,),
        )
        row = await cur.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Service not found")
        return ServicePublic(
            id=row[0], provider_id=row[1], name=row[2], description=row[3], price=float(row[4]), photo_url=row[5], location=row[6]
        )


@router.put("/{service_id}", response_model=ServicePublic)
async def update_service(service_id: int, data: ServiceCreate, payload=Depends(get_current_user), conn=Depends(get_db_conn)):
    if payload.get("role") != "provider":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Providers only")
    provider_id = int(payload["sub"])
    async with conn.cursor() as cur:
        await cur.execute("SELECT provider_id FROM services WHERE id=%s", (service_id,))
        row = await cur.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Service not found")
        if row[0] != provider_id:
            raise HTTPException(status_code=403, detail="Not owner")
        await cur.execute(
            """
            UPDATE services SET name=%s, description=%s, price=%s, photo_url=%s, location=%s
            WHERE id=%s
            RETURNING id, provider_id, name, description, price, photo_url, location
            """,
            (data.name, data.description, data.price, data.photo_url, data.location, service_id),
        )
        row = await cur.fetchone()
        await conn.commit()
        return ServicePublic(
            id=row[0], provider_id=row[1], name=row[2], description=row[3], price=float(row[4]), photo_url=row[5], location=row[6]
        )


@router.delete("/{service_id}")
async def delete_service(service_id: int, payload=Depends(get_current_user), conn=Depends(get_db_conn)):
    if payload.get("role") != "provider":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Providers only")
    provider_id = int(payload["sub"])
    async with conn.cursor() as cur:
        await cur.execute("SELECT provider_id FROM services WHERE id=%s", (service_id,))
        row = await cur.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Service not found")
        if row[0] != provider_id:
            raise HTTPException(status_code=403, detail="Not owner")
        await cur.execute("DELETE FROM services WHERE id=%s", (service_id,))
        await conn.commit()
        return {"status": "deleted"}
