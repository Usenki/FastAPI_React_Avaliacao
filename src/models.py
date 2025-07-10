from sqlalchemy import (Column, Integer, String, ForeignKey, 
    Text, DateTime, Table)
from sqlalchemy.orm import relationship
from database import Base

favorite_kanji_table = Table(
    "favorite_kanji",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("authors.id")),
    Column("kanji_id", Integer, ForeignKey("kanji.id")))

class Author(Base):
    __tablename__ = "authors"
    id = Column(Integer, primary_key= True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    favorite_kanji = relationship("Kanji", secondary=favorite_kanji_table, back_populates="favorited_by")


class Kanji(Base):
    __tablename__ = "kanji"
    id = Column(Integer, primary_key=True, index=True)
    character = Column(String, unique=True, index=True)
    meaning = Column(String)
    onyomi = Column(String) 
    kunyomi = Column(String) 
    jlpt_level = Column(String) 
    favorited_by = relationship("Author", secondary=favorite_kanji_table, back_populates="favorite_kanji")
