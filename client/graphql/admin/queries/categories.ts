import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  {
    getAllCategories {
      id
      title
    }
  }
`;

export const GET_CATEGORY = gql`
  query getCategory($slug: String!) {
    getCategory(slug: $slug) {
      id
      title
      description
      slug
    }
  }
`;

export const GET_CATEGORIES_GRID = gql`
  {
    getAllCategories {
      id
      title
      description
      slug
    }
  }
`;
