import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { Box, Container, Link as MuiLink } from '@material-ui/core';
import Link from 'next/link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useBreadcrumbsStyles } from '../MuiThemes/breadcrumbs';

interface IBreadCrumbs {
  breadcrumbs: string;
}

export const BreadcrumbsNav: React.FC<IBreadCrumbs> = ({ breadcrumbs }) => {
  const classes = useBreadcrumbsStyles();

  return (
    <Box component="div" className={`${classes.breadcrumbs} black-bg`}>
      <Container maxWidth="lg">
        <Breadcrumbs
          separator={<NavigateNextIcon color="primary" fontSize="small" />}
          aria-label="breadcrumb">
          {breadcrumbs
            .substring(1)
            .split('/')
            .map((breadCrumb, idx, currentArr) => {
              if (idx === currentArr.length - 1) {
                return (
                  <Typography key={idx} color="primary">
                    {breadCrumb}
                  </Typography>
                );
              }
              return (
                <Link key={idx} href={`/${breadCrumb}`} passHref>
                  <MuiLink color="primary">{breadCrumb}</MuiLink>
                </Link>
              );
            })}
        </Breadcrumbs>
      </Container>
    </Box>
  );
};
