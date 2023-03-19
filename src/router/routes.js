
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'szenarien', component: () => import('src/pages/Szenarien.vue') },
      { path: 'konten', component: () => import('src/pages/Konten.vue') },
      { path: 'buchungsreihen', component: () => import('src/pages/Buchungsreihen.vue') },
      { path: 'analysen-zeitpunkt', component: () => import('src/pages/AnalysenZeitpunkt.vue') },
      { path: 'analysen-zeitreihe', component: () => import('src/pages/AnalysenZeitreihe.vue') },
      { path: 'jahresbericht-kontosalden', component: () => import('src/pages/JahresberichtKontosalden.vue') },
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
