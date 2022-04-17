import { BookThumbnail } from '../types/BookTypes';
import { myCollectedBooks } from './callableURLs';

export const getCollectedBooksList = async (token: string, collectionId: string): Promise<any> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };

    const response = await fetch(myCollectedBooks(Number(collectionId)), requestOptions);
    if (response.status === 404) {
      return Promise.reject(`The collection you requested was not found.`);
    } else {
      const data = await response.json();
      const bookList = data.payload as BookThumbnail[];
      return bookList;
    }
  } catch (error) {
    return Promise.reject('Internal Error');
  }
};

export const deleteCollectedBook = async (
  token: string,
  collectionId: string,
  volumeId: string
): Promise<any> => {
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };

    const collectionURL = myCollectedBooks(Number(collectionId));
    const response = await fetch(`${collectionURL}/${volumeId}`, requestOptions);
    if (response.status === 404) {
      return Promise.reject(`The book you requested to delete was not found.`);
    } else {
      return true;
    }
  } catch (error) {
    return Promise.reject('Internal Error');
  }
};
