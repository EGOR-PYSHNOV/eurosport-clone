import { useMutation, useQuery } from '@apollo/client';
import { Box, Button, CircularProgress, Container, Grid, InputBase } from '@material-ui/core';

import { Link as MuiLink } from '@material-ui/core';
import Link from 'next/link';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import {
  DataGrid,
  GridColDef,
  GridFilterModel,
  GridRenderCellParams,
  GridRowId,
} from '@mui/x-data-grid';

import React from 'react';
import { GET_ALL_ARTICLES_ADMIN } from '../../../graphql/admin/queries/articles';
import { useGridStyles } from '../../../MuiThemes/admin/grid';
import { formatData } from '../../../utils/formatData';
import { DELETE_ARTICLE } from '../../../graphql/admin/mutation/articles';
import { IArticle } from '../../../types/article';

const Articles = () => {
  const classes = useGridStyles();

  const { data, loading } = useQuery(GET_ALL_ARTICLES_ADMIN);
  const [articles, setArticles] = React.useState<IArticle[] | []>([]);
  const [deleteArticle] = useMutation(DELETE_ARTICLE);
  const [selectionArticleId, setSelectionArticleId] = React.useState<GridRowId[]>([]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'title',
      width: 200,
    },
    {
      field: 'hot',
      headerName: 'hot',
      width: 100,
    },
    {
      field: 'views',
      headerName: 'views',
      width: 150,
    },
    {
      field: 'category',
      headerName: 'category',
      width: 150,
    },
    {
      field: 'createdDate',
      headerName: 'createdDate',
      width: 200,
    },
    {
      field: 'updatedDate',
      headerName: 'updatedDate',
      width: 200,
    },

    {
      headerName: 'open',
      field: 'open',
      filterable: false,
      sortable: false,
      width: 200,
      // eslint-disable-next-line react/display-name
      renderCell: (params: GridRenderCellParams) => (
        <Link href={`/admin/articles/${params.getValue(params.id, 'slug')}`} passHref>
          <MuiLink>Open article</MuiLink>
        </Link>
      ),
    },
  ];

  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [{ columnField: 'title', value: null, operatorValue: 'contains' }],
  });

  const onSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilterValue = filterModel.items.map((item) => {
      return {
        ...item,
        value: e.target.value,
      };
    });

    setFilterModel({
      ...filterModel,
      items: newFilterValue,
    });
  };

  const onDeleteHandler = () => {
    deleteArticle({
      variables: {
        id: selectionArticleId[0],
      },
    }).then(() => {
      setArticles(articles.filter((article) => article.id !== selectionArticleId[0]));
    });
  };

  React.useEffect(() => {
    if (!loading) {
      if (data) {
        setArticles(data.getAllArticles);
      }
    }
  }, [data, loading]);

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
    <div style={{ height: 400, width: '100%', marginBottom: '120px' }}>
      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item xs={6}>
          <InputBase
            placeholder="Search article"
            className={classes.root}
            onChange={onSearchHandler}
          />
        </Grid>

        <Grid item xs={6} container direction="row" justifyContent="flex-end" alignItems="center">
          <Grid style={{ margin: '10px' }}>
            <Button className={`${classes.article}__add-button`}>
              <Link href={'/admin/articles/new-article'} passHref>
                <MuiLink style={{ display: 'flex' }}>
                  <AddIcon />
                </MuiLink>
              </Link>
            </Button>
          </Grid>
          <Grid style={{ margin: '10px' }}>
            <Button className={`${classes.article}__remove-button`} onClick={onDeleteHandler}>
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <DataGrid
        rows={formatData(articles)}
        columns={columns}
        className={classes.root}
        filterModel={filterModel}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        selectionModel={selectionArticleId}
        hideFooterSelectedRowCount
        onSelectionModelChange={(selection) => {
          const newSelectionModel = selection;

          if (newSelectionModel) {
            const selectionSet = new Set(selectionArticleId);
            const result = newSelectionModel.filter((s) => !selectionSet.has(s));

            setSelectionArticleId(result);
          } else {
            setSelectionArticleId(newSelectionModel);
          }
        }}
      />
    </div>
  );
};

export default Articles;
