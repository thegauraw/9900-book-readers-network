import { getCollectionListApi, LoginApiURL, RegisterApiURL } from './callableURLs';
import { CollectionListData, LoginDataType, RegisterDataType } from '../types/ResponseTypes';

export const fetchCollectionListData = async (): Promise<CollectionListData[]> => {
  try {
    const response = await fetch(getCollectionListApi);
    const data = await response.json();
    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const fetchLogin = async (props: any): Promise<LoginDataType> => {
  try {
    console.log('start logging. ', props.email, props.password);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },

      body: JSON.stringify({
        email: props.email,
        pwd: props.password,
      }),
    };

    const response = await fetch(LoginApiURL, requestOptions);
    const data = await response.json();

    console.log('after login: ', data.token);
    console.log('status: ', response.status);

    response.status === 200 && props.setToken(data.token);
    response.status === 200 && props.setLogged(true);
    response.status === 200 && console.log('succeed to login!');

    return data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export const fetchRegister = async (props: any): Promise<string> => {
  try {
    console.log('start logging. ', props.email, props.password);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },

      body: JSON.stringify({
        username: props.username,
        email: props.email,
        password: props.password,
      }),
    };

    const response = await fetch(RegisterApiURL, requestOptions);
    const data = await response.json();

    console.log('after register: ', data.token);
    console.log('status: ', response.status);

    response.status === 200 && props.setToken(data.token);
    response.status === 200 && props.setLogged(true);
    response.status === 200 && console.log('succeed to register!');
    response.status !== 200 && console.log('register resp: ', data);

    if (response.status !== 200 && response.status !== 201) return data.message;

    return 'success';
  } catch (err) {
    return Promise.reject(err);
  }
};
