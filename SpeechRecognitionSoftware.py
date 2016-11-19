import speech_recognition as sr

def getAudioFromMic(recognizer):
    with sr.Microphone() as source:
        print "Say Something!"
        audio = recognizer.listen(source)

    return audio

def speechRecognitionGoogle(audio, recognizer):
    try:
        translatedString = recognizer.recognize_google(audio)
    except recognizer.UnknownValueError:
        print("Google didn't understand")
    except recognizer.RequestError as e:
        print("Google request error!")

if __name__ == '__main__':
    recognition = sr.Recognizer()
    audioFromUser = getAudioFromMic(recognition)
    speechRecognitionGoogle(audioFromUser, recognition)
