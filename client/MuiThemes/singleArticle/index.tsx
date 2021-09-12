import { Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

export const useSingleArticleStyles = makeStyles((theme: Theme) => ({
  singleArticle: {
    paddingTop: '70px',
    '&__inner': {
      padding: '15px',
    },
    '&__title': {
      fontWeight: 600,
      fontSize: '48px',
      width: '75%',
      textTransform: 'uppercase',
      letterSpacing: '1px',
    },
    '&__teaser': {
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: '22px',
      width: '75%',
      letterSpacing: '1px',
    },

    '&__content': {
      backgroundColor: '#fff',
      marginTop: '10px',
      paddingTop: '50px',
      paddingBottom: '50px',
    },
    '&__author-block': {
      marginLeft: '-50px',
      paddingBottom: '50px',
      '&-img': { borderRadius: '50%' },
      '&-info': {
        marginLeft: '15px',

        '& .MuiTypography-root': {
          fontSize: '14px',
          textTransform: 'uppercase',
          fontWeight: 300,
        },
      },
    },
    '&__body': {
      width: '90%',
      '&-text': {
        marginBottom: '12px',
        fontSize: '18px',
        lineHeight: '27px',
      },
    },
    '&__last-news': {
      '&-title': { fontSize: '26px', fontWeight: 700 },
    },
    '&__comments': {
      backgroundColor: '#fff',
      marginTop: '10px',
      padding: '20px',

      '&-input': {
        padding: '12px 11px 11px',
        backgroundColor: '#f7f7f7',
        border: '1px solid rgba(0,0,0,.03)',
        borderRadius: '10px',
        resize: 'none',
        width: '100%',
        transition: '0.2s all',
        '&:hover,&:focus': {
          backgroundColor: '#fff',
          borderColor: '#bdd6fa',
          boxShadow: '0 0 0 3px rgba(70,131,217,0.12%)',
        },
        '&:focus': {
          borderColor: '#4683d9',
          outline: 'none',
        },
      },
    },
    '&__comment': {
      margin: '20px 0',
      padding: 0,
    },
  },
}));
