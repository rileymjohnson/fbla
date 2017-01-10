#public blueprint
from flask import Blueprint, render_template, url_for, request
import MySQLdb as mdb

blueprint = Blueprint('public', __name__, url_prefix='/', static_folder='../static', template_folder='../templates')

#database query functions
def getHours(): #gets fec hours
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "select * from hours"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)
		rows = cur.fetchall()
	return rows

def addReservation(name, day, month, year, people, package, phone, email, details): #adds a reservation
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "insert into reservations (name, date, people, package, phone, email, details) values ('" + name + "', str_to_date('" + month + "/" + day + "/" + year + "', '%c/%e/%Y'), " + people + ", " + package + ", '" + phone + "', '" + email + "', '" + details + "');"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)




@blueprint.route("/")
def indexRoute():
    print getHours()
    return render_template("public_pages/index.html", page="home", hours=getHours())

@blueprint.route("directions")
def directionsRoute():
    return render_template("public_pages/directions.html", page="directions")

@blueprint.route("attractions")
def attractionsRoute():
    return render_template("public_pages/attractions.html", page="attractions")

@blueprint.route("food")
def foodRoute():
    return render_template("public_pages/food.html", page="food")

@blueprint.route("reservations")
def packagesRoute():
    return render_template("public_pages/packages.html", page="reservations")

@blueprint.route("contact")
def contactRoute():
    return render_template("public_pages/contact.html", page="contact us")

#api routes
@blueprint.route("api/register", methods=["POST"])
def apiAddReservation():
    if request.method == "POST":
        name = request.form["name"]
        day = request.form["day"]
        month = request.form["month"]
        year = request.form["year"]
        people = request.form["people"]
        package = request.form["package"]
        phone = request.form["phone"]
        email = request.form["email"]
        details = request.form["details"]
        addReservation(name, day, month, year, people, package, phone, email, details)
        return "true"