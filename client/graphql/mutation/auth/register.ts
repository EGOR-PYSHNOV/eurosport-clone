import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation register($login: String!, $email: String!, $password: String!) {
    register(input: { login: $login, email: $email, password: $password }) {
      user {
        login
      }
    }
  }
`;
