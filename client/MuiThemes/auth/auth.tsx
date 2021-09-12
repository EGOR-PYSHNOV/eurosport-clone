import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useAuthStyles = makeStyles((theme: Theme) => ({
  Auth: {
    '&__inner': {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
    },

    '&__form': {
      maxWidth: '560px',
      width: '560px',

      '& .MuiFilledInput-input': {
        borderColor: '#fff',
        border: '1px solid #b3b3b3',
        backgroundColor: '#1a1a1a',
        borderRadius: '4px',
        height: '25px',
        padding: '32px 58px 14px 26px;',
        color: '#e6e6e6',
      },
      '& .MuiInputLabel-root': {
        fontSize: '20px',
        fontWeight: 200,
        transform: 'translate(12px, 28px) scale(1)',
        left: '14px',
      },
      '& .MuiInputLabel-filled.MuiInputLabel-shrink': {
        transform: 'translate(12px, 10px) scale(0.75)',
      },
      '& .MuiFilledInput-underline': {
        '&::before,&::after': {
          content: 'none',
        },
      },
      '& .MuiInputLabel-filled': {
        color: '#fff',
      },

      '& .MuiFormControl-root': {
        width: '100%',
      },

      '& .MuiInputAdornment-positionEnd': {
        marginLeft: '8px',
        position: 'absolute',
        right: '40px',
      },
      '& .MuiFilledInput-adornedEnd': {
        paddingRight: '0',
      },

      '& .MuiButton-root': {
        backgroundColor: '#005cff',
        color: '#fff',
        fontSize: '17px',
        width: '100%',
        padding: '12px 0',
        '&:hover': {
          backgroundColor: '#1322ff',
        },
      },
      '& .MuiFormHelperText-root': {
        fontSize: '18px',
      },
    },
    '&__title': {
      fontSize: '36px',
      fontWeight: 500,
    },
    '&__link': {
      color: '#669dff',
      transition: '0.15s ease',
    },
  },
}));
