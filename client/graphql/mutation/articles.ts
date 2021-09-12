import { gql } from '@apollo/client';

export const ADD_VIEW_TO_ARTICLE = gql`
  mutation updateViewsArticle($id: Int!) {
    updateViewsArticle(id: $id) {
      views
    }
  }
`;
