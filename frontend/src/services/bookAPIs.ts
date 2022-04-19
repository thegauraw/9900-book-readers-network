import { BookThumbnail } from '../types/BookTypes';
import { myCollectedBooks, recentCollectedBooksURL } from './callableURLs';

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

export const addBookToCollections = async (
  token: string,
  collectionIds: number[],
  volumeId: string
): Promise<any> => {
  try {
    collectionIds.forEach(async (collectionId) => {
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          volume_id: volumeId,
        }),
      };
      const collectionURL = myCollectedBooks(collectionId);
      const response = await fetch(`${collectionURL}`, requestOptions);
      if (response.status === 404) {
        return Promise.reject(
          `The collection ${collectionId} was not found, please refresh and try again.`
        );
      }
    });
  } catch (error) {
    return Promise.reject('Internal Error');
  }
};

export const getRecentlyCollectedBooks = async (
  token: string,
  readerId?: number | undefined
): Promise<BookThumbnail[]> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };

    const requestedURL = readerId
      ? `${recentCollectedBooksURL}/${readerId}`
      : `${recentCollectedBooksURL}/0`;
    const response = await fetch(requestedURL, requestOptions);
    if (response.status === 404) {
      return Promise.reject(`The collection you requested was not found.`);
    } else {
      const data = await response.json();
      const bookList = data.payload as BookThumbnail[];
      return bookList;
    }
  } catch (error) {
    return [
      { volume_id: 'UAYvDwAAQBAJ', title: 'js', smallThumbnail: null },
      { volume_id: 'UAYvDwAAQBA', title: 'js2', smallThumbnail: null },
    ];
    return Promise.reject('Internal Error');
  }
};
