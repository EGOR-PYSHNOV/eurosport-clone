import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useFooterStyles = makeStyles((theme: Theme) => ({
  footer: {
    borderTop: '1px solid #fff',
    '&__text': {
      fontSize: '15px',
    },
  },
}));
