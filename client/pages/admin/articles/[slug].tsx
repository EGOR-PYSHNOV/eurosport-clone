import React from 'react';
import dynamic from 'next/dynamic';
const MyEditor = dynamic(() => import('../../../components/admin/MyEditor'), {
  ssr: false,
});
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import { useSingle } from '../../../MuiThemes/admin/single';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IArticle } from '../../../types/article';
import { useMutation, useQuery } from '@apollo/client';
import {
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
} from '../../../graphql/admin/mutation/articles';
import slugify from 'react-slugify';
import { UploadImage } from '../../../components/admin/UploadImage';
import { GET_CATEGORIES } from '../../../graphql/admin/queries/categories';
import { ICategory } from '../../../types/category';
import { GET_ARTICLE } from '../../../graphql/admin/queries/articles';
import { useRouter } from 'next/router';
import { SERVER_URL } from '../../_app';

type withOutCategory = Omit<IArticle, 'category'>;
interface SubmitType extends withOutCategory {
  category: string;
}

const Article = () => {
  const classes = useSingle();
  const {
    query: { slug },
  } = useRouter();
  const [createArticle] = useMutation(CREATE_ARTICLE);
  const [updateArticle] = useMutation(UPDATE_ARTICLE);
  const getCategories = useQuery(GET_CATEGORIES);
  const { data, loading } = useQuery(GET_ARTICLE, {
    variables: {
      slug,
    },
  });

  const ArticleSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    text: yup.mixed().required(),
    hot: yup.boolean().default(false),
    slug: yup.string().required(),
    image: yup.mixed().required(),
    category: yup.string().required(),
  });

  const articleForm = useForm({
    resolver: yupResolver(ArticleSchema),
  });

  const onSubmit = (formData: SubmitType) => {
    const categoryId = getCategories.data.getAllCategories.filter(
      (category: ICategory) => category.title === formData.category,
    )[0].id;

    if (slug?.includes('new')) {
      createArticle({
        variables: {
          title: formData.title,
          description: formData.description,
          text: formData.text,
          image: formData.image[0],
          hot: formData.hot,
          slug: formData.slug,
          category: categoryId,
        },
      });
    } else {
      updateArticle({
        variables: {
          id: data.getArticle.id,
          title: formData.title,
          description: formData.description,
          text: formData.text,
          image: formData.image[0],
          hot: formData.hot,
          slug: formData.slug,
          category: categoryId,
        },
      });
    }
  };

  if (loading) {
    return (
      <Box component="section">
        <Container
          maxWidth="lg"
          className={'py'}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <CircularProgress />
        </Container>
      </Box>
    );
  }

  return (
    <Box component="section" className={`black-bg`}>
      <Container maxWidth="lg" className={'py'}>
        <FormProvider {...articleForm}>
          <form onSubmit={articleForm.handleSubmit(onSubmit)}>
            <Controller
              name="title"
              control={articleForm.control}
              defaultValue={data ? data.getArticle.title : ''}
              render={({ field }) => (
                <>
                  <TextField
                    label="Title"
                    variant="outlined"
                    className={classes.root}
                    fullWidth
                    {...field}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      field.onChange(e);
                      articleForm.setValue('slug', slugify(e.target.value));
                    }}
                  />
                  <FormHelperText error>
                    {articleForm.formState.errors.title?.message}
                  </FormHelperText>
                </>
              )}
            />

            <UploadImage
              image={data ? `${SERVER_URL}/${data.getArticle.image}` : ''}
            />

            <Controller
              name="description"
              control={articleForm.control}
              defaultValue={data ? data.getArticle.description : ''}
              render={({ field }) => (
                <>
                  <TextField
                    label="Description"
                    variant="outlined"
                    className={classes.root}
                    fullWidth
                    multiline
                    rows={4}
                    {...field}
                  />
                  <FormHelperText error>
                    {articleForm.formState.errors.description?.message}
                  </FormHelperText>
                </>
              )}
            />

            <MyEditor data={data ? data.getArticle.text : ''} />

            <Controller
              name="hot"
              control={articleForm.control}
              defaultValue={data ? data.getArticle.hot : false}
              render={({ field }) => (
                <>
                  <FormControl component="fieldset" {...field}>
                    <FormLabel component="legend" className={classes.root}>
                      Hot article
                    </FormLabel>
                    <RadioGroup
                      className={classes.root}
                      defaultValue={
                        data ? String(data.getArticle.hot) : 'false'
                      }
                    >
                      <FormControlLabel
                        value={'true'}
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value={'false'}
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                  <FormHelperText error>
                    {articleForm.formState.errors.hot?.message}
                  </FormHelperText>
                </>
              )}
            />

            <Controller
              name="slug"
              control={articleForm.control}
              defaultValue={data ? data.getArticle.slug : ''}
              render={({ field }) => (
                <>
                  <TextField
                    label="Slug"
                    variant="outlined"
                    className={classes.root}
                    fullWidth
                    {...field}
                  />
                  <FormHelperText error>
                    {articleForm.formState.errors.slug?.message}
                  </FormHelperText>
                </>
              )}
            />

            <Controller
              name="category"
              control={articleForm.control}
              defaultValue={data ? data.getArticle.category.title : ''}
              render={({ field }) => (
                <>
                  <FormControl fullWidth>
                    <InputLabel className={classes.root}>Category</InputLabel>

                    <Select
                      renderValue={(value) => `${value}`}
                      {...field}
                      onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                        field.onChange(e);

                        articleForm.setValue('category', e.target.value);
                      }}
                      className={classes.root}
                    >
                      {getCategories.data &&
                        getCategories.data.getAllCategories.map(
                          (category: ICategory) => (
                            <MenuItem
                              key={category.id}
                              id={category.id}
                              value={category.title}
                              className={classes.root}
                            >
                              {category.title}
                            </MenuItem>
                          ),
                        )}
                    </Select>
                    <FormHelperText error>
                      {articleForm.formState.errors.category?.message}
                    </FormHelperText>
                  </FormControl>
                </>
              )}
            />

            <div>
              <Button
                variant="outlined"
                type="submit"
                className={classes.root}
                color="primary"
              >
                Save
              </Button>
            </div>
          </form>
        </FormProvider>
      </Container>
    </Box>
  );
};

export default Article;
