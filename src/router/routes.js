
const routes = [
  {
    path: '/',
    redirect: '/game',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/game', component: () => import('src/pages/Game.vue') },
      { path: '/stats', component: () => import('pages/Stats.vue') },
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
