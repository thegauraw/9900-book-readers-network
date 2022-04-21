from flask import Blueprint
from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity, jwt_required
from bookrs.resources import api
from bookrs.utils.common import SUCCESS
from bookrs.utils.exceptions import AchievementListException
from bookrs.model.achievementModel import AchievementModel, achievements_schema

achievements_bp = Blueprint('achievements', __name__)

class Achievements(Resource):
  def get(self, reader_id):
    """Retrieves a list of achievements
      `GET /achievement/:reader_id`
    """
    try:

      achievements = AchievementModel.query.filter_by(reader_id=reader_id).all()
      
      if achievements:
        achievements_data = achievements_schema.dump(achievements)
        return SUCCESS(payload=achievements_data)
      else:
        # It's ok if there is no achievement for the specified reader
        return SUCCESS(payload=[])
    except:
      raise AchievementListException()

class OwnedAchievements(Resource):
  decorators = [jwt_required()]
  def get(self):
    """Retrieves a list of achievements
      `GET /owned_achievement/`
    """
    try:
      current_user = get_jwt_identity()
      achievements = AchievementModel.query.filter_by(reader_id=current_user).all()
      
      if achievements:
        achievements_data = achievements_schema.dump(achievements)
        return SUCCESS(payload=achievements_data)
      else:
        # It's ok if there is no achievement for the specified reader
        return SUCCESS(payload=[])
    except:
      raise AchievementListException()
    
api.add_resource(Achievements, '/achievements/<int:reader_id>')
api.add_resource(OwnedAchievements, '/owned_achievements')