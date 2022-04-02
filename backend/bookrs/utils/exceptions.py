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


# Collection related exceptions
def CollectionDeleteException():
  return InvalidUsage('Could not delete collection', status_code=500)


# Generic Errors
def BadRequestError():
  return InvalidUsage('Please check your request', status_code=400)

def ResourceNotFoundError():
  return InvalidUsage('Requested resource not found', status_code=404)

def InternalServerError():
  return InvalidUsage('Requested operation could not be performed', status_code=500)


