from SpeakPython.SpeakPythonRecognizer import SpeakPythonRecognizer
from chromote import Chromote

chrome = Chromote()
tab = chrome.tabs[0]

def execute(speech):
    eval(speech)
    print(speech)

def show(speech):
    if speech == "show home":
        tab.set_url("http://localhost/index.html")
    elif speech == "show weather":
        tab.set_url("https://localhost/weather.html")
    elif speech == "show news":
        tab.set_url("http://localhost/news.html")
    elif speech == "show calendar":
        tab.set_url("http://localhost/calendar.html")
    elif speech == ("show mail"):
        tab.set_url("http://localhost/mail.html")

recog = SpeakPythonRecognizer(execute,"VoiceRecognition")

stop=False
try:
    while not stop:
        print("where to?")
        recog.recognize()
except KeyboardInterrupt:
    stop=True
