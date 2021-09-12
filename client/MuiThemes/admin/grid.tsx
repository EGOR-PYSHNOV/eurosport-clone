import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useGridStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiDataGrid-columnHeaderTitle': {
      color: '#fff',
    },
    '& .MuiIconButton-label': {
      color: '#fff',
    },
    '& .MuiIconButton-root': {
      color: '#fff',
    },

    '& .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted):hover .MuiDataGrid-sortIcon':
      {
        opacity: 1,
      },
    '& .MuiDataGrid-cell': {
      color: '#fff',
    },
    '& .MuiTablePagination-caption': {
      color: '#fff',
    },

    '& .MuiInputBase-input': {
      border: '1px solid #fff',
      margin: '10px',
      color: '#fff',
      padding: '10px',
    },
    '&.MuiListItem-root': {
      color: '#111',
    },
  },
  article: {
    '&__add-button': {
      background: 'gainsboro',
    },
    '&__remove-button': { background: 'tomato' },

    '&__add-button,&__remove-button': {
      maxWidth: '50px',
      height: '40px',
    },
    '&__add-button:hover,&__remove-button:hover': {
      backgroundColor: '#111',
      '& .MuiSvgIcon-root': {
        fill: '#fff',
      },
    },
  },
}));
