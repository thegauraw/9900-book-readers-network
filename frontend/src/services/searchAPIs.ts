import * as ST from '../types/SearchTypes';
import isEmpty from 'lodash/isEmpty';
import { searchBooksURL } from './callableURLs';
const baseURL = 'https://www.googleapis.com/books/v1/volumes';

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
    const requestedURL = `${baseURL}/${volumeId}`;
    const response = await fetch(requestedURL, requestOptions);
    const data = await response.json();
    if (!isEmpty(data.error) || isEmpty(data) || !data.id) {
      return Promise.reject('Not found');
    }
    return data as ST.SearchSuccessItemResponse;
  } catch (error) {
    return Promise.reject('Internal Error');
  }
};
