
from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from flask_restful import Resource
from bookrs.model.event_model import EventModel, event_schema, events_schema
from bookrs.resources import api
from bookrs.utils.common import SUCCESS
from bookrs.utils.exceptions import EventCreateException, EventDeleteException, EventUpdateException


events_bp = Blueprint('events', __name__)


class EventMyList(Resource):
  decorators = [jwt_required()]
  
  def get(self):
    """list all my events `GET /events/my` """
    current_user = get_jwt_identity()
    event_involvement = request.args.get('involvement') or "participate"
    if event_involvement == "organise":
      events = EventModel.get_all_for_reader(organised_by=current_user, involvement=event_involvement)
    else:
      # TODO: get event_ids from ParticipationModel (participations table)
      event_ids  = [1]
      events = EventModel.get_by_ids(event_ids)
    events_data_dump = events_schema.dump(events)
    return SUCCESS(payload=events_data_dump)

  def post(self):
    """
      create my event
      `POST /events/my 
        {
          "title": "Test even title",
          "description": "test description",
          "date_and_time": "2022-04-28T09:00:00Z",
          "venue": "test venue",
          "related_book": "H9emM_LGFDEC"
        }
      `
    """
    data = request.get_json()
    data['organised_by'] = get_jwt_identity()
    event = event_schema.load(data)
    if event.save():
      event_data_dump = event_schema.dump(event)
      return SUCCESS(message='Event created successfully', status_code=201, payload=event_data_dump)
    else:
      raise EventCreateException()


class EventMyId(Resource):
  decorators = [jwt_required()]

  #   # moved from EventMyId because anyone can view the event record
  # def get(self, event_id):
  #   """view event info `GET /events/my/<int:event_id>` """

  #   event = EventModel.get_by_id(event_id)
  #   event_data_dump = event_schema.dump(event)
  #   return SUCCESS(payload=event_data_dump)

  def put(self, event_id):
    """
      update event info 
      `PUT /events/my/<int:event_id>
        {
          "title": "Test even title",
          "description": "test description",
          "date_and_time": "2022-04-28T09:00:00Z",
          "venue": "test venue",
          "related_book": "H9emM_LGFDEC"
        }
      `
    """
    # only organiser can update the event record
    current_user = get_jwt_identity()
    event_obj = EventModel.get_by_reader_and_id(organised_by=current_user, id=event_id)
    data = request.get_json()
    event = event_schema.load(data, instance=event_obj)
    if event.update():
      event_data_dump = event_schema.dump(event)
      return SUCCESS(message='Event updated successfully', payload=event_data_dump)
    else:
      raise EventUpdateException()

  def delete(self, event_id):
    """delete event record `DELETE /events/my/<int:event_id>` """
    # only organiser can delete the event record
    current_user = get_jwt_identity()
    event = EventModel.get_by_reader_and_id(organised_by=current_user, id=event_id)
    if event.delete():
      return SUCCESS(message='Event deleted successfully')
    else:
      raise EventDeleteException()


class EventsList(Resource):
  decorators = [jwt_required()]

  def get(self):#, type="upcoming"):
    """list all events"""
    eventGroup = request.args.get('group')

    events_data_dump = []
    events = EventModel.get_all(eventGroup)
    events_data_dump = events_schema.dump(events)
    return SUCCESS(payload=events_data_dump)


class EventId(Resource):
  decorators = [jwt_required()]

  def get(self, event_id):
    """view event info `GET /events/<int:event_id>` """

    # anyone can view the event record
    event = EventModel.get_by_id(event_id)
    event_data_dump = event_schema.dump(event)
    return SUCCESS(payload=event_data_dump)


api.add_resource(EventMyList, '/events/my', endpoint='my_events')
api.add_resource(EventMyId, '/events/my/<int:event_id>', endpoint='myevent_id')
api.add_resource(EventsList, '/events', endpoint='events')
api.add_resource(EventId, '/events/<int:event_id>', endpoint='event_id')