export default [
  {
    name: 'login',
    path: '/login',
    layout: false,
    hideInMenu: true,
    component: './auth/login',
  },
  {
    path: '/admin',
    name: 'dashboard',
    access: 'admin',
    icon: 'dashboard',
    component: './admin/dashboard',
  },
  {
    path: '/questions',
    name: 'questions',
    access: 'admin',
    icon: 'container',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/questions/list',
        name: 'questions-list',
        component: './admin/questions/questions-list',
      },
      {
        path: '/questions/create',
        name: 'questions-create',
        component: './admin/questions/questions-create',
      },
      {
        redirect: '/questions/list',
      },
    ],
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    component: './404',
  },
];
