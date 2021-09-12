import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useHeaderStyles = makeStyles((theme: Theme) => ({
  header: {
    backgroundColor: '#000',
    borderBottom: '1px solid rgb(0,92,255)',
    '&__inner': {
      display: 'flex',
      alignItems: 'center',
    },
    '&__right': {
      display: 'flex',
    },
    '&__logo': {
      display: 'flex',
      paddingRight: '16px',
    },
    '&__icon': {
      display: 'flex',
      padding: '20px',

      '& svg': {
        fontSize: '30px',
      },
    },
    '&__hover': {
      '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
    },
    '&__auth': {
      alignItems: 'center',

      '& span': {
        paddingLeft: '10px',
        fontSize: '15px',
        textTransform: 'uppercase',
      },
    },
  },
  nav: {
    flexGrow: 1,
    '&__menu': {
      display: 'flex',
      alignItems: 'center',
    },

    '&__link': {
      display: 'block',
      fontSize: '15px',
      fontWeight: '300',
      textTransform: 'uppercase',
      padding: '20px',
    },
  },
}));
