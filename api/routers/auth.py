from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud, schemas, security
from dependencies import get_db
from datetime import timedelta

router = APIRouter(prefix="/auth", tags=["Authentication"])

### 🚀 Login Route
@router.post("/login", response_model=schemas.TokenResponse)
def login(user_data: schemas.UserAuth, db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, user_data.email, user_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = security.create_access_token(
        data={"sub": user.email}, expires_delta=timedelta(minutes=60)
    )
    return {"access_token": access_token, "token_type": "bearer"}
