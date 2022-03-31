from bookrs.utils.common import InvalidUsage

def EmailRegisteredException():
  return InvalidUsage('This email has been registered!', status_code=409)

def EmailFormatException():
  return InvalidUsage('The email format is incorrect, please use the format of xxx@xxx.com',
            status_code=403)
          
def UsernameRegisteredException():
  return InvalidUsage('This username has been registered!', status_code=409)

def NullRegisterFiledsException():
  return InvalidUsage('Username, Email or Password are not allowed to be empty!', status_code=403)

def NullLoginFildsException():
  return InvalidUsage('Email or Password are not allowed to be empty!', status_code=403)

def InvalidEmailException():
  return InvalidUsage('This email does not exist in the system!', status_code=401)

def InvalidPasswordException():
  return InvalidUsage('Invalid password!', status_code=401)

def InvalidEmailorPasswordException():
  return InvalidUsage('Invalid email or password!', status_code=401)

def UpdateReaderException():
  return InvalidUsage('Fail to update reader info', status_code=500)

def SendEmailException():
  return InvalidUsage('Fail to send password reset email', status_code=500)