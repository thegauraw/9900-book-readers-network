import { getCollectionListApi } from './callableURLs';
import { CollectionListData } from '../types/ResponseTypes';

export const fetchCollectionListData = async (): Promise<CollectionListData[]> => {
  try {
    const response = await fetch(getCollectionListApi);
    const data = await response.json();
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};
