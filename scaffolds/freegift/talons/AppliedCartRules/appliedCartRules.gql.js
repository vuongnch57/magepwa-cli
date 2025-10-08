import { gql } from "@apollo/client";
import { AppliedRulesFragment } from "@magento/peregrine/lib/talons/MiniCart/miniCartFragments.gql";

export const AppliedRulesFragment = gql`
  fragment AppliedRulesFragment on Cart {
    id
    prices {
      grand_total {
        currency
        value
      }
    }
    free_gift_list {
      applied_rule_ids
      items {
        name
        description
        rule_id
        to_date
      }
    }
  }
`;

const LOAD_APPLIED_RULES_QUERY = gql`
  query loadAppliedRules($cartId: String!) {
    cart(cart_id: $cartId) {
      id
      ...AppliedRulesFragment
    }
  }
  ${AppliedRulesFragment}
`;

export default {
  loadAppliedRuleQuery: LOAD_APPLIED_RULES_QUERY,
};
