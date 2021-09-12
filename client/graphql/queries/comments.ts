import { gql } from '@apollo/client';

export const GET_COMMENTS = gql`
  query getComments($id: Int!) {
    getComments(id: $id) {
      id
      text
      user {
        login
      }
    }
  }
`;
