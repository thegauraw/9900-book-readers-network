import { LoginApiURL, RegisterApiURL } from './callableURLs';
import { LoginDataType, RegisterDataType } from '../types/ResponseTypes';

export const LoginAPI = async (props: any): Promise<string> => {
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
        password: props.password,
      }),
    };

    const response = await fetch(LoginApiURL, requestOptions);
    const data = await response.json();

    console.log('after login: ', data.token);
    console.log('status: ', response.status);

    response.status === 200 && props.setToken(data.token);
    response.status === 200 && props.setLogged(true);
    response.status === 200 && console.log('succeed to login!');

    if (response.status !== 200) return data.msg;

    return 'success';
  } catch (err) {
    return Promise.reject(err);
  }
};

export const RegisterAPI = async (props: any): Promise<string> => {
  try {
    console.log('start registering. ', props.email, props.password);

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
        gender: 'Male',
        age: 18,
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

    if (response.status !== 200 && response.status !== 201) return data.msg;

    return 'success';
  } catch (err) {
    return Promise.reject(err);
  }
};
