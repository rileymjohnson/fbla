from app.main import create_app
from app.config import Config

app = create_app(Config)

#run dev server
from rocket import Rocket
server = Rocket(('127.0.0.1', 5000), 'wsgi', {"wsgi_app":app})
server.start()