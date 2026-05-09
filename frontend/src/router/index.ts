import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/president/:id',
      name: 'president-detail',
      component: () => import('../views/DetailView.vue')
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: () => import('../views/TimelineView.vue')
    },
    {
      path: '/mindmap',
      name: 'mindmap',
      component: () => import('../views/MindMapView.vue')
    }
  ]
});

export default router;