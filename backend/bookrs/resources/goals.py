from flask import Blueprint, request, make_response, jsonify
from flask_restful import Resource

from bookrs.model.goalModel import GoalModel, goal_schema, goals_schema
from bookrs.resources import api


goals_bp = Blueprint('goals', __name__)

class Goals(Resource):

    # get the data of goals
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

    # add goal
    def post(self):
        data = request.get_json()

        goal = goal_schema.load(data)
        result = goal_schema.dump(goal.create())
        return make_response(jsonify({"goal": result}), 201)

    # delete goal
    def delete(self):
        data = request.get_json()
        goals_list = data.get("goals")
        delete_list = []

        for goal_id in goals_list:
            goal = GoalModel.query.filter_by(id=goal_id).first()
            if goal:
                goal.delete()
                delete_list.append(goal_id)
        return make_response(jsonify({"goals deleted": delete_list}), 201)

    # revise goal
    def put(self):
        data = request.get_json()
        goal_id = data.get("id")

        goal = GoalModel.query.filter_by(id=goal_id).first()
        if data.get("goal_num"):
            goal.goal_num = data.get("goal_num")
        if data.get("start_time"):
            goal.start_time = data.get("start_time")
        if data.get("end_time"):
            goal.end_time = data.get("end_time")
        goal.update()
        return make_response(jsonify({"goal": goal_schema.dump(goal)}), 201)


api.add_resource(Goals, '/goals', endpoint='goals')
