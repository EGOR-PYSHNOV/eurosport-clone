import { gql } from '@apollo/client';

export const DELETE_ARTICLE = gql`
  mutation deleteArticle($id: Int!) {
    deleteArticle(id: $id) {
      text
    }
  }
`;

export const CREATE_ARTICLE = gql`
  mutation createArticle(
    $title: String!
    $description: String!
    $text: String!
    $image: Upload!
    $hot: Boolean
    $slug: String!
    $category: Int!
  ) {
    createArticle(
      title: $title
      description: $description
      text: $text
      image: $image
      hot: $hot
      slug: $slug
      categoryId: $category
    ) {
      text
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation updateArticle(
    $id: Int!
    $title: String!
    $description: String!
    $text: String!
    $image: Upload
    $hot: Boolean!
    $slug: String!
    $category: Int!
  ) {
    updateArticle(
      id: $id
      title: $title
      description: $description
      text: $text
      image: $image
      hot: $hot
      slug: $slug
      categoryId: $category
    ) {
      text
    }
  }
`;
