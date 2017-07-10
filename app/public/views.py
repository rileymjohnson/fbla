#public blueprint
from flask import Blueprint, render_template, url_for, request
import MySQLdb as mdb
import geocoder
import requests

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

def addReservation(name, day, month, year, people, package, phone, email, details, county): #adds a reservation
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	con.set_character_set('utf8')
	query = "insert into reservations (name, date, people, package, phone, email, details, county) values ('" + name + "', str_to_date('" + month + "/" + day + "/" + year + "', '%c/%e/%Y'), " + people + ", " + package + ", '" + phone + "', '" + email + "', '" + details + "', '" + county + "');"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute('SET NAMES utf8;')
		cur.execute('SET CHARACTER SET utf8;')
		cur.execute('SET character_set_connection=utf8;')
		cur.execute(query)

def peopleOnDay(day, month, year): #adds a reservation
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "select COALESCE(SUM(people),0) people from reservations where date = str_to_date('" + month + "/" + day + "/" + year + "', '%c/%e/%Y');"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)
		rows = cur.fetchall()
	return int(rows[0]["people"])

def getPeople():
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "select people from people"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)
		rows = cur.fetchall()
	return rows[0]["people"]

def getPhone():
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "select phone from phone"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)
		rows = cur.fetchall()
	return rows[0]["phone"]

def checkAvailable(day):
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "select open from hours where day = " + str(day)
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)
		rows = cur.fetchall()
	if rows[0]["open"] == 0:
		return False
	return True

def getEmail():
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "select email from email"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)
		rows = cur.fetchall()
	return rows[0]["email"]

def badDays():
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "select if(id =7, 1, id+1) id from hours where open = 0;"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)
		rows = cur.fetchall()
	return rows

def addMesage(name, email, phone, message):
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	con.set_character_set('utf8')
	query = "insert into messages (name,email,phone,message) values('" + name + "', '" + email + "', '" + phone + "', '" + message + "')"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute('SET NAMES utf8;')
		cur.execute('SET CHARACTER SET utf8;')
		cur.execute('SET character_set_connection=utf8;')
		cur.execute(query)

def getCountyCodeByIp(ip):
	try:
		g = geocoder.ipinfo(ip)
		coords = g.latlng
		r = requests.get("https://data.fcc.gov/api/block/find?format=json&latitude=" + str(coords[0]) + "&longitude=" + str(coords[1]) + "&showall=true")
		fips = r.json()["County"]["FIPS"]
		stateFips = r.json()["State"]["FIPS"]
		if int(stateFips) != 48:
			return False
		if fips[:2] == stateFips:
			return "us-tx-" + str(fips[2:])
		else:
			return False
	except:
		return False



@blueprint.route("/")
def indexRoute():
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
	return render_template("public_pages/packages.html", page="reservations", badDays=badDays())

@blueprint.route("contact")
def contactRoute():
	return render_template("public_pages/contact.html", page="contact us", email=getEmail(), phone=getPhone())

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
		if package == "none":
			package = "0"
		phone = request.form["phone"]
		email = request.form["email"]
		details = request.form["details"]
		county = getCountyCodeByIp(request.remote_addr)
		if not county:
			county = "NULL"
		amountOfPeople = peopleOnDay(day, month, year) + int(people)
		if amountOfPeople > int(getPeople()):
			return "full"
		addReservation(name, day, month, year, people, package, phone, email, details, county)
		return "true"

@blueprint.route("api/contact", methods=["POST"])
def apiContact():
	if request.method == "POST":
		name = request.form["name"]
		email = request.form["email"]
		phone = request.form["phone"]
		message = request.form["message"]
		addMesage(name, email, phone, message)
		return "true"