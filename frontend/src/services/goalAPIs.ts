import { GoalsURL } from './callableURLs';
import * as RT from '../types/GoalTypes';
import { ErrorResponse, SuccessResponse } from '../types/ServerResponseTypes';

export const getMonthlyGoalStatus = async (token: string): Promise<RT.MonthlyGoalStatus[]> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };
    const response = await fetch(GoalsURL, requestOptions);
    const data: SuccessResponse = await response.json();
    return data.payload as RT.MonthlyGoalStatus[];
  } catch (error) {
    if ((error as ErrorResponse).msg) {
      return Promise.reject((error as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};

export const createMonthlyGoal = async (
  token: string,
  numberOfBooksToRead: number
): Promise<number> => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },

      body: JSON.stringify({
        goal_num: numberOfBooksToRead,
      }),
    };

    const response = await fetch(GoalsURL, requestOptions);
    const data: SuccessResponse = await response.json();
    return data.payload;
  } catch (error) {
    if ((error as ErrorResponse).msg) {
      return Promise.reject((error as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};

export const updateMonthlyGoal = async (
  token: string,
  numberOfBooksToRead: number
): Promise<number> => {
  try {
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },

      body: JSON.stringify({
        goal_num: numberOfBooksToRead,
      }),
    };

    const response = await fetch(GoalsURL, requestOptions);
    const data: SuccessResponse = await response.json();
    return data.payload;
  } catch (error) {
    if ((error as ErrorResponse).msg) {
      return Promise.reject((error as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};
