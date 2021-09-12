import React from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

export const AlertMessage = (props: AlertProps) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
