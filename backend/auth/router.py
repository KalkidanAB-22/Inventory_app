#THIS is where login/register endpoints go
from fastapi import APIRouter, HTTPException
from sqlalchemy import insert, select
from database import engine, users
from .schemas import UserCreate, UserLogin
from .utils import hash_password, verify_password, create_access_token

router = APIRouter()

#REGISTER endpoint
@router.post("/register")
def register(user: UserCreate):

    with engine.connect() as conn:

        existing_user = conn.execute(
            select(users).where(users.c.email == user.email)
        ).fetchone()

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )

    hashed_pw = hash_password(user.password)

    query = insert(users).values(
        username=user.username,
        email=user.email,
        password=hashed_pw
    )

    with engine.begin() as conn:
        conn.execute(query)
        
    return {"message": "User created successfully"}

# LOGIN endpoint
@router.post("/login")
def login(user: UserLogin):

    with engine.connect() as conn:

        db_user = conn.execute(
            select(users).where(users.c.email == user.email)
        ).fetchone()

    # User not found
    if not db_user:
        raise HTTPException(
            status_code=400,
            detail="Invalid email or password"
        )

    # Check password
    if not verify_password(
        user.password,
        db_user._mapping["password"]
    ):
        raise HTTPException(
            status_code=400,
            detail="Invalid email or password"
        )

    # Create JWT token
    token = create_access_token(
        {"sub": db_user._mapping["email"]}
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }