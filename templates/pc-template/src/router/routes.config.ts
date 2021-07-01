import { lazy } from 'react';
import AuthLayout from '@/layout/AuthLayout';
import NoPower from '@/pages/Error/NoPower';
import Login from '@/pages/Login';

const RouteConfig = [
  {
    path: '/error/401',
    component: NoPower,
    exact: true,
    title: '401无权限',
  },
  {
    path: '/index',
    component: AuthLayout,
    children: [
      {
        path: '/index/home',
        component: lazy(() => import('@/pages/Home')),
        title: '首页',
      },
      { path: '/index', redirect: '/index/home' },
    ],
  },
  {
    path: '/',
    redirect: '/index',
  },
];

export default RouteConfig;
