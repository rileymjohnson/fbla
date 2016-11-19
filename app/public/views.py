#public blueprint
from flask import Blueprint, render_template, url_for

blueprint = Blueprint('public', __name__, url_prefix='/', static_folder='../static', template_folder='../templates')

@blueprint.route("/")
def indexRoute():
    return render_template("public_pages/index.html", page="home")

@blueprint.route("directions")
def directionsRoute():
    return render_template("public_pages/directions.html", page="directions")

@blueprint.route("attractions")
def attractionsRoute():
    return render_template("public_pages/attractions.html", page="attractions")

@blueprint.route("food")
def foodRoute():
    return render_template("public_pages/food.html", page="food")

@blueprint.route("packages")
def packagesRoute():
    return render_template("public_pages/packages.html", page="packages")

@blueprint.route("contact")
def contactRoute():
    return render_template("public_pages/contact.html", page="contact us")