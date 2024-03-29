from bookrs.utils.common import InvalidUsage

# Generic Errors
def BadRequestError(error):
  return InvalidUsage(error.__str__(), status_code=400).to_json() 

def ResourceNotFoundError(error):
  return InvalidUsage(error.__str__(), status_code=404).to_json()

def InternalServerError(error):
  return InvalidUsage(str(error), status_code=500).to_json()


# Reader authentication related exceptions
def EmailRegisteredException():
  return InvalidUsage('This email has been registered!', status_code=409)

def EmailFormatException():
  return InvalidUsage('The email format is incorrect, please use the format of xxx@xxx.com',
            status_code=403)
          
def UsernameRegisteredException():
  return InvalidUsage('This username has been registered!', status_code=409)

def NullRegisterFieldException():
  return InvalidUsage('Username, Email or Password are not allowed to be empty!', status_code=403)

def NullLoginFieldException():
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

def InvalidTokenException():
  return InvalidUsage('Fail to verify token', status_code=400)


# Collection related exceptions
def CollectionCreateException():
  return InvalidUsage('Could not create collection', status_code=500)

def CollectionDeleteException():
  return InvalidUsage('Could not delete collection', status_code=500)

def CollectionUpdateException():
  return InvalidUsage('Could not update collection', status_code=500)

def CollectionNotFoundException():
  return InvalidUsage('Requested collection not found', status_code=404)


# Books related exceptions
def BookCollectException():
  return InvalidUsage('Could not add book to the collection', status_code=500)

def BookCreateException():
  return InvalidUsage('Could not create book', status_code=500)

def BookDropException():
  return InvalidUsage('Could not remove book from the collection', status_code=500)

def BookNotFoundException():
  return InvalidUsage('Requested book not found', status_code=404)


# Event related exceptions
def EventCreateException():
  return InvalidUsage('Could not create event', status_code=500)

def EventDeleteException():
  return InvalidUsage('Could not delete event', status_code=500)

def EventUpdateException():
  return InvalidUsage('Could not update event', status_code=500)

def EventNotFoundException():
  return InvalidUsage('Requested event not found', status_code=404)

# Event participation related exceptions
# def EventParticipationException():
def EventRegistrationException():
  return InvalidUsage('Could not register to the reqested event', status_code=500)

def EventRegistrationTimePassedException():
  return InvalidUsage('The requested event does not take registration any longer', status_code=400)

def EventParticipationNotFoundException():
  return InvalidUsage('Requested event participation/registration record not found', status_code=404)

def EventRegistrationCancelException():
  return InvalidUsage('Could not cancel the registration/booking to the requested event', status_code=500)

def EventFeedbackUpdateException():
  return InvalidUsage('Could not update comment on the participated event', status_code=500)

def EventFeedbackBeforeTimeException():
  return InvalidUsage('The requested event has not occured yet', status_code=500)

def EventFeedbackRemoveException():
  return InvalidUsage('Could not remove comment on the participated event', status_code=500)

def EventFeedbackNotFoundException():
  return InvalidUsage('Requested event comment record not found', status_code=404)


def InvalidParameterException(error):
  return InvalidUsage(error.__str__(), status_code=400).to_json() 

def ReadingNotFoundException():
  return InvalidUsage('Requested reading not found', status_code=404)

def OwnedReadingHasExistedException():
  return InvalidUsage('Requested reading has existed', status_code=400)

# Search related exceptions
def InvalidSearchException():
  return InvalidUsage('Invalid search request', status_code=400)


# Achievement related exceptions
def AchievementListException():
  return InvalidUsage('Fail to list achievements', status_code=500)

def BadgeRegisterException():
  return InvalidUsage('Fail to register badges', status_code=500)

# Recommendation related exceptions
def InvalidRecommendationException():
  return InvalidUsage('Invalid recommendation request', status_code=400)

def InvalidProfileException():
  return InvalidUsage('Failed to get profile information', status_code=404)


# Most collected books related exceptions
def GetMostColletedBooksException():
  return InvalidUsage('Fail to get most collected books', status_code=500)