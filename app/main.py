# -*- coding: utf-8 -*-
"""The app module, containing the app factory function."""
from flask import Flask, render_template

from . import public, admin
from .extensions import *
from .config import Config

#creates and returna a flask app instance
def create_app(config_object=Config):
    app = Flask(__name__)
    app.config.from_object(config_object)
    register_extensions(app)
    register_jinja_extensions(app)
    register_blueprints(app)
    register_errorhandlers(app)
    setup_logging(app)
    return app

#set up gunicorn logging in production
def setup_logging(app):
    if not app.debug:
        # In production mode, add log handler to sys.stderr.
        app.logger.addHandler(logging.StreamHandler())
        app.logger.setLevel(logging.INFO)
    return None

#register flask extensions
def register_extensions(app):
    bcrypt.init_app(app)
    cache.init_app(app)
    db.init_app(app)
    csrf_protect.init_app(app)
    login_manager.init_app(app)
    debug_toolbar.init_app(app)
    migrate.init_app(app, db)
    return None

#register blue prints to the app
def register_blueprints(app):
    app.register_blueprint(public.views.blueprint)
    app.register_blueprint(admin.views.blueprint)
    return None

#add jinja extensions
def register_jinja_extensions(app):
    def get_year(*args): #returns the current year
        import datetime
        now = datetime.datetime.now()
        return now.year
    app.jinja_env.filters['currentYear'] = get_year #creates a filter that returns the current year
    return None

#register error handlers
def register_errorhandlers(app):
    def render_error(error):
        error_code = getattr(error, 'code', 500)
        return render_template("error.html", error=error_code), error_code
    for errcode in [401, 404, 500]:
        app.errorhandler(errcode)(render_error)
    return None