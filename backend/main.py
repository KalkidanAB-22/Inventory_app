from fastapi import FastAPI
from pydantic import BaseModel, Field
from sqlalchemy import select, insert, update, delete
from database import engine, items, users
from fastapi.middleware.cors import CORSMiddleware
from auth.router import router as auth_router
from fastapi import Depends
from auth.dependencies import get_current_user

app = FastAPI()

app.include_router(auth_router, prefix="/auth")

# Model
class Item(BaseModel):
    name: str = Field(min_length=1)


# Root
@app.get("/")
def home():
    return {"message": "Hello FastAPI"}


# CREATE
@app.post("/items")
def create_item(
    item: Item,
    current_user: str = Depends(get_current_user)
):

    with engine.connect() as conn:

        user = conn.execute(
            select(users).where(
                users.c.email == current_user
            )
        ).fetchone()

    query = insert(items).values(
        name=item.name,
        user_id=user._mapping["id"]
    )

    with engine.begin() as conn:
        conn.execute(query)

    return {"message": "Item saved"}


# READ
@app.get("/items")
def get_items(
    current_user: str = Depends(get_current_user)
):

    with engine.connect() as conn:

        user = conn.execute(
            select(users).where(
                users.c.email == current_user
            )
        ).fetchone()

        result = conn.execute(
            select(items).where(
                items.c.user_id == user._mapping["id"]
            )
        )

        data = result.fetchall()

    return [dict(row._mapping) for row in data]

# UPDATE
@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):

    query = (
        update(items)
        .where(items.c.id == item_id)
        .values(name=item.name)
    )

    with engine.begin() as conn:
        result = conn.execute(query)

    return {
        "message": "Item updated",
        "rows_affected": result.rowcount
    }


# DELETE
@app.delete("/items/{item_id}")
def delete_item(item_id: int):

    query = delete(items).where(items.c.id == item_id)

    with engine.begin() as conn:
        conn.execute(query)

    return {"message": "Item deleted"}


# DEBUG
@app.get("/debug")
def debug():

    with engine.connect() as conn:
        result = conn.execute(select(items))
        rows = result.fetchall()

    return {
        "columns": list(items.columns.keys()),
        "rows": [dict(row._mapping) for row in rows]
    }

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/items/protected")
def protected_route(current_user: str = Depends(get_current_user)):
    return {
        "message": "You are logged in!",
        "user": current_user
    }