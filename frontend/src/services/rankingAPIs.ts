import * as ST from '../types/SearchTypes';
import { BookThumbnail } from '../types/BookTypes';
import { topRatedURL } from './callableURLs';

export const getRankings = async (): Promise<any> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };
    const maxResults = 5;
    const requestedURL = `${topRatedURL}?n=${maxResults}`;
    const response = await fetch(requestedURL, requestOptions);

    if (response.status !== 200) return Promise.reject('No more results');

    const data = await response.json();
    if (data?.payload.length > 0) {
      const bookList = data.payload as BookThumbnail[];
      return bookList;
    } else return [];
  } catch (error) {
    return Promise.reject('Internal Error');
  }
};
