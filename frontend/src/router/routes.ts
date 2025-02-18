import { isAdmin, redirectIfAuthenticated } from 'src/middlewares/isAuthenticated'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  // Fazer login
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: redirectIfAuthenticated,
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },

  //Criar novo usuário
  {
    path: '/register',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: redirectIfAuthenticated,
    children: [{ path: '', component: () => import('pages/RegisterPage.vue') }],
  },

  // Buscar acessos de usuario
  {
    path: '/user/access',
    component: () => import('layouts/UserLayout.vue'),
    children: [{ path: '', component: () => import('pages/UserAccessPage.vue') }],
    meta: { requiresAuth: true },
  },

  // Buscar apenas acessos ativos
  {
    path: '/admin/active-access',
    component: () => import('layouts/AdminLayout.vue'),
    children: [{ path: '', component: () => import('pages/ActiveAccessPage.vue') }],
    beforeEnter: isAdmin,
    meta: { requiresAuth: true },
  },

  // Buscar todos os acessos (admin)
  {
    path: '/admin/access',
    component: () => import('layouts/AdminLayout.vue'),
    children: [{ path: '', component: () => import('pages/AdminAccessPage.vue') }],
    beforeEnter: isAdmin,
    meta: { requiresAuth: true },
  },

  // Criar um acesso
  {
    path: '/admin/create-access',
    component: () => import('layouts/AdminLayout.vue'),
    children: [{ path: '', component: () => import('pages/CreateAccessPage.vue') }],
    beforeEnter: isAdmin,
    meta: { requiresAuth: true },
  },

  // Buscar todos os usuários (admin)
  {
    path: '/admin/users',
    component: () => import('layouts/AdminLayout.vue'),
    children: [{ path: '', component: () => import('pages/ListUsersPage.vue') }],
    beforeEnter: isAdmin,
    meta: { requiresAuth: true },
  },

  //Recursos
  {
    path: '/admin/resources',
    component: () => import('layouts/AdminLayout.vue'),
    children: [{ path: '', component: () => import('pages/ResourcesPage.vue') }],
    beforeEnter: isAdmin,
    meta: { requiresAuth: true },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
