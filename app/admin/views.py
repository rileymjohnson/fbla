#admin blueprint
from flask import Blueprint, render_template, redirect, session, request
import MySQLdb as mdb
import json

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

def updateDay(day, start, end, o): #gets fec hours
	con = mdb.connect('localhost', 'root', 'visibilitymatters', 'fbla')
	query = "update hours set start = " + start + ", end = " + end + ", open = " + o + " where day = '" + day + "'"
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
        return render_template("admin_pages/index.html", page="home")
    else:
        return redirect("/admin/login")

@blueprint.route('/hours')
def formRoute():
    if "admin" in session:
        return render_template("admin_pages/hours.html", page="hours", hours=getHours())
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
                if request.form["password"] == "the password":
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



