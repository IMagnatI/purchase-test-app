import { createRouter, createWebHistory } from 'vue-router'
import PurchaseView from '@/views/PurchaseView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'first-step',
      component: PurchaseView,
    },
  ],
})

export default router
