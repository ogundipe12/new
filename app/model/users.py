#!/usr/bin/env python3
from datetime import datetime
from sqlalchemy import UniqueConstraint
from app.app import db 

class Volunteer(db.Model):
    ''' A class that defines the registered users
    '''
    __tablename__ = 'volunteers'

    volunteer_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(50), nullable=False)
    other_name = db.Column(db.String(50), nullable=True)
    last_name = db.Column(db.String(50), nullable=False)
    sex = db.Column(db.String(10), nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    organization = db.Column(db.String(100), nullable=True)
    education = db.Column(db.String(20), nullable=False)
    contact_address = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    phone_number = db.Column(db.String(20), nullable=False)
    created_date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
