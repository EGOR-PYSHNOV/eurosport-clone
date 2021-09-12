import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { useAccountStyles } from '../MuiThemes/my-account';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { ME_PROFILE } from '../graphql/queries/me';
import { useApolloClient, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface IUserProfile {
  login: string;
  email: string;
}

const MyAccount = () => {
  const classes = useAccountStyles();
  const router = useRouter();
  const { loading, data } = useQuery(ME_PROFILE);
  const [userProfile, setUserProfile] = React.useState<IUserProfile | null>(null);
  const client = useApolloClient();
  React.useEffect(() => {
    if (!loading) {
      if (data) {
        setUserProfile({
          login: data.me.login,
          email: data.me.email,
        });
      }
    }
  }, [data, loading]);

  const onLogoutHandler = () => {
    Cookies.remove('token');
    client.cache.reset().then(() => {
      router.reload();
    });
  };

  return (
    <>
      <Box component="section" className={`${classes.Account}__wrapper`}>
        <Container maxWidth="md">
          <Box component="div">
            <Grid container spacing={3} className="py" alignItems="center">
              <Grid item xs={6}>
                <Typography component="div" variant="h5" className={`${classes.Account}__welcome`}>
                  Hello, {userProfile?.login}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Box
                  component="div"
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  className={`${classes.Account}__exit`}
                  onClick={onLogoutHandler}>
                  <ExitToAppOutlinedIcon /> &nbsp; <span>Exit</span>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box component="section" className={`${classes.Account}__data`}>
        <Container maxWidth="md" className="py">
          <Typography component="div" className={`${classes.Account}__data-label mb-3`}>
            Account data
          </Typography>

          <Paper elevation={0} className={`${classes.Account}__data-paper`}>
            <Box component="div" className={`${classes.Account}__data-block`}>
              <Typography component="div" className={`${classes.Account}__data-label`} gutterBottom>
                Login
              </Typography>
              <Typography component="div" className={`${classes.Account}__data-info`}>
                {userProfile?.login}
              </Typography>
            </Box>
            <Box component="div" className={`${classes.Account}__data-block`}>
              <Typography component="div" className={`${classes.Account}__data-label`} gutterBottom>
                Email
              </Typography>
              <Typography component="div" className={`${classes.Account}__data-info`}>
                {userProfile?.email}
              </Typography>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default MyAccount;
