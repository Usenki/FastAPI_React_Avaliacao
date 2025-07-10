from pydantic import BaseModel, EmailStr

class AuthorCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class KanjiBase(BaseModel):
    character: str
    meaning: str
    onyomi: str
    kunyomi: str
    jlpt_level: str

    
class KanjiCreate(KanjiBase):
    pass

class KanjiOut(KanjiBase):
    id: int
    class Config:
        orm_mode = True

class KanjiCharacterOut(BaseModel):
    character: str

    class Config:
        orm_mode = True
