import { UserApiURL, profileURL, recentCollectedUsersURL } from './callableURLs';
import { ProfileType, ReaderType } from '../types/ProfileTypes';

export const resetReaderPassword = async (props: any): Promise<string> => {
  try {
    console.log('start grasping user info. ', props.email);

    const requestOptions = {
      method: 'GET',
    };

    const response = await fetch(`${UserApiURL}?email=${props.email}&reset=true`, requestOptions);
    const data = await response.json();

    console.log('status: ', response.status);

    response.status === 200 && console.log('succeed to get user info!');
    response.status !== 200 && console.log('error message: ', data);

    return data.msg;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateReaderPassword = async (props: any): Promise<string> => {
  try {
    console.log('start updating user info. ', props.email);

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: 'Bearer ' + props.token,
      },

      body: JSON.stringify({
        password: props.password,
      }),
    };

    const response = await fetch(`${UserApiURL}?reset=true`, requestOptions);
    const data = await response.json();

    console.log('status: ', response.status);

    response.status === 200 && console.log('succeed to update user info!');
    response.status !== 200 && console.log('error message: ', data);

    return data.msg;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateReaderProfile = async (props: any): Promise<string> => {
  try {
    console.log('start updating user profile. ', props.email);

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: 'Bearer ' + props.token,
      },

      body: JSON.stringify({
        gender: props.gender,
        age: props.age,
        password: props.password,
      }),
    };

    console.log('update profile request data: ', requestOptions);
    const response = await fetch(`${UserApiURL}`, requestOptions);
    const data = await response.json();

    console.log('status: ', response.status);

    response.status === 200 && console.log('succeed to update user profile!');
    response.status !== 200 && console.log('error message: ', data);

    return data.msg;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getReader = async (props: any): Promise<ProfileType> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: 'Bearer ' + props.token,
      },
    };
    const response = await fetch(`${UserApiURL}`, requestOptions);
    if (response.status === 404) {
      return Promise.reject(`The user was not found.`);
    } else {
      const data = await response.json();
      return data.payload;
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getReaderById = async (id: number): Promise<ProfileType> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };

    const response = await fetch(`${profileURL}/${id}`, requestOptions);

    if (response.status === 404) {
      return Promise.reject(`The user was not found.`);
    } else {
      const data = await response.json();
      return data.payload;
    }
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getRecentCollectedReadersByVolumeId = async (
  volumeId: string
): Promise<ReaderType[]> => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    };

    const response = await fetch(`${recentCollectedUsersURL}/${volumeId}`, requestOptions);
    if (response.status === 404) {
      return Promise.reject(`The book was not found.`);
    } else {
      const data = await response.json();
      return data.payload;
    }
  } catch (err) {
    return Promise.reject(err);
  }
};
