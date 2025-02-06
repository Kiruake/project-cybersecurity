import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizzListView from '../views/Quizz/QuizzListView.vue'
import QuizzSingleView from '../views/Quizz/QuizzSingleView.vue'
import ChallengeView from '../views/Challenge/ChallengeView.vue'
import CSIView from '@/views/CSIView.vue'
import SingleCoursView from '../views/Cours/SingleCoursView.vue';
import EcolesView from '../views/Ecoles/EcolesView.vue';
import SingleEcoleView from '@/views/Ecoles/SingleEcoleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    {
      path: '/quizz', 
      name: 'quizz',
      component: QuizzListView
    },

    {
      path: '/quizz/:id', 
      name: 'quizz-single',
      component: QuizzSingleView,
      props: true 
    },
    
  
      { path: "/challenge", 
        name: "challenge", 
        component: ChallengeView 
      },

      { path: "/csi", 
        name: "csi", 
        component: CSIView 
      },

      {
        path: '/cours/:slug',
        name: 'course',
        component: SingleCoursView,
        props: true  
      },
      {
        path: '/ecoles/:diplomeId', 
        name: 'ecoles',
        component: EcolesView, 
        props: true 
      },
      {
        path: '/ecole/:ecoleId', 
        name: 'ecole',
        component: SingleEcoleView, 
        props: true 
      },


  ],
})

export default router
