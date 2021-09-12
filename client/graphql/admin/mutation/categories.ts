import { gql } from '@apollo/client';

export const DELETE_CATEGORY = gql`
  mutation deleteCategory($id: Int!) {
    deleteCategory(id: $id) {
      text
    }
  }
`;

export const CREATE_CATEGORY = gql`
  mutation createCategory($title: String!, $description: String!, $slug: String!) {
    createCategory(title: $title, description: $description, slug: $slug) {
      title
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation updateCategory($id: Int!, $title: String!, $description: String!, $slug: String!) {
    updateCategory(id: $id, title: $title, description: $description, slug: $slug) {
      title
    }
  }
`;
