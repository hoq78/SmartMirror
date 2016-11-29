import urllib, json

url = "http://api.openweathermap.org/data/2.5/weather?q=London&mode=json&APPID=ea3f8ebe279a4e080459a706e2133180"
response = urllib.urlopen(url)
data = json.loads(response.read())


print(data.keys())
import code
code.interact(local=locals())
