import { useMutation, useQuery } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormHelperText,
  TextField,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import slugify from 'react-slugify';
import * as yup from 'yup';
import { CREATE_CATEGORY, UPDATE_CATEGORY } from '../../../graphql/admin/mutation/categories';
import { GET_CATEGORY } from '../../../graphql/admin/queries/categories';
import { useSingle } from '../../../MuiThemes/admin/single';
import { ICategory } from '../../../types/category';
const Category = () => {
  const classes = useSingle();
  const {
    query: { slug },
  } = useRouter();

  const { data, loading } = useQuery(GET_CATEGORY, { variables: { slug } });
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  const CategorySchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    slug: yup.string().required(),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CategorySchema),
  });

  const onSubmit = (dataForm: ICategory) => {
    if (slug?.includes('new')) {
      createCategory({
        variables: {
          title: dataForm.title,
          description: dataForm.description,
          slug: dataForm.slug,
        },
      });
    } else {
      updateCategory({
        variables: {
          id: data.getCategory.id,
          title: dataForm.title,
          description: dataForm.description,
          slug: dataForm.slug,
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
          style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Container>
      </Box>
    );
  }

  return (
    <Box component="section" className={`black-bg`}>
      <Container maxWidth="lg" className={'py'}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            defaultValue={data ? data.getCategory.title : ''}
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
                    setValue('slug', slugify(e.target.value));
                  }}
                />
                <FormHelperText error>{errors.title?.message}</FormHelperText>
              </>
            )}
          />

          <Controller
            name="description"
            control={control}
            defaultValue={data ? data.getCategory.description : ''}
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
                <FormHelperText error>{errors.description?.message}</FormHelperText>
              </>
            )}
          />

          <Controller
            name="slug"
            control={control}
            defaultValue={data ? data.getCategory.slug : ''}
            render={({ field }) => (
              <>
                <TextField
                  label="Slug"
                  variant="outlined"
                  className={classes.root}
                  fullWidth
                  {...field}
                />
                <FormHelperText error>{errors.slug?.message}</FormHelperText>
              </>
            )}
          />

          <div>
            <Button variant="outlined" type="submit" className={classes.root} color="primary">
              Save
            </Button>
          </div>
        </form>
      </Container>
    </Box>
  );
};

export default Category;
