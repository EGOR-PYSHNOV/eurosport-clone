import { Box, Container, Grid, Typography } from '@material-ui/core';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import React from 'react';
import { PreviewPost } from '../../components/Posts/PreviewPost';
import { GET_ARTICLES_BY_CATEGORY } from '../../graphql/queries/articles';

import { GET_ALL_CATEGORIES_LINK, GET_CATEGORY_TITLE } from '../../graphql/queries/categories';
import { IArticle } from '../../types/article';
import { ICategory } from '../../types/category';
import { client } from '../_app';

interface ICategoryPage extends ICategory {
  articles: IArticle[];
}

const Category: React.FC<ICategoryPage> = ({ title, articles }) => {
  return (
    <>
      <Box component="section" className={` py black-bg`}>
        <Container maxWidth="lg">
          <Typography color="primary" gutterBottom component="h2" variant="h4">
            {title}
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            className="py">
            {articles.map((article) => {
              return (
                <Grid item xs={4} key={article.id}>
                  <PreviewPost {...article} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  const categoryTitle = await client.query({
    query: GET_CATEGORY_TITLE,
    variables: {
      slug: params?.categoryId,
    },
  });

  const articles = await client.query({
    query: GET_ARTICLES_BY_CATEGORY,
    variables: {
      id: categoryTitle.data.getCategory.id,
    },
  });

  return {
    props: {
      title: categoryTitle.data.getCategory.title,
      articles: articles.data.getArticlesByCategory,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({ query: GET_ALL_CATEGORIES_LINK });
  const paths = data.getAllCategories.map((category: ICategory) => ({
    params: { categoryId: `${category.slug}` },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default Category;
