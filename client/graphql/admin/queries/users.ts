import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  {
    getAllUsers {
      id
      login
      email
      role {
        title
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: Int!) {
    getUser(id: $id) {
      id
      login
      email
      role {
        title
      }
    }
  }
`;
