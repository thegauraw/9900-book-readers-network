from flask import Blueprint, request, make_response, jsonify
from flask_restful import Resource

from bookrs.model.goalModel import GoalModel, goal_schema, goals_schema
from bookrs.resources import api


goals_bp = Blueprint('goals', __name__)

class Goals(Resource):

    def get(self):
        data = request.get_json()
        userid = data.get('userid')
        status = data.get('finish')

        if not userid:
            if status is None:
                goals = GoalModel.query.all()
            else:
                goals = GoalModel.query.filter_by(finish=status)
        else:
            if status is None:
                goals = GoalModel.query.filter_by(userid=userid)
            else:
                goals = GoalModel.query.filter_by(userid=userid, finish=status)
        return goals_schema.dump(goals)

    def post(self):
        data = request.get_json()

        goal = goal_schema.load(data)
        result = goal_schema.dump(goal.create())
        return make_response(jsonify({"goal": result}), 201)


api.add_resource(Goals, '/goals', endpoint='goals')
