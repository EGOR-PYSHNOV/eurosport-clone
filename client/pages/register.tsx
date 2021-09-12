import React from 'react';
import {
  Box,
  Button,
  Container,
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import { useAuthStyles } from '../MuiThemes/auth/auth';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { REGISTER } from '../graphql/mutation/auth/register';
import { useMutation } from '@apollo/client';

import { useRouter } from 'next/router';
import { AlertMessage } from '../ui/Alert';

type RegisterType = {
  login: string;
  password: string;
  password2: string;
  email: string;
  submitError: string;
};

const Register = () => {
  const classes = useAuthStyles();
  const router = useRouter();
  const [regsiter, { data, loading }] = useMutation(REGISTER, {
    onError: (err) => {
      setError('submitError', { message: err?.graphQLErrors[0].message });
      setOpen(true);
    },
    onCompleted: () => {
      setOpen(true);
      setTimeout(() => {
        router.push('/auth');
      }, 5000);
    },
  });

  const [open, setOpen] = React.useState(false);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const RegisterSchema = yup.object().shape({
    login: yup.string().min(5).required(),
    password: yup.string().required(),
    password2: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
    email: yup.string().email().required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterType>({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterType) => {
    regsiter({
      variables: {
        login: data.login,
        password: data.password,
        email: data.email,
      },
    });
  };

  return (
    <>
      <Box component="section">
        <Container maxWidth="lg">
          <Box component="div" className={`${classes.Auth}__inner py`}>
            {open && (
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <AlertMessage
                  onClose={handleClose}
                  severity={errors.submitError ? 'error' : 'success'}>
                  {errors.submitError ? errors.submitError.message : 'Registration successfull'}
                </AlertMessage>
              </Snackbar>
            )}

            <Typography
              color="primary"
              gutterBottom
              component="h1"
              variant="h2"
              className={`${classes.Auth}__title`}>
              Sign up
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} className={`${classes.Auth}__form py`}>
              <FormControl variant="filled" className="mb-3">
                <InputLabel htmlFor="component-filled">Login</InputLabel>

                <Controller
                  name="login"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <FilledInput type="text" id="filled-adornment-password" {...field} />

                      <FormHelperText error>{errors.login?.message}</FormHelperText>
                    </>
                  )}
                />
              </FormControl>

              <FormControl variant="filled" className="mb-3">
                <InputLabel htmlFor="component-filled">Password</InputLabel>

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <>
                      <FilledInput
                        id="filled-adornment-password"
                        type="password"
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              edge="end"></IconButton>
                          </InputAdornment>
                        }
                        {...field}
                      />
                      <FormHelperText error>{errors.password?.message}</FormHelperText>
                    </>
                  )}
                />
              </FormControl>

              <FormControl variant="filled" className="mb-3">
                <InputLabel htmlFor="component-filled">Repeat Password</InputLabel>

                <Controller
                  name="password2"
                  control={control}
                  render={({ field }) => (
                    <>
                      <FilledInput id="filled-adornment-password" type="password" {...field} />
                      <FormHelperText error>{errors.password2?.message}</FormHelperText>
                    </>
                  )}
                />
              </FormControl>

              <FormControl variant="filled" className="mb-3">
                <InputLabel htmlFor="component-filled">Email</InputLabel>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <>
                      <FilledInput type="email" id="filled-adornment-password" {...field} />
                      <FormHelperText error>{errors.email?.message}</FormHelperText>
                    </>
                  )}
                />
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading ? true : false}
                endIcon={<ArrowRightAltRoundedIcon>send</ArrowRightAltRoundedIcon>}>
                Sign up
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Register;
