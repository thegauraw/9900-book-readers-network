import {MyCollectionsURL } from './callableURLs';
import { CollectionData, CollectionFormData } from '../types/collectionTypes';
import { ErrorResponse, SuccessResponse } from '../types/ServerResponseTypes';

export const fetchCollectionListData = async (
  token: string
  ): Promise<CollectionData[]> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      }
    }
    const response = await fetch(MyCollectionsURL, requestOptions);
    const data: SuccessResponse = await response.json();
    return data.payload as CollectionData[];
  } catch (err) {
    if ((err as ErrorResponse).msg) {
      return Promise.reject((err as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};


export const createCollection = async (
  { ...props }: CollectionFormData,
  token: string
  ): Promise<CollectionData> => {
  try {
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        title: props.title,
        description: props.description,
      })
    };
    const response = await fetch(MyCollectionsURL, requestOptions);
    const data: SuccessResponse = await response.json();
    return data.payload as CollectionData;
  } catch (err) {
    if ((err as ErrorResponse).msg) {
      return Promise.reject((err as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};
