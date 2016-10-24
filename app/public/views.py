#public blueprint
from flask import Blueprint, render_template

blueprint = Blueprint('public', __name__, url_prefix='/', static_folder='../static', template_folder='../templates')


@blueprint.route("/")
def index():
    return render_template("public_pages/index.html")