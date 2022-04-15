import * as ST from '../types/SearchTypes';
import { searchBooksURL } from './callableURLs';

export const searchBooksApi = async (query: ST.SearchParams): Promise<any> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };
    let queryString = '?q=';
    if (query.by === ST.SearchMethods.all) {
      queryString += `${query.q}`;
    } else if (query.by === ST.SearchMethods.authors) {
      queryString += `+inauthor:${query.q}`;
    } else if (query.by === ST.SearchMethods.books) {
      queryString += `+intitle:${query.q}`;
    }
    if (query.min) queryString += `&minRating=${Number(query.min)}`;
    const page = query.p ? Number(query.p) - 1 : 0;
    const maxResults = 10;
    const startIndex = page * maxResults;
    const requestedURL = `${searchBooksURL}${queryString}&startIndex=${startIndex}`;
    const response = await fetch(requestedURL, requestOptions);

    if (response.status !== 200) return Promise.reject('No more results');

    const data = await response.json();

    console.log('search book data: ', data);

    return data.payload as ST.SearchSuccessResponse;
  } catch (error) {
    return Promise.reject('Internal Error');
  }
};

export const getBookDetailsApi = async (volumeId: string): Promise<any> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };
    const requestedURL = `${searchBooksURL}/${volumeId}`;
    console.log('requestedURL: ', requestedURL);
    const response = await fetch(requestedURL, requestOptions);
    const data = await response.json();
    if (response.status !== 200) return Promise.reject('Not found');

    return data.payload as ST.SearchSuccessItemResponse;
  } catch (error) {
    return Promise.reject('Internal Error');
  }
};
