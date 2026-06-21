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
    Column("name", String)
)

metadata.create_all(engine)