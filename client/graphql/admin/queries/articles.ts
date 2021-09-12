import { gql } from '@apollo/client';

export const GET_ALL_ARTICLES_ADMIN = gql`
  {
    getAllArticles {
      id
      title
      hot
      views
      createdDate
      updatedDate
      category {
        title
      }
      slug
    }
  }
`;

export const GET_ARTICLE = gql`
  query getArticle($slug: String!) {
    getArticle(slug: $slug) {
      id
      title
      hot
      image
      text
      description

      category {
        id
        title
      }
      slug
    }
  }
`;
