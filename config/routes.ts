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
        path: '/questions/:id/edit',
        name: 'questions-edit',
        component: './admin/questions/questions-edit',
      },
      {
        redirect: '/questions/list',
      },
    ],
  },
  {
    path: '/examinations',
    name: 'examinations',
    access: 'admin',
    icon: 'container',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/examinations/list',
        name: 'examinations-list',
        component: './admin/examinations/examinations-list',
      },
      {
        path: '/examinations/create',
        name: 'examinations-create',
        component: './admin/examinations/examinations-create',
      },
      {
        path: '/examinations/:id/edit',
        name: 'examinations-edit',
        component: './admin/examinations/examinations-edit',
      },
      {
        redirect: '/examinations/list',
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
