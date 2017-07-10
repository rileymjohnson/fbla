#admin blueprint
from flask import Blueprint, render_template, redirect, session, request
import MySQLdb as mdb
import json
import hashlib

blueprint = Blueprint('admin', __name__, url_prefix='/admin', static_folder='../static', template_folder='../templates')

#database query functions
def getHours(): #gets fec hours
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "select * from hours"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)
		rows = cur.fetchall()
	return rows

def getReservations(): #gets fec reservations
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "select * from reservations where date > CURDATE()"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)
		rows = cur.fetchall()
	x = 0
	while x < len(rows):
		rows[x]["details"] = unicode(rows[x]["details"], "utf-8")
		x += 1
	return rows

def deleteReservation(i): #deletes fec reservations
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "delete from reservations where id = " + str(i)
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)

def updateDay(day, start, end, o): #gets fec hours
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "update hours set start = " + start + ", end = " + end + ", open = " + o + " where day = '" + day + "'"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)

def updatePassword(password):
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "update password set password = '" + hashlib.md5(password).hexdigest() + "'"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)

def updatePeople(people):
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "update people set people = " + str(people)
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)

def updatePhone(phone):
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "update phone set phone = '" + str(phone) + "'"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)

def updateEmail(email):
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "update email set email = '" + email + "'"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)

def getPassword():
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "select password from password"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)
		rows = cur.fetchall()
	return rows[0]["password"]

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

def getEmail():
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "select email from email"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)
		rows = cur.fetchall()
	return rows[0]["email"]

def getReservationsByMonth():
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "select months.id, months.month, count(reservations.id) count from months left outer join reservations on months.id = month(reservations.date) group by months.id order by months.id asc;"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)
		rows = cur.fetchall()
	return rows

def getReservationsByDay():
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "select days.id, days.day, count(reservations.id) count from days left outer join reservations on days.id = dayofweek(reservations.date) group by days.id order by days.id asc;"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)
		rows = cur.fetchall()
	return rows

def getPackagesByType():
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "select packages.id - 1 id, packages.package, count(reservations.id) count from packages left outer join reservations on packages.id - 1 = reservations.package group by packages.id order by packages.id asc;"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)
		rows = cur.fetchall()
	return rows

def getReservationsByCounty():
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "SELECT county, COUNT(*) count FROM reservations where county <> 'NULL' GROUP BY county ORDER BY count asc;"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)
		rows = cur.fetchall()
	return rows

def getMessages():
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	con.set_character_set('utf8')
	query = "select *, DATE_FORMAT(ts, '%c/%e/%Y') smalldate,DATE_FORMAT(ts, '%l:%i %p') time, DATE_FORMAT(ts, '%M %e, %Y') date from messages order by ts desc;"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute('SET NAMES utf8;')
		cur.execute('SET CHARACTER SET utf8;')
		cur.execute('SET character_set_connection=utf8;')
		cur.execute(query)
		rows = cur.fetchall()
	x = 0
	while x < len(rows):
		rows[x]["message"] = unicode(rows[x]["message"], "utf-8")
		x += 1
	return rows

def numberOfMessages():
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "select count(*) count from messages"
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)
		rows = cur.fetchall()
	return int(rows[0]["count"])

def deleteMessage(i):
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "delete from messages where id = " + str(i)
	with con:
		cur = con.cursor(mdb.cursors.DictCursor)
		cur.execute(query)

#session functions
def login():
	session["admin"] = True
	
def logout():
	session.pop("admin")

@blueprint.route('/')
def indexRoute():
	if "admin" in session:
		return render_template("admin_pages/index.html", page="home", messageNum=numberOfMessages(), reservationsByMonth=getReservationsByMonth(), reservationsByDay=getReservationsByDay(), packagesByType=getPackagesByType(), reservationsByCounty=getReservationsByCounty())
	else:
		return redirect("/admin/login")

@blueprint.route('/hours')
def formRoute():
	if "admin" in session:
		return render_template("admin_pages/hours.html", page="hours", messageNum=numberOfMessages(), hours=getHours())
	else:
		return redirect("/admin/login")

@blueprint.route('/reservations')
def reservationsRoute():
	if "admin" in session:
		return render_template("admin_pages/reservations.html", page="reservations", messageNum=numberOfMessages(), reservations=getReservations())
	else:
		return redirect("/admin/login")

@blueprint.route('/settings')
def settingsRoute():
	if "admin" in session:
		return render_template("admin_pages/settings.html", page="settings", messageNum=numberOfMessages(), people=getPeople(), phone=getPhone(), email=getEmail())
	else:
		return redirect("/admin/login")

@blueprint.route('/messages')
def messagesRoute():
	if "admin" in session:
		return render_template("admin_pages/messages.html", page="messages", messageNum=numberOfMessages(), messages=getMessages())
	else:
		return redirect("/admin/login")

#login routes
@blueprint.route('/login', methods=["GET", "POST"])
def loginRoute():
	if "admin" not in session:
		if request.method == "GET":
			error = False
			try:
				request.args["password"]
				error = True
			except:
				pass
			return render_template("admin_pages/login.html", page="login", error=error)
		if request.method == "POST":
				if hashlib.md5(request.form["password"]).hexdigest() == getPassword():
					login()
					return redirect("/admin")
				else:
					return redirect("/admin/login?password=false")
	else:
		return redirect("/admin")

@blueprint.route('/logout')
def logoutRoute():
	logout()
	return redirect("/admin/login")

#api routes
@blueprint.route('/api/updatehours', methods=["POST"])
def apiUpdateHoursRoute():
	if "admin" in session:
		hours = json.loads(request.form["hours"])
		updateDay("mon", hours["mon"]["start"], hours["mon"]["end"], hours["mon"]["open"])
		updateDay("tue", hours["tue"]["start"], hours["tue"]["end"], hours["tue"]["open"])
		updateDay("wed", hours["wed"]["start"], hours["wed"]["end"], hours["wed"]["open"])
		updateDay("thu", hours["thu"]["start"], hours["thu"]["end"], hours["thu"]["open"])
		updateDay("fri", hours["fri"]["start"], hours["fri"]["end"], hours["fri"]["open"])
		updateDay("sat", hours["sat"]["start"], hours["sat"]["end"], hours["sat"]["open"])
		updateDay("sun", hours["sun"]["start"], hours["sun"]["end"], hours["sun"]["open"])
		return "true"
	else:
		return "false"

@blueprint.route('/api/deletereservation', methods=["POST"])
def apiDeleteReservationRoute():
	if "admin" in session:
		deleteReservation(request.form["id"])
		return "true"
	else:
		return "false"

@blueprint.route('/api/updatepassword', methods=["POST"])
def apiUpdatePasswordRoute():
	if "admin" in session:
		updatePassword(request.form["password"])
		return "true"
	else:
		return "false"

@blueprint.route('/api/updatepeople', methods=["POST"])
def apiUpdatePeopleRoute():
	if "admin" in session:
		updatePeople(request.form["people"])
		return "true"
	else:
		return "false"

@blueprint.route('/api/updatephone', methods=["POST"])
def apiUpdatePhoneRoute():
	if "admin" in session:
		updatePhone(request.form["phone"])
		return "true"
	else:
		return "false"

@blueprint.route('/api/updateemail', methods=["POST"])
def apiUpdateEmailRoute():
	if "admin" in session:
		updateEmail(request.form["email"])
		return "true"
	else:
		return "false"

@blueprint.route('/api/deletemessage', methods=["POST"])
def apiDeleteMessageRoute():
	if "admin" in session:
		deleteMessage(request.form["id"])
		return "true"
	else:
		return "false"

