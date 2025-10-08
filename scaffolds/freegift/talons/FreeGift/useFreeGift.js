import { useQuery } from '@apollo/client';
import operations from './freeGift.gql';

export const useFreeGift = () => {
  const { freeGiftConfigQuery } = operations;
  const { data } = useQuery(freeGiftConfigQuery, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first'
  });

  return {
    config: data?.storeConfig
  };
};
