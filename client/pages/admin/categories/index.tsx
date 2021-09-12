import React from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { Box, Button, CircularProgress, Container, Grid, InputBase } from '@material-ui/core';

import { Link as MuiLink } from '@material-ui/core';
import Link from 'next/link';

import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { DataGrid, GridColDef, GridRenderCellParams, GridRowId } from '@mui/x-data-grid';
import { useGridStyles } from '../../../MuiThemes/admin/grid';
import { GET_CATEGORIES_GRID } from '../../../graphql/admin/queries/categories';
import { ICategory } from '../../../types/category';
import { formatData } from '../../../utils/formatData';
import { DELETE_CATEGORY } from '../../../graphql/admin/mutation/categories';

const Categories = () => {
  const classes = useGridStyles();

  const { data, loading } = useQuery(GET_CATEGORIES_GRID);
  const [categories, setCategories] = React.useState<ICategory[] | []>([]);
  const [deleteCategory] = useMutation(DELETE_CATEGORY);
  const [selectionCategoryId, setSelectionCategoryId] = React.useState<GridRowId[]>([]);
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'title',
      width: 200,
    },
    {
      field: 'description',
      headerName: 'description',
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
        <Link href={`/admin/categories/${params.getValue(params.id, 'slug')}`} passHref>
          <MuiLink>Open category</MuiLink>
        </Link>
      ),
    },
  ];

  const onDeleteHandler = () => {
    deleteCategory({
      variables: {
        id: selectionCategoryId[0],
      },
    }).then(() => {
      setCategories(categories.filter((category) => category.id !== selectionCategoryId[0]));
    });
  };

  React.useEffect(() => {
    if (!loading) {
      if (data) {
        setCategories(data.getAllCategories);
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
        <Grid item xs={6} container direction="row" justifyContent="flex-end" alignItems="center">
          <Grid style={{ margin: '10px' }}>
            <Button className={`${classes.article}__add-button`}>
              <Link href={'/admin/categories/new-category'} passHref>
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
        rows={formatData(categories)}
        columns={columns}
        className={classes.root}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        selectionModel={selectionCategoryId}
        hideFooterSelectedRowCount
        onSelectionModelChange={(selection) => {
          const newSelectionModel = selection;

          if (newSelectionModel) {
            const selectionSet = new Set(selectionCategoryId);
            const result = newSelectionModel.filter((s) => !selectionSet.has(s));

            setSelectionCategoryId(result);
          } else {
            setSelectionCategoryId(newSelectionModel);
          }
        }}
      />
    </div>
  );
};

export default Categories;
