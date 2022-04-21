import { achievementURL, ownedAchievementURL } from './callableURLs';
import * as AC from '../types/AchievementTypes';
import { ErrorResponse, SuccessResponse } from '../types/ServerResponseTypes';

export const getOwnedBadges = async (token: string): Promise<AC.BadgesType[]> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };
    const response = await fetch(ownedAchievementURL, requestOptions);
    const data: SuccessResponse = await response.json();
    return data.payload as AC.BadgesType[];
  } catch (error) {
    if ((error as ErrorResponse).msg) {
      return Promise.reject((error as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};

export const getBadgesByReader = async (id: number): Promise<AC.BadgesType[]> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };
    const response = await fetch(`${achievementURL}/${id}`, requestOptions);
    const data: SuccessResponse = await response.json();
    return data.payload as AC.BadgesType[];
  } catch (error) {
    if ((error as ErrorResponse).msg) {
      return Promise.reject((error as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};
