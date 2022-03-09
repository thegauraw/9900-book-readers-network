import React from 'react';

export type ContextType = {
  logged: boolean,
  token: string,
}

export const globalParas = {
  logged: false,
  token: 'xxx',
}

export const Appctx = React.createContext<ContextType>(globalParas);

export const AppProvider = Appctx.Provider;
export const AppConsumer = Appctx.Consumer;