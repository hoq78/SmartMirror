from SpeakPython.SpeakPythonRecognizer import SpeakPythonRecognizer
from chromote import Chromote
from time import sleep

chrome = Chromote()
tab = chrome.tabs[0]

def execute(speech):
    eval(speech)
 
def show(speech):
    if speech == "home" and tab.url != "http:localhost/index.html":
        tab.set_url("http://localhost/index.html")
        sleep(10)
    elif speech == "weather" and tab.url != "http:localhost/weather.html":
        tab.set_url("http://localhost/weather.html")
        sleep(10)
    elif speech == "news" and tab.url != "http:localhost/news.html":
        tab.set_url("http://localhost/news.html")
        sleep(10)
    elif speech == "calendar" and tab.url != "http:localhost/calendar.html":
        tab.set_url("http://localhost/calendar.html")
        sleep(10)
    elif speech == ("mail") and tab.url != "http:localhost/mail.html":
        tab.set_url("http://localhost/mail.html")

recog = SpeakPythonRecognizer(execute,"VoiceRecognition")

stop=False
try:
    while not stop:
        print("where to?")
        recog.recognize()
except KeyboardInterrupt:
    stop=True
