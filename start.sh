#!/bin/bash

# Activate virtual environment
source myvenv/bin/activate

# run gunicorn
gunicorn 'app.app:create_app()'
