export interface LoginDataType {
  email: string;
  password: string;
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

export interface CollectionListData {
  id: string;
  name: string;
  bookNumber: number;
  recentBookCovers: string[];
}
