#!/usr/bin/env python3
from flask import Blueprint, request, jsonify
from app.app import create_app, db
from datetime import datetime
from sqlalchemy.exc import SQLAlchemyError
from app.model.users import Volunteer
import phonenumbers
from phonenumbers.phonenumberutil import NumberParseException


user_bp = Blueprint('user', __name__)

# Create a Flask application
app = create_app()

@user_bp.route('/submit', methods=['POST'])
def submit():
    '''a route that handles user registration
    '''
    try:
        data = request.json
        # Extract registration data from JSON
        first_name = data.get('first_name', None)
        other_name = data.get('other_name', None)
        last_name = data.get('last_name', None)
        sex = data.get('sex', None)
        date_of_birth = data.get('date_of_birth', None)
        organization = data.get('organization', None)
        education = data.get('education', None)
        contact_address = data.get('contact_address', None)
        email = data.get('email', None)
        phone_number = data.get('phone_number', None)

        # Validate and format the phone number
        formatted_number = None
        if phone_number is not None:
            try:
                parsed_number = phonenumbers.parse(phone_number)
                if phonenumbers.is_valid_number(parsed_number):
                    formatted_number = phonenumbers.format_number(parsed_number, phonenumbers.PhoneNumberFormat.E164)
                else:
                    return jsonify({'error': 'Invalid phone number format'}), 400
            except NumberFormatException as e:
                if e.error_type == NumberParseException.INVALID_COUNTRY_CODE:
                    return jsonify({'error': 'Invalid phone number format'}), 400


        # Create a new Volunteer object
        new_volunteer = Volunteer(
            first_name=first_name,
            other_name=other_name,
            last_name=last_name,
            sex=sex,
            date_of_birth=date_of_birth,
            organization=organization,
            education=education,
            contact_address=contact_address,
            email=email,
            phone_number=formatted_number,
            created_date=datetime.utcnow()
        )

        # Add the new user to the database
        db.session.add(new_volunteer)
        db.session.commit()

        # Return a JSON response with a success message
        return jsonify({'message': "User registration Successful!"}), 200

    except KeyError as e:
        # Handle missing keys in the JSON data
        return jsonify({'error': f'Missing key in JSON data: {str(e)}'}), 400

    except SQLAlchemyError as e:
        # Handle database issues (connection or constraint violations)
        db.session.rollback()
        return jsonify({'error': f'Database Error: {str(e)}'}), 500
