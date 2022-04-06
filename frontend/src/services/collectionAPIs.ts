import { getMyCollectionsURL } from './callableURLs';
import { CollectionListData } from '../types/collectionTypes';
import { ErrorResponse, SuccessResponse } from '../types/ServerResponseTypes';

export const fetchCollectionsData = async (
  token: string
  ): Promise<CollectionListData[]> => {
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
    return data.payload as CollectionListData[];
  } catch (err) {
    if ((err as ErrorResponse).msg) {
      return Promise.reject((err as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};

