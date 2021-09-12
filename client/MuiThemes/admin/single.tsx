import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useSingle = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiOutlinedInput-input': {
      color: '#fff',
    },
    '& .MuiOutlinedInput-notchedOutline,&  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
      {
        borderColor: '#fff',
      },
    '& .MuiInputLabel-outlined': {
      color: '#fff',
    },
    '&': {
      margin: theme.spacing(1),
    },
    '&.MuiFormLabel-root': {
      color: '#fff',
    },
    '& .MuiTypography-body1': {
      color: '#fff',
    },
    '& .MuiRadio-root': {
      color: '#fff',
    },

    '& .MuiInputLabel-root': {
      color: '#fff',
      fontSize: '18px',
    },
    '& label + .MuiInput-formControl': {
      marginTop: '30px',
    },
    '& .MuiSelect-icon': {
      color: '#fff',
    },
    '& .MuiFormHelperText-root': {
      color: '#fff',
      fontSize: '15px',
    },
    '& .MuiInput-underline:before': {
      borderColor: '#fff',
    },
    '&.MuiListItem-root': {
      color: '#111',
    },
    '& .MuiSelect-selectMenu': {
      color: '#fff',
    },
  },
}));
