import React from 'react';
import { useRouter } from 'next/router';

import { useHeaderStyles } from '../MuiThemes/header';
import { Navbar } from './Navbar';
import logo from '../public/images/logo.svg';
import { AppBar, Box, Container, Slide, useScrollTrigger } from '@material-ui/core';
import { Link as MuiLink } from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import Image from 'next/image';
import Link from 'next/link';
import { BreadcrumbsNav } from './Breadcrumbs';
import { ME } from '../graphql/queries/me';
import { useQuery } from '@apollo/client';

export const Header = (props: any) => {
  const { pathname, asPath } = useRouter();

  const [user, setUser] = React.useState<string | null>(null);

  const classes = useHeaderStyles();
  const trigger = useScrollTrigger();

  const { loading, error, data } = useQuery(ME);

  React.useEffect(() => {
    if (!loading && data) {
      setUser(data.me.login);
    }
  }, [data, loading]);

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      <AppBar>
        <Box className={classes.header} component="header">
          <Container maxWidth="lg" className={`${classes.header}__inner`}>
            <Link href="/" passHref>
              <MuiLink className={`${classes.header}__logo`}>
                <Image src={logo} alt="logo" width={150} height={30} />
              </MuiLink>
            </Link>

            <Navbar />
            <Box className={`${classes.header}__right`}>
              <Link href="/search" passHref>
                <MuiLink className={`${classes.header}__icon ${classes.header}__hover`}>
                  <SearchOutlinedIcon />
                </MuiLink>
              </Link>

              {user ? (
                <Link href="/my-account" passHref>
                  <MuiLink
                    className={`${classes.header}__icon ${classes.header}__auth ${classes.header}__hover`}>
                    <PersonOutlineOutlinedIcon />

                    <Box component="span">{user}</Box>
                  </MuiLink>
                </Link>
              ) : (
                <Link href="/auth" passHref>
                  <MuiLink
                    className={`${classes.header}__icon ${classes.header}__auth ${classes.header}__hover`}>
                    <PersonOutlineOutlinedIcon />

                    <Box component="span">Sign in</Box>
                  </MuiLink>
                </Link>
              )}
            </Box>
          </Container>
        </Box>
        {pathname.includes('articleId') && <BreadcrumbsNav breadcrumbs={asPath} />}
      </AppBar>
    </Slide>
  );
};
