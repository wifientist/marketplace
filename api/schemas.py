from pydantic import BaseModel, EmailStr
from datetime import datetime

### 🚀 Token Response
class TokenResponse(BaseModel):
    access_token: str
    token_type: str

### 🚀 User Schemas
class UserBase(BaseModel):
    email: EmailStr
    role: str = "user"  # Default role

class UserCreate(UserBase):
    password: str  # Only used when creating a user

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True  # Enables ORM conversion

class UserAuth(BaseModel):
    email: EmailStr
    password: str


### 🚀 Proposal Schemas
class ProposalBase(BaseModel):
    title: str
    description: str
    budget: float
    location: str
    deadline: datetime

class ProposalCreate(ProposalBase):
    title: str
    description: str
    budget: float
    location: str
    deadline: datetime

class ProposalResponse(ProposalBase):
    id: int
    created_by: int

    class Config:
        orm_mode = True

### 🚀 Bid Schemas
class BidBase(BaseModel):
    proposal_id: int
    amount: float
    message: str

class BidCreate(BidBase):
    pass

class BidResponse(BidBase):
    id: int
    bidder_id: int
    submitted_at: datetime

    class Config:
        orm_mode = True
