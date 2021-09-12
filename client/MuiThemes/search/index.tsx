import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useSearchStyles = makeStyles((theme: Theme) => ({
  search: {
    '&__input': {
      width: '100%',
      '& .MuiInputBase-root': {
        color: '#fff',
        '&:hover,': {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'rgb(102, 157, 255)',
          },
        },
      },
      '& .MuiOutlinedInput-notchedOutline': { borderColor: '#fff', borderRadius: 0 },
      '& .MuiInputBase-input': {
        '&:focus': {
          borderColor: 'rgb(102, 157, 255)',
          backgroundColor: '#000',
        },
        '&::placeholder': {
          color: '#fff',
        },
      },
    },
    '&__button': {
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)',

      '& svg': {
        color: '#fff',
        fontSize: '30px',
      },
    },

    '&__content': {
      '&-icon': {
        fontSize: '80px',
        color: '#fff',
      },
      '&-title': {
        fontSize: '40px',
      },
    },
  },
}));
