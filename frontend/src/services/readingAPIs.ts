import { ReadingsURL, OwnedReadingsURL } from './callableURLs';
import * as RT from '../types/ReadingTypes';
import { ErrorResponse, SuccessResponse } from '../types/ServerResponseTypes';

export const getReadingByBookIdForOwner = async (
  bookId: string | undefined,
  token: string
): Promise<RT.ReadingByBookIdFromOwnerResponse> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };
    const response = await fetch(`${OwnedReadingsURL}/${bookId}`, requestOptions);
    const data: SuccessResponse = await response.json();
    return data.payload as RT.ReadingByBookIdFromOwnerResponse;
  } catch (error) {
    if ((error as ErrorResponse).msg) {
      return Promise.reject((error as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};

export const getReadingListByBookId = async (
  bookId: string | undefined,
  token: string
): Promise<RT.ReadingsListByBookIdResponse[]> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };
    const response = await fetch(`${ReadingsURL}/${bookId}`, requestOptions);
    const data: SuccessResponse = await response.json();
    return data.payload as RT.ReadingsListByBookIdResponse[];
  } catch (error) {
    if ((error as ErrorResponse).msg) {
      return Promise.reject((error as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};

export const setReviewAndRating = async (
  { ...props }: RT.RatingAndReviewForm,
  token: string,
  bookId: string | undefined
): Promise<string> => {
  try {
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },

      body: JSON.stringify({
        rating: props.rating,
        review: props.review,
      }),
    };

    const response = await fetch(`${OwnedReadingsURL}/${bookId}`, requestOptions);
    const data: SuccessResponse = await response.json();
    return data.payload;
  } catch (error) {
    if ((error as ErrorResponse).msg) {
      return Promise.reject((error as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};

export const setReadingStatus = async (
  hasRead: boolean,
  token: string,
  bookId: string | undefined
): Promise<string> => {
  try {
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },

      body: JSON.stringify({
        has_read: hasRead,
      }),
    };
    const response = await fetch(`${OwnedReadingsURL}/${bookId}`, requestOptions);
    const data: SuccessResponse = await response.json();
    return data.payload;
  } catch (error) {
    if ((error as ErrorResponse).msg) {
      return Promise.reject((error as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};

export const deleteReviewAndRating = async (
  token: string,
  bookId: string | undefined
): Promise<string> => {
  try {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };
    const response = await fetch(`${OwnedReadingsURL}/${bookId}`, requestOptions);
    const data: SuccessResponse = await response.json();
    return data.payload;
  } catch (error) {
    if ((error as ErrorResponse).msg) {
      return Promise.reject((error as ErrorResponse).msg);
    } else {
      return Promise.reject('Internal Error');
    }
  }
};
