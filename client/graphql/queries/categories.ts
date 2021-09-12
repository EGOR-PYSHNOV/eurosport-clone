import { gql } from '@apollo/client';

export const GET_ALL_CATEGORIES_LINK = gql`
  {
    getAllCategories {
      id
      title
      slug
    }
  }
`;

export const GET_CATEGORY_TITLE = gql`
  query getCategory($slug: String!) {
    getCategory(slug: $slug) {
      id
      title
    }
  }
`;
