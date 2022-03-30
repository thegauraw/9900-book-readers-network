import pytz
from datetime import datetime

default_tz = pytz.timezone('Australia/Sydney')

def get_str_datetime_now():
    return str(datetime.now(default_tz))