import { gql } from '@apollo/client';

export const GET_SUB_DISTRICTS_QUERY = gql`
    query getSubDistricts($districtId: String!) {
        getSubDistricts(input: { district_id: $districtId }) {
            id
            district_id
            name
            postcode
        }
    }
`;
