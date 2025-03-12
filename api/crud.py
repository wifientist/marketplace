from sqlalchemy.orm import Session
import models, schemas
from datetime import datetime
from passlib.context import CryptContext



pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

### 🚀 Hash Password
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

### 🚀 Verify Password
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

### 🚀 Authenticate User
def authenticate_user(db: Session, email: str, password: str):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user



### 🚀 Create User
def create_user(db: Session, user: schemas.UserCreate):
    hashed_pw = hash_password(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_pw)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

### 🚀 Get User By ID
def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

### 🚀 Get User By Email
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()




# 🚀 Create Proposal
def create_proposal(db: Session, proposal: schemas.ProposalCreate, user_id: int):
    try:
        db_proposal = models.Proposal(
            title=proposal.title,
            description=proposal.description,
            budget=proposal.budget,
            location=proposal.location,
            deadline=proposal.deadline,
            created_by=1  #user_id,  # Ensure this is set
        )
        db.add(db_proposal)
        db.commit()
        db.refresh(db_proposal)
        return db_proposal
    except Exception as e:
        db.rollback()
        print(f"Error creating proposal: {e}")
        return None


# 🚀 Get All Proposals
def get_proposals(db: Session):
    return db.query(models.Proposal).all()

# 🚀 Get Single Proposal
def get_proposal(db: Session, proposal_id: int):
    return db.query(models.Proposal).filter(models.Proposal.id == proposal_id).first()



# 🚀 Create a Bid
def create_bid(db: Session, bid: schemas.BidCreate, user_id: int):
    db_bid = models.Bid(**bid.dict(), bidder_id=user_id, submitted_at=datetime.utcnow())
    db.add(db_bid)
    db.commit()
    db.refresh(db_bid)
    return db_bid

# 🚀 Get Bids for a Proposal
def get_bids_for_proposal(db: Session, proposal_id: int):
    return db.query(models.Bid).filter(models.Bid.proposal_id == proposal_id).all()

# 🚀 Get All Bids
def get_all_bids(db: Session):
    return db.query(models.Bid).all()