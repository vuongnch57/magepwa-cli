import { gql } from '@apollo/client';

export const GET_DISTRICTS_QUERY = gql`
    query getDistricts($regiondId: String!) {
        getDistricts(input: {
            region_id: $regiondId
        }) {
            id
            region_id
            name
        }
    }
`;
