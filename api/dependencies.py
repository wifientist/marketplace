from fastapi import Depends, HTTPException, Security
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
import security, crud, models
from database import SessionLocal

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

### 🚀 Get Database Session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

### 🚀 Get Current User
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    email = security.decode_access_token(token)
    if not email:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user = crud.get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user
