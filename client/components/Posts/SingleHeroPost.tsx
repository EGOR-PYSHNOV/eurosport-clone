import React from 'react';
import Image from 'next/image';
import { Box, Card, CardContent, Typography } from '@material-ui/core';
import Link from 'next/link';
import { Link as MuiLink } from '@material-ui/core';
import { useHomeStyles } from '../../MuiThemes/home';
import { formatDate } from '../../utils/formatDate';
import { IArticle } from '../../types/article';
import { SERVER_URL } from '../../pages/_app';
export const SingleHeroPost: React.FC<IArticle> = ({
  title,
  category,
  image,
  createdDate,
  slug,
}) => {
  const classes = useHomeStyles();

  return (
    <Link href={`/${category.slug}/${slug}`} passHref>
      <MuiLink className={`${classes.SingleHeroCard} card-hover`}>
        <Card>
          <CardContent className={`${classes.SingleHeroCard}__content`}>
            <div className="image-container">
              <Image
                src={`${SERVER_URL}/${image}`}
                alt="Big Image Article"
                className={'image'}
                layout="fill"
                objectFit={'contain'}
              />
            </div>
            <Box className={`${classes.SingleHeroCard}__info`}>
              <Typography
                gutterBottom
                color="primary"
                component="span"
                className={`${classes.SingleHeroCard}__info-category`}>
                {category.title}
              </Typography>
              <Typography
                gutterBottom
                color="primary"
                component="h3"
                className={`${classes.SingleHeroCard}__info-title`}>
                {title}
              </Typography>
              <Typography
                gutterBottom
                color="primary"
                component="span"
                className={`${classes.SingleHeroCard}__info-date`}>
                {formatDate(new Date(createdDate))}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </MuiLink>
    </Link>
  );
};
