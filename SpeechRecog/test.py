####################################
#for speech recognition applications#
#####################################
#taken from the HouseCommands example

import sys

from speakpython.SpeakPythonRecognizer import SpeakPythonRecognizer

#define callback function with 1 parameter (string)
def execute(s):
        print s;
        #exec s;

#creates recognition instance
#param 1 - function accepting 1 string argument - used as callback
#param 2 - appName - used to read [appName].fsg and [appName].db
recog = SpeakPythonRecognizer(execute, "houseCommands");

# sets the level of debug output
# 1 is the most output, 10 is the least
# default level is 3
#recog.setDebug(1);

#call this to start recognizing speech
#I believe this call utilizes current thread. Please multi-thread it yourself if necessary.
recog.recognize();
