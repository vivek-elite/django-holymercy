import threading

EMAIL_TEXT = \
"""
NAME: {}
EMAIL: {}
MESSAGE: 
{}
"""
class ContactEmailThread(threading.Thread):

    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()