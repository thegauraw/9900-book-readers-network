from flask import Blueprint

pages_bp = Blueprint('pages', __name__)

@pages_bp.route('/')
def index():
    return 'Hello, World!'
    # return {
    #   "title": "Home",
    #   "message": "Helo world"
    #   }
