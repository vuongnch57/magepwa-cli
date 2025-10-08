import { useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import { useCartContext } from "@magento/peregrine/lib/context/cart";
import operations from "./appliedCartRules.gql";

export const useAppliedCartRules = () => {
  const [{ cartId }] = useCartContext();

  const [getAppliedRulesRequest, { loading: cartRulesLoading }] = useLazyQuery(
    operations.loadAppliedRuleQuery,
    {
      fetchPolicy: "cache-and-network",
    }
  );

  const getAppliedRules = useCallback(() => {
    if (cartId) {
      getAppliedRulesRequest({
        variables: {
          cartId,
        },
      });
    }
  }, [cartId, getAppliedRulesRequest]);

  return {
    getAppliedRules,
    cartRulesLoading,
  };
};
