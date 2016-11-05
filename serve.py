"""
this server is for debugging
"""

from app.main import create_app
from app.config import Config

app = create_app(Config)
app.run(port=8000, host="0.0.0.0")

"""
#run dev server
from rocket import Rocket
import logging
import sys

# Setup logging
log = logging.getLogger('Rocket')
log.setLevel(logging.INFO)
log.addHandler(logging.StreamHandler(sys.stdout))
server = Rocket(('0.0.0.0', 5000), 'wsgi', {"wsgi_app":app})
server.start()
"""