import { Box, Container, Typography } from '@material-ui/core';
import React from 'react';

const Dashboard = () => {
  return (
    <Box component="section" className={`black-bg`}>
      <Container maxWidth="lg" className={'py'}>
        <Typography component="h1" variant="h1" color="primary">
          There is nothing here yet
        </Typography>
      </Container>
    </Box>
  );
};

export default Dashboard;
