import { gql } from '@apollo/client';

export const SEND_TAX_REQUEST = gql`
  mutation sendTaxRequest($taxRequestInput: TaxRequestInput) {
    sendTaxRequest(input: $taxRequestInput) {
      cart {
        id
        tax_request {
          billing_email
          branch_code
          identification_number
          juristic_name
          passport_number
          tax_number
          type_tax_invoice
        }
      }
    }
  }
`;
