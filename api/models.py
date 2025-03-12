from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime
from sqlalchemy.orm import relationship
import datetime
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="user", nullable=False)  # "user" or "admin"

    # Relationships
    proposals = relationship("Proposal", back_populates="creator", cascade="all, delete")
    bids = relationship("Bid", back_populates="bidder", cascade="all, delete")


class Proposal(Base):
    __tablename__ = "proposals"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    budget = Column(Float)
    location = Column(String)
    deadline = Column(DateTime)
    created_by = Column(Integer, ForeignKey("users.id"))

    # Relationships
    creator = relationship("User", back_populates="proposals")
    bids = relationship("Bid", back_populates="proposal", cascade="all, delete")


class Bid(Base):
    __tablename__ = "bids"

    id = Column(Integer, primary_key=True, index=True)
    proposal_id = Column(Integer, ForeignKey("proposals.id"))
    bidder_id = Column(Integer, ForeignKey("users.id"))
    amount = Column(Float)
    message = Column(String)
    submitted_at = Column(DateTime, default=datetime.datetime.utcnow)

    # Relationships
    proposal = relationship("Proposal", back_populates="bids")
    bidder = relationship("User", back_populates="bids")
