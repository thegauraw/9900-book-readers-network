from datetime import datetime
from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Resource
from bookrs.model.event_model import EventModel
from bookrs.model.event_participation_model import EventParticipationModel, participation_schema, participations_schema
from bookrs.resources import api
from bookrs.utils.common import SUCCESS
from bookrs.utils.exceptions import EventFeedbackBeforeTimeException, EventFeedbackNotFoundException, EventFeedbackRemoveException, EventFeedbackUpdateException, EventRegistrationCancelException, EventRegistrationException, EventRegistrationTimePassedException

event_participations_bp = Blueprint('event_participations', __name__)


class EventParticipation(Resource):
  decorators = [jwt_required()]

  def post(self, event_id):
    """
      Register for an event
      `POST /events/:event_id/register`
    """
    # check if the event allows registration or not?
    event = EventModel.get_by_id(id=event_id)
    if event.allows_registration:
      # register current user to the event i.e. add a record
      current_user = get_jwt_identity()
      data = {'event_id': event_id, 'participant_id': current_user}
      event_participation = participation_schema.load(data)
      if event_participation.save():
        return SUCCESS(message='Participant registered to the event successfully')
      else:
        raise EventRegistrationException()
    else:
      raise EventRegistrationTimePassedException()


  def delete(self, event_id):
    """
    Cancel registration to a event
    `DELETE /events/:event_id/register`
    """
    # check if the user is currently registered or not?
    current_user = get_jwt_identity()
    event_participation = EventParticipationModel.get_by_participant_and_event_id(event_id=event_id, participant_id=current_user)

    if event_participation.delete():
      return SUCCESS(message='Participant registration/booking to the event has been cancelled successfully')
    else:
      raise EventRegistrationCancelException()


class EventFeedbackList(Resource):
  decorators = [jwt_required()]

  def get(self, event_id):
    """
    List all the comments in an event
    `GET /events/:event_id/comments`
    """
    # find event to verify it exists
    event = EventModel.get_by_id(event_id)
    event_comments = EventParticipationModel.get_all_for_event(event_id=event_id)

    participant_comments_data_dump = participations_schema.dump(event_comments)
    return SUCCESS(payload=participant_comments_data_dump)


class EventFeedback(Resource):
  decorators = [jwt_required()]

  def put(self, event_id):
    """
      Comment on an event that one had participated
      `PUT /events/:event_id/comment`
    """
    event = EventModel.get_by_id(event_id)
    # check if the user has participated in the event
    current_user = get_jwt_identity()
    event_participation_obj = EventParticipationModel.get_by_participant_and_event_id(event_id=event_id, participant_id=current_user)

    if event.allows_comment:

      data = request.get_json()
      # only required to set if event_id and participant_id are set to required=True in participation_schema
      # data['event_id'] = event_id
      # data['participant_id'] = current_user

      event_participation = participation_schema.load(data, instance=event_participation_obj)
      if event_participation.update():
        event_participation_data_dump = participation_schema.dump(event_participation)
        return SUCCESS(message='Event comment updated successfully', payload=event_participation_data_dump)
      else:
        raise EventFeedbackUpdateException()
    else:
      raise EventFeedbackBeforeTimeException()


  def delete(self, event_id):
    """
      Delete own comment on an event that one had participated
      `DELETE /events/:event_id/comment`
    """
    # check if the user has participated in the event
    current_user = get_jwt_identity()
    event_participation_obj = EventParticipationModel.get_by_participant_and_event_id(event_id=event_id, participant_id=current_user)
    data = {'comment': None}

    event_participation = participation_schema.load(data, instance=event_participation_obj)
    if event_participation.update():
      event_participation_data_dump = participation_schema.dump(event_participation)
      return SUCCESS(message='Event comment deleted successfully', payload=event_participation_data_dump)
    else:
      raise EventFeedbackRemoveException()

  def get(self, event_id):
    """
      Show own comment on an event that one had participated
      `GET /events/:event_id/comment`
    """
    # check if the user has participated in the event
    current_user = get_jwt_identity()
    event_participation = EventParticipationModel.get_by_participant_and_event_id(event_id=event_id, participant_id=current_user)
    if event_participation:
      event_participation_data_dump = participation_schema.dump(event_participation)
      return SUCCESS(payload=event_participation_data_dump)
    else:
      raise EventFeedbackNotFoundException()
    
  
    

api.add_resource(EventParticipation, '/events/<int:event_id>/register')
api.add_resource(EventFeedbackList, '/events/<int:event_id>/comments')
api.add_resource(EventFeedback, '/events/<int:event_id>/comment')

