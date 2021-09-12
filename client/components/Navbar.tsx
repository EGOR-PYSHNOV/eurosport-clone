import React from 'react';
import { Link as MuiLink } from '@material-ui/core';

import Link from 'next/link';
import { useHeaderStyles } from '../MuiThemes/header';
import { Context } from '../pages/_app';
import { ICategory } from '../types/category';
import { useRouter } from 'next/router';

export const Navbar = () => {
  const classes = useHeaderStyles();
  const categoriesLinks = React.useContext(Context);
  const { asPath } = useRouter();
  return (
    <nav className={classes.nav}>
      <ul className={`${classes.nav}__menu`}>
        {asPath.includes('admin') ? (
          <>
            <Link href="/admin/articles" passHref>
              <MuiLink className={`${classes.nav}__link ${classes.header}__hover`}>
                Articels
              </MuiLink>
            </Link>
            <Link href="/admin/categories" passHref>
              <MuiLink className={`${classes.nav}__link ${classes.header}__hover`}>
                Categories
              </MuiLink>
            </Link>
            <Link href="/admin/users" passHref>
              <MuiLink className={`${classes.nav}__link ${classes.header}__hover`}>Users</MuiLink>
            </Link>
          </>
        ) : (
          categoriesLinks.map((category: ICategory) => {
            return (
              <li key={category.id}>
                <Link href={`/${category.slug}`} passHref>
                  <MuiLink className={`${classes.nav}__link ${classes.header}__hover`}>
                    {category.title}
                  </MuiLink>
                </Link>
              </li>
            );
          })
        )}
      </ul>
    </nav>
  );
};
