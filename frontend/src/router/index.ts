import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../components/MainLayout.vue'
import HomeView from '@/views/HomeView.vue'
import StudentsListView from '@/views/students/StudentsListView.vue'
import StudentsDetailsView from '@/views/students/StudentsDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        }
      ]
    },
    {
      path: '/alunos',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'alunos',
          component: StudentsListView,
          meta: {
            title: 'Consulta de alunos'
          }
        },
        {
          path: ':id',
          name: 'detalhesAluno',
          component: StudentsDetailsView,
          meta: {
            title: 'Detalhes alunos'
          }
        }
      ]
    }
  ]
})

export default router
