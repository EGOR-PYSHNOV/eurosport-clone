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
import Link from 'next/link';
import { Link as MuiLink } from '@material-ui/core';
import React from 'react';
import Cookies from 'js-cookie';
import { useAuthStyles } from '../MuiThemes/auth/auth';
import ArrowRightAltRoundedIcon from '@material-ui/icons/ArrowRightAltRounded';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/mutation/auth/login';
import { useRouter } from 'next/router';
import { AlertMessage } from '../ui/Alert';

type LoginType = {
  login: string;
  password: string;
  submitError: string;
};

const Auth = () => {
  const classes = useAuthStyles();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [login, { loading }] = useMutation(LOGIN, {
    onError: (err) => {
      setError('submitError', { message: err?.graphQLErrors[0].message });
      setOpen(true);
    },
    onCompleted: (data) => {
      const { token } = data.login;
      Cookies.set('token', token);
      setOpen(true);
      setTimeout(() => {
        router.push('/my-account');
      }, 1000);
    },
  });

  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const RegisterSchema = yup.object().shape({
    login: yup.string().required('email or login is a required field'),
    password: yup.string().required(),
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: yupResolver(RegisterSchema),
  });
  const onSubmit = (data: LoginType) => {
    login({
      variables: {
        login: data.login,
        password: data.password,
      },
    });
  };

  return (
    <>
      {open && (
        <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
          <AlertMessage
            onClose={() => setOpen(false)}
            severity={errors.submitError ? 'error' : 'success'}>
            {errors.submitError ? errors.submitError.message : 'Auth successfull'}
          </AlertMessage>
        </Snackbar>
      )}

      <Box component="section">
        <Container maxWidth="lg">
          <Box component="div" className={`${classes.Auth}__inner py`}>
            <Typography
              color="primary"
              gutterBottom
              component="h1"
              variant="h2"
              className={`${classes.Auth}__title`}>
              SIGN IN
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} className={`${classes.Auth}__form py`}>
              <FormControl variant="filled" className="mb-3">
                <InputLabel htmlFor="component-filled">Email address or login</InputLabel>

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
                  defaultValue={values.password}
                  render={({ field }) => (
                    <>
                      <FilledInput
                        id="filled-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        {...field}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          field.onChange(e);
                          handleChange('password');
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end">
                              {values.showPassword ? (
                                <Visibility color="primary" />
                              ) : (
                                <VisibilityOff color="primary" />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText error>{errors.password?.message}</FormHelperText>
                    </>
                  )}
                />
              </FormControl>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
                endIcon={<ArrowRightAltRoundedIcon>send</ArrowRightAltRoundedIcon>}>
                sign in
              </Button>
            </form>
            <Typography
              color="primary"
              gutterBottom
              component="h2"
              variant="subtitle1"
              className={`${classes.Auth}__subtitle`}>
              Have not used Eurosport before?&nbsp;
              <Link href="/register" passHref>
                <MuiLink underline="always" className={`${classes.Auth}__link`}>
                  Register Here
                </MuiLink>
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Auth;
