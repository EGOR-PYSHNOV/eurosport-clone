import React from 'react';

import { Link as MuiLink } from '@material-ui/core';
import Link from 'next/link';

import { useQuery } from '@apollo/client';
import { Box, CircularProgress, Container } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

import { DataGrid, GridColDef, GridRenderCellParams, GridRowId } from '@mui/x-data-grid';
import { useGridStyles } from '../../../MuiThemes/admin/grid';

import { formatData } from '../../../utils/formatData';

import { IUser } from '../../../types/user';
import { GET_ALL_USERS } from '../../../graphql/admin/queries/users';

const Users = () => {
  const classes = useGridStyles();

  const { data, loading } = useQuery(GET_ALL_USERS);

  const [users, setUsers] = React.useState<IUser[] | []>([]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'login',
      headerName: 'login',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'email',
      width: 200,
    },
    {
      field: 'role',
      headerName: 'role',
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
        <Link href={`/admin/users/${params.getValue(params.id, 'id')}`} passHref>
          <MuiLink>Open user</MuiLink>
        </Link>
      ),
    },
  ];

  React.useEffect(() => {
    if (!loading) {
      if (data) {
        setUsers(data.getAllUsers);
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
      <DataGrid
        rows={formatData(users)}
        columns={columns}
        className={classes.root}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        hideFooterSelectedRowCount
      />
    </div>
  );
};

export default Users;
