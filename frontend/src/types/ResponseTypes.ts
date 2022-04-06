export interface LoginDataType {
  email: string | null;
  password: string | null;
  setToken: Function;
  setLogged: Function;
}

export interface RegisterDataType {
  username: string | null;
  email: string | null;
  password: string | null;
  setToken: Function;
  setLogged: Function;
}
