from flask import Blueprint
from flask_restful import Resource
from bookrs.model.readingModel import ReadingModel, readings_schema
from bookrs.utils.common import SUCCESS
from bookrs.utils.exceptions import BookNotFoundException
from werkzeug.exceptions import NotFound
from bookrs.resources import api
readings_bp = Blueprint('readings', __name__)

class Readings(Resource):
    def get(self): #debug purpose only
        readings = ReadingModel.query.all()
        return SUCCESS(payload=readings_schema.dump(readings))
    
class ReadingsByBookId(Resource):
    def get(self, volume_id):
        try:
            #Book.query.filter_by(volumeId=volumeId).first_or_404()
            readings = ReadingModel.query.filter_by(volume_id=volume_id).all()
            readings = readings_schema.dump(readings)
            
            valid_readings = [p for p in readings if p["last_update_review_rating_at"] is not None]
            #TODO: delete the stats after finishing search apis
            valid_ratings = [p["rating"] for p in readings if p["rating"] is not None]
            valid_reviews = [p["review"] for p in readings if p["review"] is not None]
            has_reads = [p["has_read"] for p in readings if p["has_read"] is True]
            result = {"readings": valid_readings}
            result["countValidRatings"] = len(valid_ratings)
            result["averageRatings"] = None if len(valid_ratings) == 0 else sum(valid_ratings)/len(valid_ratings)
            result["countValidReviews"] = len(valid_reviews)
            result["countHasRead"] = len(has_reads)
            return SUCCESS(payload=result)
        except NotFound:
            raise BookNotFoundException()
        
api.add_resource(Readings, '/readings')
api.add_resource(ReadingsByBookId, '/readings/<string:volume_id>')