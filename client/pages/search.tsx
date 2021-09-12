import {
  Box,
  Container,
  FormHelperText,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useSearchStyles } from '../MuiThemes/search';
import SearchIcon from '@material-ui/icons/Search';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_ARTICLES } from '../graphql/queries/articles';
import { PreviewPost } from '../components/Posts/PreviewPost';
import { IArticle } from '../types/article';
import { Skeleton } from '@material-ui/lab';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const Search = () => {
  const classes = useSearchStyles();

  const [executeSearch, { data, loading, called }] = useLazyQuery(SEARCH_ARTICLES);

  const SearchSchema = yup.object().shape({
    search: yup.string().required().min(3),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ search: string }>({
    resolver: yupResolver(SearchSchema),
  });

  const onSearchHandler = (data: { search: string }) => {
    executeSearch({
      variables: {
        filterQuery: data.search,
      },
    });
  };

  return (
    <Box component="section" className={`${classes.search} black-bg`}>
      <Container maxWidth="lg" className={'py'}>
        <Box component="div" style={{ position: 'relative' }}>
          <Controller
            name="search"
            control={control}
            defaultValue={''}
            render={({ field }) => (
              <>
                <div style={{ position: 'relative' }}>
                  <TextField
                    {...field}
                    className={`${classes.search}__input`}
                    placeholder="Search for texts, videos, news and much more ..."
                    variant="outlined"
                    color="secondary"
                  />
                  <IconButton
                    type="submit"
                    className={`${classes.search}__button`}
                    onClick={handleSubmit(onSearchHandler)}
                    disabled={loading}>
                    <SearchIcon />
                  </IconButton>
                </div>

                <FormHelperText error style={{ fontSize: '18px' }}>
                  {errors.search?.message}
                </FormHelperText>
              </>
            )}
          />
        </Box>
        {!called && (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            component="div"
            className={`${classes.search}__content py`}>
            <SearchIcon className={`${classes.search}__content-icon`} />
            <Typography
              gutterBottom
              component="h2"
              color="primary"
              className={`${classes.search}__content-title`}>
              Write what you are looking for
            </Typography>
          </Grid>
        )}

        {loading && (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            className="py">
            {Array.from(new Array(6)).map((_, idx) => (
              <Grid item xs={4} key={idx}>
                <Skeleton variant="rect" width={400} height={300} />
              </Grid>
            ))}
          </Grid>
        )}

        {data && data.ArticlesSearchQuery.length !== 0 && (
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
                {data.ArticlesSearchQuery.map((article: IArticle) => {
                  return (
                    <Grid item xs={4} key={article.id}>
                      <PreviewPost {...article} />
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Search;
