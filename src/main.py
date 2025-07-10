from fastapi import FastAPI, Depends, HTTPException, Header, Path
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import auth
import schemas
from schemas import KanjiCreate, KanjiOut, KanjiCharacterOut
from models import Author, Kanji
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)


app = FastAPI()

# Configuração do CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite todas as origens
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos HTTP (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os headers
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/register/")
def register(author: schemas.AuthorCreate, db: Session = Depends(get_db)):

    #Verifica se o usuário já existe
    existing_user = db.query(Author).filter(Author.username == author.username).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Autor já existe")

    #Gerando o hash da senha do author
    hashed_password = auth.hash_password(author.password)

    #Cria novo autor
    db_author = Author(username=author.username,
        email = author.email, password=hashed_password)
    db.add(db_author)
    db.commit()

    #Cria o token JWT para o usuário recém criado
    token = auth.create_token({"sub": author.username},
                expires_delta=auth.timedelta(hours=2))
    
    return {"msg": "Usuário registrado com sucesso", "access_token": token}

@app.post("/login/")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(Author).filter(Author.username == user.username).first()

    if not db_user or not auth.verify_password(user.password,
                                db_user.password):
        raise HTTPException(status_code=400, detail="Credenciais inválidas")
        #Cria o token JWT para o usuário recém criado
    token = auth.create_token({"sub": db_user.username},
                expires_delta=auth.timedelta(hours=2))
    return {"access_token": token}

@app.post("/kanji/", response_model=KanjiOut)
def add_kanji(kanji: KanjiCreate, db: Session = Depends(get_db)):
    existing = db.query(Kanji).filter(Kanji.character == kanji.character).first()
    if existing:
        raise HTTPException(status_code=400, detail="Kanji já cadastrado.")
    
    db_kanji = Kanji(**kanji.dict())
    db.add(db_kanji)
    db.commit()
    db.refresh(db_kanji)
    return db_kanji


@app.get("/kanji/", response_model=list[KanjiOut])
def get_kanji_list(db: Session = Depends(get_db)):
    return db.query(Kanji).all()


@app.get("/kanji/level/{level}", response_model=list[KanjiOut])
def get_kanji_by_level(level: str, db: Session = Depends(get_db)):
    return db.query(Kanji).filter(Kanji.jlpt_level == level).all()


@app.get("/kanji/search/{character}", response_model=KanjiOut)
def search_kanji(character: str, db: Session = Depends(get_db)):
    kanji = db.query(Kanji).filter(Kanji.character == character).first()
    if not kanji:
        raise HTTPException(status_code=404, detail="Kanji não encontrado")
    return kanji

import random
@app.get("/kanji/quiz", response_model=list[KanjiOut], include_in_schema=False)
@app.get("/kanji/quiz/", response_model=list[KanjiOut])
def quiz_kanji(limit: int = 4, db: Session = Depends(get_db)):
    kanjis = db.query(Kanji).all()
    return random.sample(kanjis, min(len(kanjis), limit))



@app.get("/kanji/favorites", response_model=list[KanjiOut])
def list_favorites(
    db: Session = Depends(get_db),
    username: str = Depends(auth.get_current_user)
):
    user = db.query(Author).filter(Author.username == username).first()
    return user.favorite_kanji

@app.post("/kanji/favorites/{kanji_id}")
def favorite_kanji(
    kanji_id: int,
    db: Session = Depends(get_db),
    username: str = Depends(auth.get_current_user)
):
    user = db.query(Author).filter(Author.username == username).first()
    kanji = db.query(Kanji).filter(Kanji.id == kanji_id).first()

    if not kanji:
        raise HTTPException(status_code=404, detail="Kanji não encontrado")

    if kanji in user.favorite_kanji:
        raise HTTPException(status_code=400, detail="Kanji já favoritado")

    user.favorite_kanji.append(kanji)
    db.commit()
    return {"msg": f"Kanji {kanji.character} favoritado com sucesso"}

@app.delete("/kanji/favorites/remove/{kanji_id}")
def remove_favorite_kanji(
    kanji_id: int,
    db: Session = Depends(get_db),
    username: str = Depends(auth.get_current_user)
):
    user = db.query(Author).filter(Author.username == username).first()
    kanji = db.query(Kanji).filter(Kanji.id == kanji_id).first()

    if not kanji:
        raise HTTPException(status_code=404, detail="Kanji não encontrado")

    if kanji not in user.favorite_kanji:
        raise HTTPException(status_code=400, detail="Kanji não está na lista de favoritos")

    user.favorite_kanji.remove(kanji)
    db.commit()
    return {"msg": f"Kanji {kanji.character} removido dos favoritos com sucesso"}

@app.get("/kanji/{kanji_id}", response_model=KanjiOut)
def get_kanji_by_id(kanji_id: int = Path(..., title="The ID of the kanji to get"), db: Session = Depends(get_db)):
    kanji = db.query(Kanji).filter(Kanji.id == kanji_id).first()
    if not kanji:
        raise HTTPException(status_code=404, detail="Kanji não encontrado")
    return kanji


