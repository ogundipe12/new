#!/usr/bin/env python3
from flask import Flask
from app.config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# create a slqalchemy object
db = SQLAlchemy()

def create_app():
    # Load configuration from your Config class
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize the database with the app
    db.init_app(app)


    # Register the user Blueprint
    from app.controller.users_controller import user_bp
    app.register_blueprint(user_bp, url_prefix='/api')


     # Configure CORS to allow requests from any origin
    CORS(app, supports_credentials=True)


    # create the datebase tables
    with app.app_context():
        db.create_all()


    return app

if __name__ == '__main__':
    app = create_app()

    app.run(debug=True)
