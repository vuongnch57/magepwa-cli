import React from "react";
import InfoIcon from "@components/Icons/InfoIcon";
import { useStoreContext } from "@contexts/store";
import { useCartContext } from "@magento/peregrine/lib/context/cart";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const GET_CART_DETAILS_QUERY = gql`
  query GetCartDetails($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      free_items_available {
        total_count
      }
    }
  }
`;

const FreeGiftReminder = () => {
  const { storeConfig } = useStoreContext();
  const [{ cartId }] = useCartContext();

  const { data } = useQuery(GET_CART_DETAILS_QUERY, {
    fetchPolicy: "cache-only",
    skip: storeConfig.ampromo_messages_display_notification !== "1",
    variables: {
      cartId,
    },
  });

  if (
    storeConfig.ampromo_messages_display_notification !== "1" ||
    !data?.cart?.free_items_available?.total_count
  ) {
    return null;
  }

  return (
    <div className="flex items-center bg-[#FFF7DA] p-2 rounded-lg gap-x-4">
      <InfoIcon color="#D4A600" />
      <span
        className="text-sm text-[#D4A600] font-bold hover_[&>a]_underline"
        dangerouslySetInnerHTML={{
          __html: storeConfig.ampromo_messages_notification_text,
        }}
      />
    </div>
  );
};

export default FreeGiftReminder;
