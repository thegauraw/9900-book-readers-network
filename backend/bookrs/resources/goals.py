from flask import Blueprint, request, make_response, jsonify
from flask_restful import Resource

from bookrs.model.goalModel import GoalModel, goal_schema, goals_schema
from bookrs.resources import api
from bookrs.model.readingModel import ReadingModel, reading_schema, readings_schema

from flask_jwt_extended import get_jwt_identity, jwt_required
from datetime import datetime
from dateutil.relativedelta import relativedelta

from sqlalchemy import desc, and_, extract

goals_bp = Blueprint('goals', __name__)

class Goals(Resource):
    decorators = [jwt_required()]
    # get the data of goals
    def get(self):
        goals_list = []
        current_user = get_jwt_identity()

        first_data = GoalModel.query.filter_by(userid=current_user).order_by("month").first()
        first_goal = goal_schema.dump(first_data)
        goal_num = first_goal.get("goal_num")

        first_month = datetime.strptime((first_goal.get("month") + "-01"), '%Y-%m-%d')
        now_month = datetime.strptime(datetime.now().strftime("%Y-%m") + "-01", '%Y-%m-%d')
        # now_month = first_month + relativedelta(months=12)
        for i in range(1000):
            current_month = first_month + relativedelta(months=i)
            month_str = datetime.strftime(current_month, '%Y-%m')
            data = GoalModel.query.filter_by(userid=current_user, month=month_str).first()
            if goal_schema.dump(data):    # have changed
                goal_num = goal_schema.dump(data).get("goal_num")

            books = ReadingModel.query.filter(and_(
                extract('year', ReadingModel.last_update_read_at) == current_month.year,
                extract('month', ReadingModel.last_update_read_at) == current_month.month),
                ReadingModel.reader_id == current_user, ReadingModel.has_read == True
                ).order_by(desc("last_update_read_at")).all()
            read_num = len(readings_schema.dump(books))
            if read_num >= goal_num:
                finish = True
                finish_date = (readings_schema.dump(books)[0]).get("last_update_read_at")
            else:
                finish = False
                finish_date = None
            goal = {"month": month_str,
                    "goal_num": goal_num,
                    "read_num": read_num,
                    "finish": finish,
                    "finish_date": finish_date}
            goals_list.append(goal)
            if current_month == now_month:
                break

        return goals_list

    # add goal
    def post(self):
        data = request.get_json()
        current_user = get_jwt_identity()
        data["userid"] = current_user
        data["month"] = datetime.strftime(datetime.strptime(data.get("month"), '%Y-%m-%d'), '%Y-%m')

        goal = goal_schema.load(data)
        result = goal_schema.dump(goal.create())
        return make_response(jsonify({"goal": result}), 201)

    # delete goal
    """def delete(self):
        data = request.get_json()
        goals_list = data.get("goals")
        delete_list = []

        for goal_id in goals_list:
            goal = GoalModel.query.filter_by(id=goal_id).first()
            if goal:
                goal.delete()
                delete_list.append(goal_id)
        return make_response(jsonify({"goals deleted": delete_list}), 201)"""

    # revise goal
    def put(self):
        data = request.get_json()
        current_user = get_jwt_identity()
        date = datetime.strptime(data.get("month"), '%Y-%m-%d')
        month = datetime.strftime(date, '%Y-%m')

        goal = GoalModel.query.filter_by(userid=current_user).order_by(desc("month")).first()
        if goal.month == month:  # existing goal data for this month
            goal.goal_num = data.get("goal_num")
            goal.update()
            result = goal_schema.dump(goal)
        else:
            data["userid"] = current_user
            data["month"] = month
            goal = goal_schema.load(data)
            result = goal_schema.dump(goal.create())
        """if data.get("goal_num"):
            goal.goal_num = data.get("goal_num")
        if data.get("start_time"):
            goal.start_time = datetime.strptime(data.get("start_time"), '%Y-%m-%d')
        if data.get("end_time"):
            goal.end_time = datetime.strptime(data.get("end_time"), '%Y-%m-%d')"""
        return make_response(jsonify({"goal": result}), 201)


api.add_resource(Goals, '/goals', endpoint='goals')
