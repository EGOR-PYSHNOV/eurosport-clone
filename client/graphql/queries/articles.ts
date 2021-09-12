import { ArticleSnippet } from './../fragments/ArticleSnippet';
import { gql } from '@apollo/client';

export const GET_ALL_ARTICLES = gql`
  ${ArticleSnippet}
  query getAllArticles($limit: Int, $isRandom: Boolean) {
    getAllArticles(filters: { limit: $limit }, isRandom: $isRandom) {
      ...ArticleSnippet
    }
  }
`;

export const GET_HOT_ARTICLE = gql`
  ${ArticleSnippet}
  query {
    getHotArticle {
      ...ArticleSnippet
    }
  }
`;

export const GET_LATEST_ARTICLES = gql`
  query getAllArticles($limit: Int!, $excludeArticle: String) {
    getAllArticles(filters: { sortByDate: DESC, limit: $limit }, excludeArticle: $excludeArticle) {
      id
      title
      createdDate
      image
      slug
      category {
        title
        slug
      }
    }
  }
`;

export const GET_TOP_ARTICLES_BY_TYPE = gql`
  query getTopViewsArticles($type: TypePost) {
    getTopViewsArticles(sortTopViewsByTypePost: { type: $type }) {
      id
      title
      createdDate
      image
      slug
      video
      category {
        title
        slug
      }
    }
  }
`;

export const GET_ARTICLE = gql`
  ${ArticleSnippet}
  query getArticle($slug: String!) {
    getArticle(slug: $slug) {
      ...ArticleSnippet
    }
  }
`;

export const GET_ARTICLES_BY_CATEGORY = gql`
  ${ArticleSnippet}
  query getArticlesByCategory($id: Int!) {
    getArticlesByCategory(id: $id) {
      ...ArticleSnippet
    }
  }
`;

export const SEARCH_ARTICLES = gql`
  ${ArticleSnippet}
  query ArticlesSearchQuery($filterQuery: String!) {
    ArticlesSearchQuery(filters: $filterQuery) {
      ...ArticleSnippet
    }
  }
`;
