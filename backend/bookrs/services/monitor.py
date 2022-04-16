import json

from bookrs.model.achievementModel import AchievementModel, achievement_schema
from bookrs.utils.badges import badges_def
from bookrs.utils.exceptions import BadgeRegisterException
from bookrs.model.readingModel import ReadingModel


def monitor_readings(reader_id):
  readings = ReadingModel.query.filter_by(reader_id=reader_id).all()

  reviews = [1 for r in readings if r.review and len(r.review) > 0]
  has_reads = [1 for r in readings if r.has_read]

  register_badges(len(reviews), reader_id, 'review')
  register_badges(len(has_reads), reader_id, 'read')

def register_badges(n, reader_id, badge_mode):
    ids = badges_def['seq']

    badges_images = [f'{badge_mode}_{i}' for i in ids if n >= i]

    for image in badges_images:
      data = AchievementModel.query.filter_by(image=image).first()
      if not data:
        data = dict()
        data['image'] = image
        data['description'] = image
        data['reader_id'] = reader_id
        achievement_data = achievement_schema.loads(json.dumps(data))
        
        if not achievement_data.save():
          raise BadgeRegisterException()
