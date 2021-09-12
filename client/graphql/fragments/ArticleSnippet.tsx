import { gql } from '@apollo/client';

export const ArticleSnippet = gql`
  fragment ArticleSnippet on Article {
    id
    title
    image
    video
    description
    text
    views
    updatedDate
    createdDate
    slug
    category {
      title
      slug
    }
  }
`;
