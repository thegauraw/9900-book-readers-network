export interface LoginDataType {
  email: string;
  password: string;
  setToken: Function;
  setLogged: Function;
}

export interface RegisterDataType {
  email: string;
  password: string;
  setToken: Function;
  setLogged: Function;
}

export interface CollectionListData {
  id: string;
  name: string;
  bookNumber: number;
  recentBookCovers: string[];
}
