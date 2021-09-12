import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useHomeStyles = makeStyles((theme: Theme) => ({
  HomeListBlack: {
    paddingBottom: '20px',
    marginBottom: '30px',
  },

  SingleHeroCard: {
    '& .MuiCard-root': {
      position: 'relative',
      '&::after': {
        content: '""',
        top: 'auto',
        bottom: '0',
        zIndex: 1,
        position: 'absolute',
        left: 0,
        right: 0,
        height: '70%',
        background: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7) 45.44%,#000)',
      },
    },

    '& .MuiPaper-root': {
      '&:last-child': {
        paddingBottom: '56.25%',
      },
    },

    '&__content': {
      padding: 0,

      '&:last-child': {
        paddingBottom: '56.25%',
        height: 0,
      },
    },
    '&__info': {
      padding: '20px',
      position: 'absolute',
      bottom: 0,
      zIndex: 2,

      '&-category': {
        textTransform: 'uppercase',
        fontSize: '12px',
      },
      '&-title': {
        textTransform: 'uppercase',
        fontSize: '24px',
        lineHeight: '29px',
        letterSpacing: '1px',
        fontWeight: 600,
      },
      '&-date': {
        fontWeight: 300,
      },
    },
  },
  HomeLatestNewsSide: {
    '&__title': {
      textTransform: 'uppercase',
      fontSize: '20px',
      letterSpacing: '1px',
      fontWeight: 600,
    },
    '&__list': {
      '&-item': {
        display: 'flex',
        alignItems: 'center',
        borderTop: '1px solid rgb(102,102,102)',
        padding: '5px 0',
        '&:last-child': {
          borderBottom: '1px solid rgb(102,102,102)',
        },

        '& img': {
          objectFit: 'cover',
        },
        '&__info': {
          paddingLeft: '20px',
          flex: '0 1 80%',
        },

        '&__img': {
          flex: '0 1 100px',
        },
        '&__category,&__date': {
          fontSize: '10px',
          textTransform: 'uppercase',
          lineHeight: '12px',
          letterSpacing: '1px',
        },
        '&__title': {
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontWeight: 600,
        },
      },
    },
    '&__link': {
      display: 'flex',
      alignItems: 'center',
      margin: '20px 0',
      '& span': {
        fontSize: '14px',
        textTransform: 'uppercase',
        lineHeight: '17px',
        letterSpacing: '.5px',
      },
      '& span,svg': {
        verticalAlign: 'top',
        color: 'rgb(102,157,255)',
      },
    },
  },
}));
