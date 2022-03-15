import React, { useState, useReducer } from 'react';
import { TransferState } from '../types/TransferState';
import { CollectionListData } from '../types/ResponseTypes';

export type ContextType = {
  logged: boolean;
  setLogged: Function;
  token: string;
  setToken: Function;
  collectionList: TransferState<CollectionListData[]>;
  setCollectionList: Function;
};

export const globalParas = {
  logged: false,
  setLogged: (logged: any) => {},
  token: 'xxx',
  setToken: (token: any) => {},
  collectionList: { isLoading: false, settlement: null },
  setCollectionList: (f: Partial<TransferState<CollectionListData[]>>) => f,
};

export const Appctx = React.createContext<ContextType>(globalParas);

//export const AppProvider = Appctx.Provider;
export const AppConsumer = Appctx.Consumer;

export const AppProvider = ({ children }: any) => {
  const [logged, setLogged] = useState(false);
  const [token, setToken] = useState('xxx');

  const [collectionList, setCollectionList] = useReducer(
    (
      fetchState: TransferState<CollectionListData[]>,
      updates: Partial<TransferState<CollectionListData[]>>
    ) => ({ ...fetchState, ...updates }),
    { isLoading: false, settlement: null }
  );

  return (
    <Appctx.Provider
      value={{
        logged,
        setLogged,
        token,
        setToken,
        collectionList,
        setCollectionList,
      }}
    >
      {children}
    </Appctx.Provider>
  );
};
