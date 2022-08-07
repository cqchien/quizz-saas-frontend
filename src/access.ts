import { ROLES } from './utils/constant';

export default function access(initialState: { currentUser?: API.User } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    admin: currentUser && currentUser.role === ROLES.ADMIN,
    user: currentUser && currentUser.role === ROLES.USER,
  };
}
