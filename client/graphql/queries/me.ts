import { gql } from '@apollo/client';

export const ME = gql`
  {
    me {
      login
      role {
        title
      }
    }
  }
`;

export const ME_PROFILE = gql`
  {
    me {
      login
      email
    }
  }
`;
