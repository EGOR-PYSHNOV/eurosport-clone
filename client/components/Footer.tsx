import { Container, Typography } from '@material-ui/core';
import React from 'react';
import { useFooterStyles } from '../MuiThemes/footer';

export const Footer = () => {
  const classes = useFooterStyles();
  return (
    <footer className={`${classes.footer} py`}>
      <Container maxWidth="lg">
        <Typography
          color="primary"
          gutterBottom
          component="div"
          className={`${classes.footer}__text`}
        >
          © Eurosport, Discovery Company 2021 - All Rights Reserved
        </Typography>
      </Container>
    </footer>
  );
};
