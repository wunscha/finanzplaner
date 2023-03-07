
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'szenarien', component: () => import('pages/UebersichtSzenarien.vue') },
      { path: 'buchungsreihen', component: () => import('pages/UebersichtBuchungsreihen.vue') },
      { path: 'szenarienvergleich', component: () => import('src/pages/UebersichtSzenarienvergleich.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
