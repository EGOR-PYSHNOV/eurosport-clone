import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Box, Card, CardContent, CardMedia, Link as MuiLink, Typography } from '@material-ui/core';
import { usePostStyles } from '../../MuiThemes/post';

import { formatDate } from '../../utils/formatDate';
import { IArticle } from '../../types/article';
import { SERVER_URL } from '../../pages/_app';

export const PreviewPost: React.FC<IArticle> = ({ title, createdDate, category, image, slug }) => {
  const classes = usePostStyles();

  return (
    <Link href={`/${category.slug}/${slug}`} passHref>
      <MuiLink className={`${classes.post} card-hover`}>
        <Card>
          <CardContent className={`${classes.post}__content`}>
            <Box style={{ overflow: 'hidden' }}>
              <div className="image-container">
                <Image
                  src={`${SERVER_URL}/${image}`}
                  alt="Big Image Article"
                  className={'image'}
                  layout="fill"
                  objectFit={'contain'}
                />
              </div>
            </Box>

            <Box className={`${classes.post}__info`}>
              <Typography
                gutterBottom
                component="span"
                className={`${classes.post}__info-category`}>
                {category && category.title}
              </Typography>
              <Typography gutterBottom component="h3" className={`${classes.post}__info-title`}>
                {title}
              </Typography>

              <Typography gutterBottom component="span" className={`${classes.post}__info-date`}>
                {formatDate(new Date(createdDate))}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </MuiLink>
    </Link>
  );
};
