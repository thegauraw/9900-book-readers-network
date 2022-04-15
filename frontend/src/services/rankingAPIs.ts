import * as ST from '../types/SearchTypes';
import { BookThumbnail } from '../types/BookTypes';
import { searchBooksURL } from './callableURLs';

export const getRankings = async (): Promise<any> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };

    //TODO: Construct recommendation query string
    const queryString = '?q=js';
    const page = 0;
    const maxResults = 5;
    const startIndex = page * maxResults;
    const requestedURL = `${searchBooksURL}${queryString}&startIndex=${startIndex}`;
    const response = await fetch(requestedURL, requestOptions);

    if (response.status !== 200) return Promise.reject('No more results');

    const data = await response.json();

    console.log('recommend book data: ', data);

    if (data?.payload?.items.length > 0) {
      const response = data.payload as ST.SearchSuccessResponse;
      const bookList: BookThumbnail[] = response.items.slice(0, maxResults).map((book) => ({
        volume_id: book.id,
        title: book.volumeInfo.title,
        smallThumbnail: book.volumeInfo.imageLinks.smallThumbnail,
      }));
      return bookList;
    } else return [];
  } catch (error) {
    return Promise.reject('Internal Error');
  }
};
