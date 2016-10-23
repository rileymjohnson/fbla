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
    register_blueprints(app)
    register_errorhandlers(app)
    return app

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

#register error handlers
def register_errorhandlers(app):
    def render_error(error):
        error_code = getattr(error, 'code', 500)
        return render_template("error.html", error=error_code)
    for errcode in [401, 404, 500]:
        app.errorhandler(errcode)(render_error)
    return None