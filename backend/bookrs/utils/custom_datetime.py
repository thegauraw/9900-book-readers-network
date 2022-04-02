import pytz
from datetime import datetime

default_tz = pytz.timezone('Australia/Sydney')

def get_str_datetime_now():
    return str(datetime.now(default_tz))

def get_response_datetime_format(time_data):
    server_format =  '%Y-%m-%dT%H:%M:%S.%f'
    response_format = "%d %b, %Y  %H:%M"
    return datetime.strptime(time_data, server_format).strftime(response_format)
