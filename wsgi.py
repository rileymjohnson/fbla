"""
production server
"""

from app.main import create_app
from app.config import Config

app = create_app(Config) #flask app instance