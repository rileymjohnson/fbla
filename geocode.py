import geocoder
import requests

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

print getCountyCodeByIp("72.177.108.86")