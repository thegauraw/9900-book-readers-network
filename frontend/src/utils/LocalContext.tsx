import React, { useState, useReducer, useEffect } from 'react';
import { TransferState } from '../types/TransferState';
import { CollectionData } from '../types/collectionTypes';
import { EventData } from '../types/eventTypes';
import { setLocalStorage, getLocalStorage } from './useLocalStorage';
import {
  ReadingByBookIdFromOwnerResponse,
  ReadingsListByBookIdResponse,
} from '../types/ReadingTypes';
import { SearchSuccessResponse, SearchSuccessItemResponse } from '../types/SearchTypes';
import { MonthlyGoalStatus } from '../types/GoalTypes';

export type ContextType = {
  logged: boolean;
  setLogged: Function;
  token: string;
  setToken: Function;
  collection: TransferState<CollectionData>;
  setCollection: Function;
  collectionList: TransferState<CollectionData[]>;
  setCollectionList: Function;
  event: TransferState<EventData>;
  setEvent: Function;
  eventList: TransferState<EventData[]>;
  setEventList: Function;
  ownedReadingByBookId: TransferState<ReadingByBookIdFromOwnerResponse>;
  setOwnedReadingByBookId: Function;
  readingListByBookId: TransferState<ReadingsListByBookIdResponse>;
  setReadingListByBookId: Function;
  searchResultList: TransferState<SearchSuccessResponse>;
  setSearchResultList: Function;
  bookDetails: TransferState<SearchSuccessItemResponse>;
  setBookDetails: Function;
  goals: TransferState<MonthlyGoalStatus[]>;
  setGoals: Function;
};

export const globalParas = {
  logged: false,
  setLogged: (logged: any) => {},
  token: 'xxx',
  setToken: (token: any) => {},
  collection: { isLoading: false, settlement: null },
  setCollection: (f: Partial<TransferState<CollectionData>>) => f,
  collectionList: { isLoading: false, settlement: null },
  setCollectionList: (f: Partial<TransferState<CollectionData[]>>) => f,
  event: { isLoading: false, settlement: null },
  setEvent: (f: Partial<TransferState<EventData>>) => f,
  eventList: { isLoading: false, settlement: null },
  setEventList: (f: Partial<TransferState<EventData[]>>) => f,
  ownedReadingByBookId: { isLoading: false, settlement: null },
  setOwnedReadingByBookId: (f: Partial<TransferState<ReadingByBookIdFromOwnerResponse>>) => f,
  readingListByBookId: { isLoading: false, settlement: null },
  setReadingListByBookId: (f: Partial<TransferState<ReadingsListByBookIdResponse>>) => f,
  searchResultList: { isLoading: false, settlement: null },
  setSearchResultList: (f: Partial<TransferState<SearchSuccessResponse>>) => f,
  bookDetails: { isLoading: false, settlement: null },
  setBookDetails: (f: Partial<TransferState<SearchSuccessItemResponse>>) => f,
  goals: { isLoading: false, settlement: null },
  setGoals: (f: Partial<TransferState<MonthlyGoalStatus[]>>) => f,
};

export const Appctx = React.createContext<ContextType>(globalParas);

//export const AppProvider = Appctx.Provider;
export const AppConsumer = Appctx.Consumer;

export const AppProvider = ({ children }: any) => {
  const [logged, setLogged] = useState(() => getLocalStorage('logged', false));
  const [token, setToken] = useState(() => getLocalStorage('token', ''));

  const [collection, setCollection] = useReducer(
    (
      fetchState: TransferState<CollectionData>,
      updates: Partial<TransferState<CollectionData>>
    ) => ({ ...fetchState, ...updates }),
    { isLoading: false, settlement: null }
  );

  const [collectionList, setCollectionList] = useReducer(
    (
      fetchState: TransferState<CollectionData[]>,
      updates: Partial<TransferState<CollectionData[]>>
    ) => ({ ...fetchState, ...updates }),
    { isLoading: false, settlement: null }
  );

  const [event, setEvent] = useReducer(
    (
      fetchState: TransferState<EventData>,
      updates: Partial<TransferState<EventData>>
    ) => ({ ...fetchState, ...updates }),
    { isLoading: false, settlement: null }
  );

  const [eventList, setEventList] = useReducer(
    (
      fetchState: TransferState<EventData[]>,
      updates: Partial<TransferState<EventData[]>>
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

  const [readingListByBookId, setReadingListByBookId] = useReducer(
    (
      fetchState: TransferState<ReadingsListByBookIdResponse>,
      updates: Partial<TransferState<ReadingsListByBookIdResponse>>
    ) => ({ ...fetchState, ...updates }),
    { isLoading: false, settlement: null }
  );

  const [searchResultList, setSearchResultList] = useReducer(
    (
      fetchState: TransferState<SearchSuccessResponse>,
      updates: Partial<TransferState<SearchSuccessResponse>>
    ) => ({ ...fetchState, ...updates }),
    { isLoading: false, settlement: null }
  );

  const [bookDetails, setBookDetails] = useReducer(
    (
      fetchState: TransferState<SearchSuccessItemResponse>,
      updates: Partial<TransferState<SearchSuccessItemResponse>>
    ) => ({ ...fetchState, ...updates }),
    { isLoading: false, settlement: null }
  );

  const [goals, setGoals] = useReducer(
    (
      fetchState: TransferState<MonthlyGoalStatus[]>,
      updates: Partial<TransferState<MonthlyGoalStatus[]>>
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
        collection,
        setCollection,
        collectionList,
        setCollectionList,
        event,
        setEvent,
        eventList,
        setEventList,
        ownedReadingByBookId,
        setOwnedReadingByBookId,
        readingListByBookId,
        setReadingListByBookId,
        searchResultList,
        setSearchResultList,
        bookDetails,
        setBookDetails,
        goals,
        setGoals,
      }}
    >
      {children}
    </Appctx.Provider>
  );
};
