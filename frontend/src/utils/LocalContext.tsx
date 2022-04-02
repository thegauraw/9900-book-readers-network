import React, { useState, useReducer, useEffect } from 'react';
import { TransferState } from '../types/TransferState';
import { CollectionListData } from '../types/ResponseTypes';
import { setLocalStorage, getLocalStorage } from './useLocalStorage';
import { ReadingByBookIdFromOwnerResponse } from '../types/ReadingTypes';
export type ContextType = {
  logged: boolean;
  setLogged: Function;
  token: string;
  setToken: Function;
  collectionList: TransferState<CollectionListData[]>;
  setCollectionList: Function;
  ownedReadingByBookId: TransferState<ReadingByBookIdFromOwnerResponse>;
  setOwnedReadingByBookId: Function;
};

export const globalParas = {
  logged: false,
  setLogged: (logged: any) => {},
  token: 'xxx',
  setToken: (token: any) => {},
  collectionList: { isLoading: false, settlement: null },
  setCollectionList: (f: Partial<TransferState<CollectionListData[]>>) => f,
  ownedReadingByBookId: { isLoading: false, settlement: null },
  setOwnedReadingByBookId: (f: Partial<TransferState<ReadingByBookIdFromOwnerResponse>>) => f,
};

export const Appctx = React.createContext<ContextType>(globalParas);

//export const AppProvider = Appctx.Provider;
export const AppConsumer = Appctx.Consumer;

export const AppProvider = ({ children }: any) => {
  const [logged, setLogged] = useState(() => getLocalStorage('logged', false));
  const [token, setToken] = useState(() => getLocalStorage('token', ''));

  const [collectionList, setCollectionList] = useReducer(
    (
      fetchState: TransferState<CollectionListData[]>,
      updates: Partial<TransferState<CollectionListData[]>>
    ) => ({ ...fetchState, ...updates }),
    { isLoading: false, settlement: null }
  );

  const [ownedReadingByBookId, setOwnedReadingByBookId] = useReducer(
    (
      fetchState: TransferState<ReadingByBookIdFromOwnerResponse>,
      updates: Partial<TransferState<ReadingByBookIdFromOwnerResponse>>
    ) => ({ ...fetchState, ...updates }),
    { isLoading: false, settlement: null }
  );

  useEffect(() => {
    setLocalStorage('logged', logged);
  }, [logged]);

  useEffect(() => {
    setLocalStorage('token', token);
  }, [token]);

  return (
    <Appctx.Provider
      value={{
        logged,
        setLogged,
        token,
        setToken,
        collectionList,
        setCollectionList,
        ownedReadingByBookId,
        setOwnedReadingByBookId,
      }}
    >
      {children}
    </Appctx.Provider>
  );
};
