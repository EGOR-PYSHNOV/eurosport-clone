import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useBreadcrumbsStyles = makeStyles((theme: Theme) => ({
  breadcrumbs: {
    padding: '15px',
    borderBottom: '0.05px solid rgba(51,51,51,0.5)',

    '& .MuiBreadcrumbs-li': {
      '& .MuiLink-root,& .MuiTypography-root': {
        fontWeight: 600,
        fontSize: '14px',
        textTransform: 'uppercase',
      },
    },
  },
}));
