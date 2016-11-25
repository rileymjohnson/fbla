#admin blueprint
from flask import Blueprint, render_template

blueprint = Blueprint('admin', __name__, url_prefix='/admin', static_folder='../static', template_folder='../templates')


@blueprint.route('/')
def indexRoute():
    return render_template("admin_pages/index.html", page="home")

@blueprint.route('/login')
def loginRoute():
	return render_template("admin_pages/login.html", page="login")

@blueprint.route('/chart')
def chartRoute():
	return render_template("admin_pages/chart.html", page="chart")

@blueprint.route('/form')
def formRoute():
	return render_template("admin_pages/form.html", page="form")