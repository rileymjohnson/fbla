#public blueprint
from flask import Blueprint, render_template, url_for

blueprint = Blueprint('public', __name__, url_prefix='/', static_folder='../static', template_folder='../templates')

@blueprint.route("/")
def indexRoute():
    return render_template("public_pages/index.html")

@blueprint.route("directions")
def directionsRoute():
    return render_template("public_pages/directions.html")
