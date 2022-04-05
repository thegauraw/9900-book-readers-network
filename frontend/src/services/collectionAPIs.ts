import { getMyCollectionsURL } from './callableURLs';
import { MyCollectionsData } from '../types/collectionTypes';
import { ErrorResponse, SuccessResponse } from '../types/ServerResponseTypes';

export const fetchMyCollectionsData = async (
  token: string
  ): Promise<MyCollectionsData[]> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        accept: 'application/json',
      }
    }
    const response = await fetch(getMyCollectionsURL, requestOptions);
    const data: SuccessResponse = await response.json();
    return data.payload as MyCollectionsData[];
  } catch (err) {
    if ((err as ErrorResponse).msg) {
      return Promise.reject((err as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};

