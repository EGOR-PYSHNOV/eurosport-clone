import React from 'react';

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
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GET_ALL_ROLES } from '../../../graphql/admin/queries/roles';
import { IRole } from '../../../types/roles';
import { useRouter } from 'next/router';
import { GET_USER } from '../../../graphql/admin/queries/users';
import { UPDATE_USER_ROLE } from '../../../graphql/admin/mutation/users';

const User = () => {
  const classes = useSingle();

  const {
    query: { id },
  } = useRouter();

  const [user, { loading, data, called }] = useLazyQuery(GET_USER);
  const roles = useQuery(GET_ALL_ROLES);
  const [updateRoleUser] = useMutation(UPDATE_USER_ROLE);

  const UserSchema = yup.object().shape({
    role: yup.string().required(),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSchema),
  });

  const onSubmit = (data: { role: string }) => {
    const roleId = roles.data.getAllRoles.filter(
      (role: IRole) => role.title === data.role,
    )[0].id;

    updateRoleUser({
      variables: {
        id: Number(id),
        roleId: roleId,
      },
    });
  };

  React.useEffect(() => {
    user({ variables: { id: Number(id) } });
  }, [id, user]);

  if (called && loading) {
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
        <Typography color="primary" className={classes.root}>
          {data && data.getUser.login}
        </Typography>
        <Typography color="primary" className={classes.root}>
          {data && data.getUser.email}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="roleId"
            control={control}
            defaultValue={data && data.getUser.role.title}
            render={({ field }) => (
              <>
                <FormControl fullWidth>
                  <InputLabel className={classes.root}>Role</InputLabel>
                  <Select
                    renderValue={(value) => `${value}`}
                    {...field}
                    onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                      field.onChange(e);

                      setValue('role', e.target.value);
                    }}
                    className={classes.root}
                  >
                    {roles.data &&
                      roles.data.getAllRoles.map((role: IRole) => (
                        <MenuItem
                          key={role.id}
                          value={role.title}
                          className={classes.root}
                        >
                          {role.title}
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText error>
                    {errors.roleId?.message}
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
      </Container>
    </Box>
  );
};

export default User;
