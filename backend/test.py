from flask import Flask
from flask_mail import Mail, Message

app = Flask(__name__)
mail= Mail(app)

# app.config['MAIL_SERVER']='smtp.gmail.com'
# app.config['MAIL_PORT'] = 465
# app.config['MAIL_USERNAME'] = '674744997@qq.com'
# app.config['MAIL_PASSWORD'] = 'abcabc123@'
# app.config['MAIL_USE_TLS'] = False
# app.config['MAIL_USE_SSL'] = True

app.config.update(dict(
    DEBUG = True,
    MAIL_SERVER = 'smtp.qq.com',
    MAIL_PORT = 587,
    MAIL_USE_TLS = True,
    MAIL_USE_SSL = False,
    MAIL_USERNAME = '674744997@qq.com',
    MAIL_PASSWORD = 'bmeejkmkemuybfji',
))

# app.config.update(dict(
#     DEBUG = True,
#     MAIL_SERVER = 'smtp.gmail.com',
#     MAIL_PORT = 587,
#     MAIL_USE_TLS = True,
#     MAIL_USE_SSL = False,
#     MAIL_USERNAME = 'apolloliuhx@gmail.com',
#     MAIL_PASSWORD = 'a19930807',
# ))

mail = Mail(app)

@app.route("/", methods=['GET'])
def index():
   msg = Message('Reset Password', sender = '674744997@qq.com', recipients = ['z5326602@ad.unsw.edu.au', 'apolloliuhx@gmail.com'])
   msg.body = "Please click the link to reset your password."
   mail.send(msg)
   return "Sent"

if __name__ == '__main__':
   app.run(debug = True)