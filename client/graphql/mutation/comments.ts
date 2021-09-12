import { gql } from '@apollo/client';

export const ADD_COMMENT = gql`
  mutation addComment($text: String!, $articleId: Int!) {
    createComment(text: $text, articleId: $articleId) {
      id
      text
      user {
        login
      }
    }
  }
`;
