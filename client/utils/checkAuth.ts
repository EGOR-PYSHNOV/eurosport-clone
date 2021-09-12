import { client } from '../pages/_app';
import Cookies from 'nookies';
import { ME } from '../graphql/queries/me';

export const checkAuth = async (ctx: any): Promise<any> => {
  try {
    const cookies = Cookies.get(ctx);
    const token = cookies?.token;

    if (!token) {
      return false;
    }

    const me = await client.query({
      query: ME,
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });

    if (me.data) {
      const userRole = me.data.me.role.title;

      return userRole;
    }
  } catch (error) {
    return false;
  }
};
