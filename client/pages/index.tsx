import { Box, Grid, Container, Typography } from '@material-ui/core';
import { useHomeStyles } from '../MuiThemes/home';
import Link from 'next/link';
import { Link as MuiLink } from '@material-ui/core';

import NavigateNextOutlinedIcon from '@material-ui/icons/NavigateNextOutlined';
import { SingleHeroPost } from '../components/Posts/SingleHeroPost';
import { SmallLastPost } from '../components/Posts/SmallLastPost';
import { PreviewPost } from '../components/Posts/PreviewPost';
import {
  GET_ALL_ARTICLES,
  GET_HOT_ARTICLE,
  GET_LATEST_ARTICLES,
  GET_TOP_ARTICLES_BY_TYPE,
} from '../graphql/queries/articles';
import React from 'react';
import { client } from './_app';
import { IArticle } from '../types/article';

interface IHome {
  allArticles: IArticle[];
  hotArticle: IArticle;
  getLastArticles: IArticle[];
  getTopArticlesByImage: IArticle[];
}

const Home: React.FC<IHome> = ({
  allArticles,
  hotArticle,
  getLastArticles,
  getTopArticlesByImage,
}) => {
  const classes = useHomeStyles();

  return (
    <>
      <Box component="section" className={`${classes.HomeListBlack} black-bg`}>
        <Container maxWidth="lg">
          <Grid container direction="row" justifyContent="center" alignItems="center" spacing={3}>
            <Grid item xs={8}>
              <SingleHeroPost {...hotArticle} />
            </Grid>
            <Grid item xs={4}>
              <Box className="">
                <Typography
                  color="primary"
                  gutterBottom
                  component="div"
                  className={`${classes.HomeLatestNewsSide}__title`}>
                  Latest news
                </Typography>

                <div className={`${classes.HomeLatestNewsSide}__list`}>
                  {getLastArticles.map((article) => (
                    <SmallLastPost key={article.id} {...article} />
                  ))}
                </div>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box component="section" className={`mb-3 py black-bg`}>
        <Container maxWidth="lg">
          <Typography color="primary" gutterBottom component="h2" variant="h4">
            Top Viewed posts
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={3}
            className="py">
            {getTopArticlesByImage.map((article: IArticle) => {
              return (
                <Grid item xs={4} key={article.id}>
                  <PreviewPost {...article} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      <Box component="section" className={` py black-bg`}>
        <Container maxWidth="lg">
          <Typography color="primary" gutterBottom component="h2" variant="h4">
            More News
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={3}
            className="py">
            {allArticles.map((article) => {
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

export async function getServerSideProps() {
  const allArticles = await client.query({
    query: GET_ALL_ARTICLES,
    variables: {
      limit: 6,
      isRandom: true,
    },
  });
  const hotArticle = await client.query({ query: GET_HOT_ARTICLE });
  const getLastArticles = await client.query({
    query: GET_LATEST_ARTICLES,
    variables: {
      limit: 4,
    },
  });
  const getTopArticlesByImage = await client.query({
    query: GET_TOP_ARTICLES_BY_TYPE,
    variables: {
      type: 'RegularPost',
    },
  });

  return {
    props: {
      allArticles: allArticles.data.getAllArticles,
      hotArticle: hotArticle.data.getHotArticle,
      getLastArticles: getLastArticles.data.getAllArticles,
      getTopArticlesByImage: getTopArticlesByImage.data.getTopViewsArticles,
    },
  };
}

export default Home;
