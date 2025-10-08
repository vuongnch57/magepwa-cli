import { useMutation, useQuery } from '@apollo/client';
import { SEND_TAX_REQUEST } from './taxInvoice.gql';
import { useCallback, useMemo } from 'react';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import checkoutOperations from '@magento/peregrine/lib/talons/CheckoutPage/checkoutPage.gql';
import { useToasts } from '@magento/peregrine';

export const useTaxInvoice = () => {
  const [{ cartId }] = useCartContext();
  const [, { addToast }] = useToasts();
  const { data: showTaxBillingData } = useQuery(
    checkoutOperations.getIsShowTaxBilling,
    {
      skip: !cartId,
      variables: { cartId }
    }
  );

  const [sendTaxRequest, { loading }] = useMutation(SEND_TAX_REQUEST);

  const isShowTaxBilling = useMemo(
    () => showTaxBillingData?.cart?.isShowTaxBilling || false,
    [showTaxBillingData]
  );

  const handleSubmit = useCallback(
    async (values, is_use_tax = true) => {
      try {
        await sendTaxRequest({
          variables: {
            taxRequestInput: {
              ...values,
              cart_id: cartId,
              is_use_tax
            }
          }
        });
      } catch (e) {
        addToast({
          type: 'error',
          message: e.message,
          timeout: 5000,
          dismissable: true
        });
        return false;
      }
      return true;
    },
    [cartId, sendTaxRequest, addToast]
  );

  return { handleSubmit, loading, isShowTaxBilling };
};
