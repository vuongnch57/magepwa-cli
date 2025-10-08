import { gql } from '@apollo/client';

export const FREE_GIFT_CONFIG_QUERY = gql`
  query GetStoreConfigForFreeGift {
    storeConfig {
      store_code
      ampromo_messages_gift_selection_method
      ampromo_messages_popup_title
      ampromo_messages_add_button_title
      ampromo_messages_auto_open_popup
      ampromo_messages_display_remaining_gifts_counter
      ampromo_messages_add_message
      ampromo_messages_gifts_qty_for_popup
      ampromo_messages_cart_message
      ampromo_messages_prefix
      ampromo_messages_show_price_in_popup
      ampromo_messages_display_error_messages
      ampromo_messages_display_success_messages
    }
  }
`;

export const ADD_FREE_GIFT_MUTATION = gql`
  mutation addFreeItemsToCart($input: AddFreeItemToCartInput) {
    addFreeItems(input: $input) {
      cart {
        id
        items {
          uid
          product {
            uid
            name
            sku
          }
        }
        free_items_available {
          total_count
        }
      }
      user_errors {
        code
        message
      }
    }
  }
`;

export default {
  freeGiftConfigQuery: FREE_GIFT_CONFIG_QUERY,
  addFreeItemsToCart: ADD_FREE_GIFT_MUTATION
};
