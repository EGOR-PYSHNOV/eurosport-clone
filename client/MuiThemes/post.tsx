import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const usePostStyles = makeStyles((theme: Theme) => ({
  post: {
    '&__info': {
      padding: '12px',
      '&-category,&-date': {
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: 'rgba(179,179,179)',
      },
      '&-category': {
        fontSize: '13px',
      },
      '&-date': {
        display: 'block',
        fontSize: '15px',
        fontWeight: 400,
        marginTop: '20px',
      },

      '&-title': {
        color: '#ffffff',
      },
    },
    '&__video': {
      backgroundColor: '#fff',
      padding: '12px',
      position: 'relative',
      '&-icon': {
        color: '#fff',
        fontSize: '60px',
        position: 'absolute',
        bottom: '100%',
      },
      '&-category': {
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: 'rgb(111 105 105)',
      },
      '&-title': {
        color: '#111',
        fontWeight: 600,
      },
    },
  },
}));
