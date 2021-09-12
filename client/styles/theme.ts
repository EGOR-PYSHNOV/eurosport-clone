// styles/theme.ts

import { createTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    common: {
      black: '#19192B',
      white: '#ffffff',
    },
    primary: {
      light: '#B3E5FC',
      main: '#ffffff',
      dark: '#0288D1',
      contrastText: '#212121',
    },

    secondary: {
      main: 'rgba(179,179,179)', // omitting light and dark will calculate from main
      contrastText: '#757575',
    },
    grey: {
      '500': '#bcbcbc',
      '700': '#79797a',
    },
    info: {
      main: '#1bb2f1',
    },
    success: {
      main: '#00d589',
    },
    error: {
      main: '#832838',
    },
    background: {
      default: '#000',
    },
  },
  overrides: {
    MuiLink: {
      underlineHover: {
        '&:hover': {
          textDecoration: 'none',
        },
      },
    },
    MuiTypography: {
      h4: {
        fontWeight: 'bold',
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: 'none',
        borderRadius: '0',
        backgroundColor: '#1A1A1A',
      },
    },
    MuiCardContent: {
      root: {
        padding: 0,
        '&:last-child': {
          paddingBottom: '0px',
        },
      },
    },
    MuiListItem: {
      root: {
        color: '#fff',
      },
    },
  },

  typography: {
    fontFamily: 'Aeonik',
  },
});

export default theme;
