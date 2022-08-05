export default [
  {
    name: 'login',
    path: '/login',
    layout: false,
    component: './Login',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    component: './404',
  },
];
