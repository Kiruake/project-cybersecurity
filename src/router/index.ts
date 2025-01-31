import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizzListView from '../views/QuizzListView.vue'
import QuizzSingleView from '../views/QuizzSingleView.vue'
import ChallengeView from '../views/ChallengeView.vue'
import TerminalView from '../views/TerminalView.vue'
import CSIView from '../views/CSIView.vue'
import SingleCoursView from '../views/SingleCoursView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },

    { path: "/quizz", 
      name: "quizz-list", 
      component: QuizzListView 
    },

    { path: "/quizz/:id",
       name: "quizz-single",
        component: QuizzSingleView, props: true 
      },

      { path: "/challenge", 
        name: "challenge", 
        component: ChallengeView 
      },

      { path: "/terminal", 
        name: "terminal", 
        component: TerminalView 
      },

      { path: "/csi", 
        name: "csi", 
        component: CSIView 
      },

      {
        path: '/cours/:slug',
        name: 'course',
        component: SingleCoursView,
        props: true  // Permet de passer les paramètres de route comme props dans le composant
      }


  ],
})

export default router
