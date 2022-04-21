from flask import Blueprint, request, make_response, jsonify
from flask_restful import Resource
from flask_jwt_extended import get_jwt_identity, jwt_required

from bookrs.model.goalModel import GoalModel, goal_schema, goals_schema
from bookrs.resources import api
from bookrs.model.readingModel import ReadingModel, reading_schema, readings_schema
from bookrs.model.bookModel import BookModel, book_details_schema
from bookrs.utils.common import SUCCESS

from datetime import datetime
from dateutil.relativedelta import relativedelta
from sqlalchemy import desc, and_, extract

goals_bp = Blueprint('goals', __name__)


class Goals(Resource):
    decorators = [jwt_required()]

    # get the data of goals
    def get(self):
        current_user = get_jwt_identity()
        # retrieve the earliest record of goals (first setting)
        first_data = GoalModel.query.filter_by(userid=current_user).order_by("month").first()
        first_goal = goal_schema.dump(first_data)
        # user has set the goal
        if first_goal:
            goals_list = []  # initialize return list
            goal_num = first_goal.get("goal_num")
            # make datetime as "yyyy-mm-01" type to ensure relativedelta function works correctly
            first_month = datetime.strptime((first_goal.get("month") + "-01"), '%Y-%m-%d')
            now_month = datetime.strptime(datetime.now().strftime("%Y-%m") + "-01", '%Y-%m-%d')
            # not use While loop to avoid falling into an infinite loop
            for i in range(1000):
                current_month = first_month + relativedelta(months=i)  # get monthly data one by one from first setting
                month_str = datetime.strftime(current_month, '%Y-%m')  # turn back to model format for searching
                data = GoalModel.query.filter_by(userid=current_user, month=month_str).first()
                if goal_schema.dump(data):    # goal have changed in current month, change the goal number
                    goal_num = goal_schema.dump(data).get("goal_num")
                # retrieve the books that reader read in this month
                books = ReadingModel.query.filter(and_(
                    extract('year', ReadingModel.last_update_read_at) == current_month.year,
                    extract('month', ReadingModel.last_update_read_at) == current_month.month),
                    ReadingModel.reader_id == current_user, ReadingModel.has_read == True
                ).order_by(desc("last_update_read_at")).all()
                books_list = readings_schema.dump(books)
                read_num = len(books_list)  # number of books that reader read in this month
                # user has finished the goal
                if read_num >= goal_num:
                    finish = True
                    # finish date is earlist date when user has read enough books, not the latest date to read the book in this month
                    finish_date = (books_list[-goal_num]).get("last_update_read_at") if goal_num > 0 else datetime.strftime(current_month, '%Y-%m-%d')
                else:
                    finish = False
                    finish_date = None
                # initialize return book list
                book_list = []
                # retrieve concise book information
                for book in books_list:
                    if book.get("volume_id"):
                        book_data = BookModel.query.filter_by(volume_id=book.get("volume_id")).first()
                        if book_data:
                            book_info = book_details_schema.dump(book_data)
                            book_detail = {"volume_id": book_info.get("volume_id"),
                                           "title": book_info.get("title"),
                                           "smallThumbnail": book_info.get("smallThumbnail")}
                            book_list.append(book_detail)
                # goal information for current month
                goal = {"month": month_str,
                        "goal_num": goal_num,
                        "read_num": read_num,
                        "finish": finish,
                        "finish_date": finish_date,
                        "book_list": book_list.copy()}
                goals_list.append(goal)
                if current_month == now_month:  # have retrieved all goals since first setting
                    break
            # Sort the reading goal by recent months for better UX
            goals_list.sort(key=lambda i: i['month'], reverse=True)
            return SUCCESS(payload=goals_list)
        else:  # user has not set the goal
            return SUCCESS(payload=[])

    # add goal
    def post(self):
        data = request.get_json()
        current_user = get_jwt_identity()
        data["userid"] = current_user
        if data.get("month"):  # should not be sent in normal operation, just send for debugging use
            # transform datetime to string of model defined style
            data["month"] = datetime.strftime(datetime.strptime(data.get("month"), '%Y-%m-%d'), '%Y-%m')
        else:
            data["month"] = datetime.now().strftime("%Y-%m")

        goal = goal_schema.load(data)
        result = goal_schema.dump(goal.create())
        return SUCCESS(payload=result, status_code=201)

    # revise goal
    def put(self):
        data = request.get_json()
        current_user = get_jwt_identity()
        if data.get("month"):  # should not be sent in normal operation, just send for debugging use
            # transform datetime to string of model defined style
            date = datetime.strptime(data.get("month"), '%Y-%m-%d')
            month = datetime.strftime(date, '%Y-%m')
        else:
            month = datetime.now().strftime("%Y-%m")

        goal = GoalModel.query.filter_by(userid=current_user, month=month).first()
        if goal:  # existing goal data for this month
            goal.goal_num = data.get("goal_num")
            goal.update()
            result = goal_schema.dump(goal)
        else:  # no existing goal data for this month, create a new record
            data["userid"] = current_user
            data["month"] = month
            goal = goal_schema.load(data)
            result = goal_schema.dump(goal.create())
        return SUCCESS(payload=result)


api.add_resource(Goals, '/goals', endpoint='goals')
