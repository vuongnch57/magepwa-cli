import React, { createContext, useContext, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';

const StoreContext = createContext();

const initialState = {};

const GET_STORE_CONFIG = gql`
  query getStoreConfigs {
    storeConfig {
      id
      store_code
      product_url_suffix
    }
  }
`;

const StoreContextProvider = props => {
  const { children } = props;

  const { data: storeConfigures } = useQuery(GET_STORE_CONFIG, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  });

  const contextValue = useMemo(() => {
    const storeConfig = storeConfigures?.storeConfig || {};
    return storeConfigures
      ? {
          ...storeConfig
        }
      : initialState;
  }, [storeConfigures]);

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

export const useStoreContext = () => useContext(StoreContext);
