# -*- coding: utf-8 -*-
"""The app module, containing the app factory function."""
from flask import Flask, render_template, Markup

from . import public, admin
from .extensions import *
from .config import Config

#extensions
def getPackage(num):
    packages = {
        "0": "No Package",
        "1": "Basic Package",
        "2": "Deluxe Package",
        "3": "Ultimate Blast Package",
        "4": "Party Package",
        "5": "Holiday Package",
        "6": "Behind the Scenes Package"
    }
    return packages[str(num)]

def formatHours(hour):
    if hour <= 12:
        return str(hour) + "A.M."
    else:
        return str(hour - 12) + "P.M."

_js_escapes = {
        '\\': '\\u005C',
        '\'': '\\u0027',
        '"': '\\u0022',
        '>': '\\u003E',
        '<': '\\u003C',
        '&': '\\u0026',
        '=': '\\u003D',
        '-': '\\u002D',
        ';': '\\u003B',
        u'\u2028': '\\u2028',
        u'\u2029': '\\u2029'
}
# Escape every ASCII character with a value less than 32.
_js_escapes.update(('%c' % z, '\\u%04X' % z) for z in xrange(32))
def jinja2_escapejs_filter(value):
        retval = []
        for letter in value:
                if _js_escapes.has_key(letter):
                        retval.append(_js_escapes[letter])
                else:
                        retval.append(letter)

        return Markup("".join(retval))

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
    app.jinja_env.filters['escapejs'] = jinja2_escapejs_filter
    app.jinja_env.globals.update(formatHours=formatHours)
    app.jinja_env.globals.update(getPackage=getPackage)
    return None

#register error handlers
def register_errorhandlers(app):
    def render_error(error):
        error_code = getattr(error, 'code', 500)
        return render_template("error.html", error=error_code), error_code
    for errcode in [401, 404, 500]:
        app.errorhandler(errcode)(render_error)
    return None