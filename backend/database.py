from sqlalchemy import create_engine, MetaData, Table
from sqlalchemy import Column, Integer, String

DATABASE_URL = "sqlite:///items.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

metadata = MetaData()
items = Table(
    "items",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("user_id", Integer, nullable=False)
)
users = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("username", String, nullable=False),
    Column("email", String, unique=True, nullable=False),
    Column("password", String, nullable=False)
)

metadata.create_all(engine)