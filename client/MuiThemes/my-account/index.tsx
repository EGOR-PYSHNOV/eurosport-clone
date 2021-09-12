import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useAccountStyles = makeStyles((theme: Theme) => ({
  Account: {
    '&__wrapper': {
      backgroundColor: '#fff',
    },
    '&__welcome': {
      fontWeight: 700,
      textTransform: 'uppercase',
      color: '#333',
    },
    '&__exit': {
      '& svg': {
        marginTop: '8px',
        fontSize: '30px',
      },
      '& span': {
        fontSize: '20px',
        cursor: 'pointer',
        color: '#669dff',
        borderBottom: '2px solid',
        borderColor: '#669dff',
      },
    },
    '&__data': {
      backgroundColor: '#f8f8f9',

      '&-paper': {
        padding: '14px 20px 18px',
        backgroundColor: '#e6e6e6',
        border: '1px solid #ccc',
      },
      '&-block': {
        borderBottom: '1px solid #ccc',
        paddingBottom: '20px',
        marginBottom: '40px',
      },
      '&-label': {
        color: '#666',
        fontSize: '20px',
        fontWeight: 600,
        textTransform: 'uppercase',
      },
      '&-info': { color: '#333', fontSize: '18px', fontWeight: 600 },
    },
  },
}));
