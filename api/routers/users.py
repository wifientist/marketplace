from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud, schemas
from dependencies import get_db

router = APIRouter(prefix="/users", tags=["Users"])

### 🚀 Create New User
@router.post("/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if crud.get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email already registered")

    return crud.create_user(db, user)

### 🚀 Get User by ID
@router.get("/{user_id}", response_model=schemas.UserResponse)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = crud.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user
