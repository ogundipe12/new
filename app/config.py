#!/usr/bin/env python3

# Import 
import os

class Config:
    '''Base configuration class
    '''
    # database URI for SQLAlchemy
    SQLALCHEMY_DATABASE_URI = 'postgresql://vo_user:y6ewqhkmCX72V5Axs09wSbHTBUqV7yJ8@dpg-cl4gek9828mc73cssa60-a/vo'

    # Disable track modifications to avoid warning
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class ProductionConfig(Config):
    '''Production configuration class
    '''
    DEBUG = False
    SQLALCHEMY_DATABASE_URI = 'postgresql://vo_user:y6ewqhkmCX72V5Axs09wSbHTBUqV7yJ8@dpg-cl4gek9828mc73cssa60-a/vo'

    # Mapping config names to their respective classes
config_map = {
    'production': ProductionConfig,
}

# Set the active configuration based on an environment variable
active_env = os.getenv('FLASK_ENV', 'production')
config = config_map[active_env]
