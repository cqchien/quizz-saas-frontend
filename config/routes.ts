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
    path: '/exams',
    name: 'exams',
    access: 'admin',
    icon: 'container',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/exams/list',
        name: 'exams-list',
        component: './admin/exams/exams-list',
      },
      {
        path: '/exams/create',
        name: 'exams-create',
        component: './admin/exams/exams-create',
      },
      {
        path: '/exams/:id/edit',
        name: 'exams-edit',
        component: './admin/exams/exams-edit',
      },
      {
        path: '/exams/:id/overview',
        name: 'exams-overview',
        component: './admin/exams/exams-overview',
      },
      {
        redirect: '/exams/list',
      },
    ],
  },
  {
    path: '/user-exams',
    access: 'admin',
    hideChildrenInMenu: true,
    routes: [
      {
        path: '/user-exams/:id/take-exam',
        name: 'exams-exam',
        component: './admin/exams/exams-exam',
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
