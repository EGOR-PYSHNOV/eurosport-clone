import { Box } from '@material-ui/core';
import React from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

interface ILayout {
  children: React.ReactNode;
}

export const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />

      <Box component="main" className="main" style={{ paddingTop: '85px' }}>
        {children}
      </Box>

      <Footer />
    </div>
  );
};
