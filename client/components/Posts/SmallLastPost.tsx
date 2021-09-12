import React from 'react';
import Image from 'next/image';
import LatestImage from '../../public/images/latest-news.jpg';
import { Box, Grid, Container, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import Link from 'next/link';
import { Link as MuiLink } from '@material-ui/core';
import { useHomeStyles } from '../../MuiThemes/home';
import { formatDate } from '../../utils/formatDate';
import { IArticle } from '../../types/article';
import { SERVER_URL } from '../../pages/_app';

interface ISmallLastPost extends IArticle {
  postColor?: 'textPrimary';
}

export const SmallLastPost: React.FC<ISmallLastPost> = ({
  postColor,
  category,
  title,
  slug,
  image,
  createdDate,
}) => {
  const classes = useHomeStyles();
  return (
    <Link href={`/${category.slug}/${slug}`} passHref>
      <MuiLink className={`${classes.HomeLatestNewsSide}__list-item card-hover`}>
        <div className={`${classes.HomeLatestNewsSide}__list-item__img`}>
          <div className="image-container">
            <Image
              src={`${SERVER_URL}/${image}`}
              alt="Big Image Article"
              className={'image'}
              layout="fill"
              objectFit={'contain'}
            />
          </div>
        </div>

        <div className={`${classes.HomeLatestNewsSide}__list-item__info`}>
          <Typography
            component="span"
            color={postColor ? postColor : 'secondary'}
            gutterBottom
            className={`${classes.HomeLatestNewsSide}__list-item__category`}>
            {category.title}
          </Typography>
          <Typography
            className={`${classes.HomeLatestNewsSide}__list-item__title`}
            color={postColor ? postColor : 'primary'}
            component="h3"
            gutterBottom>
            {title}
          </Typography>
          <Typography
            className={`${classes.HomeLatestNewsSide}__list-item__date`}
            component="span"
            color={postColor ? postColor : 'secondary'}
            gutterBottom>
            {formatDate(new Date(createdDate))}
          </Typography>
        </div>
      </MuiLink>
    </Link>
  );
};
