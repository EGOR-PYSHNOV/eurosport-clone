import { gql } from '@apollo/client';

export const UPDATE_USER_ROLE = gql`
  mutation updateUserRole($id: Int!, $roleId: Int!) {
    updateUserRole(id: $id, roleId: $roleId) {
      id
      login
      email
      role {
        title
      }
    }
  }
`;
