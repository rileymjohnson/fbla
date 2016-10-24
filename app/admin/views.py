#admin blueprint
from flask import Blueprint, render_template

blueprint = Blueprint('admin', __name__, url_prefix='/admin', static_folder='../static', template_folder='../templates')


@blueprint.route('/')
def index():
    return render_template("admin_pages/index.html")
