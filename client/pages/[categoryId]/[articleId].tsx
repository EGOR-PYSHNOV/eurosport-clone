import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  FormHelperText,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextareaAutosize,
  Typography,
} from '@material-ui/core';
import Image from 'next/image';
import { GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';

import EuroIcon from '../../public/images/euro-icon.png';
import { useSingleArticleStyles } from '../../MuiThemes/singleArticle';
import { SmallLastPost } from '../../components/Posts/SmallLastPost';
import { client, SERVER_URL } from '../_app';
import { GET_ALL_ARTICLES, GET_ARTICLE, GET_LATEST_ARTICLES } from '../../graphql/queries/articles';
import { IArticle } from '../../types/article';
import { stringAvatar } from '../../utils/stringAvatar';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import { ME } from '../../graphql/queries/me';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from '../../graphql/mutation/comments';
import { GET_COMMENTS } from '../../graphql/queries/comments';
import { IComment } from '../../types/comment';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ADD_VIEW_TO_ARTICLE } from '../../graphql/mutation/articles';
import { formatDate } from '../../utils/formatDate';

interface ISingleArticle {
  lastArticles: IArticle[];
  article: IArticle;
  comments: IComment[];
  isAuth: boolean;
}

const SingleArticle: React.FC<ISingleArticle> = ({ lastArticles, article, comments, isAuth }) => {
  const classes = useSingleArticleStyles();
  const { id, title, description, text, image, updatedDate } = article;

  const CommentSchema = yup.object().shape({
    comment: yup.string().required().min(5),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ comment: string }>({
    resolver: yupResolver(CommentSchema),
  });

  const [commentsArticle, setCommentsArticle] = React.useState<IComment[] | []>(comments);

  const [addComment, { loading }] = useMutation(ADD_COMMENT);
  const [addView] = useMutation(ADD_VIEW_TO_ARTICLE);

  const addCommentHandler = async (data: { comment: string }) => {
    addComment({
      variables: {
        text: data.comment,
        articleId: id,
      },
    }).then(({ data }) => {
      setCommentsArticle([data.createComment, ...commentsArticle]);
    });
  };

  React.useEffect(() => {
    addView({
      variables: {
        id,
      },
    });
  }, []);

  return (
    <>
      <Box component="section">
        <Container maxWidth="lg" className={classes.singleArticle}>
          <Box component="div" className={`${classes.singleArticle}__inner`}>
            <Typography
              color="primary"
              gutterBottom
              component="h1"
              variant="h1"
              className={`${classes.singleArticle}__title`}>
              {title}
            </Typography>
            <Typography
              color="primary"
              gutterBottom
              component="h2"
              variant="h2"
              className={`${classes.singleArticle}__teaser`}>
              {description}
            </Typography>
          </Box>
          <div className="image-container">
            <Image
              src={`${SERVER_URL}/${image}`}
              alt="Big Image Article"
              className={'image'}
              layout="fill"
              objectFit={'contain'}
            />
          </div>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            className={`${classes.singleArticle}__content mb-3`}>
            <Grid item xs={6}>
              <Box
                component="div"
                className={`${classes.singleArticle}__author-block`}
                display="flex"
                alignItems="center">
                <Image
                  src={EuroIcon}
                  alt="author"
                  height="40px"
                  width="40px"
                  className={`${classes.singleArticle}__author-block-img`}
                />
                <Box component="div" className={`${classes.singleArticle}__author-block-info`}>
                  <Typography component="div">
                    Author: <b>Eurosport</b>
                  </Typography>
                  <Typography component="div" gutterBottom>
                    Update {formatDate(updatedDate)}
                  </Typography>
                </Box>
              </Box>
              <Box component="div" className={`${classes.singleArticle}__body `}>
                <Box component="div" className={`${classes.singleArticle}__body-text`}>
                  <div dangerouslySetInnerHTML={{ __html: text }} />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Typography
                gutterBottom
                component="div"
                className={`${classes.singleArticle}__last-news-title`}>
                Latest news
              </Typography>
              <div className={`${classes.singleArticle}__last-news-list`}>
                {lastArticles.map((article) => {
                  return <SmallLastPost key={article.id} {...article} postColor="textPrimary" />;
                })}
              </div>
            </Grid>
          </Grid>

          <Box component="div" className={`${classes.singleArticle}__comments mb-3`}>
            <Typography
              gutterBottom
              component="div"
              variant="h4"
              className={`${classes.singleArticle}__comments-title`}>
              Comments
            </Typography>

            {!isAuth ? (
              <Typography gutterBottom component="div" variant="h6">
                Register or Sign In to leave a comment!
              </Typography>
            ) : (
              <>
                <Controller
                  name="comment"
                  control={control}
                  defaultValue={''}
                  render={({ field }) => (
                    <>
                      <TextareaAutosize
                        {...field}
                        aria-label="minimum height"
                        minRows={3}
                        placeholder="Leave comment"
                        className={`${classes.singleArticle}__comments-input`}
                      />
                      <FormHelperText error style={{ fontSize: '18px' }}>
                        {errors.comment?.message}
                      </FormHelperText>
                    </>
                  )}
                />

                <Button
                  variant="contained"
                  style={{ backgroundColor: '#111', color: '#fff', marginTop: '20px' }}
                  disabled={loading}
                  onClick={handleSubmit(addCommentHandler)}
                  endIcon={<ArrowRightAltRoundedIcon>send</ArrowRightAltRoundedIcon>}>
                  Send Comment
                </Button>
              </>
            )}

            <List>
              {commentsArticle?.map((comment: IComment) => {
                return (
                  <Box key={comment.id}>
                    <ListItem alignItems="center" className={`${classes.singleArticle}__comment`}>
                      <ListItemAvatar>
                        <Avatar {...stringAvatar(comment.user.login)} />
                      </ListItemAvatar>
                      <ListItemText primary={<Typography>{comment.text}</Typography>} />
                    </ListItem>

                    <Divider />
                  </Box>
                );
              })}
            </List>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const me = await client.query({
    query: ME,
    errorPolicy: 'ignore',
  });

  const article = await client.query({
    query: GET_ARTICLE,
    variables: {
      slug: params?.articleId,
    },
  });

  const comments = await client.query({
    query: GET_COMMENTS,
    variables: {
      id: article.data.getArticle.id,
    },
  });

  const lastArticles = await client.query({
    query: GET_LATEST_ARTICLES,
    variables: {
      limit: 4,
      excludeArticle: params?.articleId,
    },
  });

  return {
    props: {
      lastArticles: lastArticles.data.getAllArticles,
      article: article.data.getArticle,
      comments: comments.data.getComments,
      slug: params?.articleId,
      isAuth: me.data ? true : false,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({ query: GET_ALL_ARTICLES });
  const paths = data.getAllArticles.map((article: IArticle) => ({
    params: {
      categoryId: article.category.slug,
      articleId: article.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default SingleArticle;
