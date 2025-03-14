from fastapi import APIRouter, Depends, HTTPException
from models import User
from security import require_role
from dependencies import get_current_user

router = APIRouter() #dependencies=[Depends(get_current_user)])

# 🛡️ Protected profile endpoint
@router.get("/user_profile")
def user_profile(user: User = Depends(get_current_user)):
    return {"email": user.email, "role": user.role}

@router.get("/admin")
def admin_dashboard(user: dict = Depends(require_role("admin"))):
    return {"message": "Approved Admin!"}

# 🔥 Admin-only endpoint
# @router.get("/admin")
# def get_admin_data(user: User = Depends(require_role("admin"))):
#     return {"message": "Welcome, Admin!"}

# @protected_router.get("/loggedin")
# def dashboard(user: str = Depends(get_current_user)):
#     return {"message": f"Welcome {user}, this is a protected page"}