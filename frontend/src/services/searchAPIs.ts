import * as ST from '../types/SearchTypes';
import isEmpty from 'lodash/isEmpty';
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
    const requestedURL = `${baseURL}${queryString}&startIndex=${startIndex}`;
    const response = await fetch(requestedURL, requestOptions);
    const data = await response.json();
    if (!isEmpty(data.error)) {
      return Promise.reject('No more results');
    }
    return data as ST.SearchSuccessResponse;
  } catch (error) {
    return Promise.reject('Internal Error');
  }
};
