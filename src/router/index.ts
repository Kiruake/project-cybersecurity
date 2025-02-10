import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizzListView from '../views/Quizz/QuizzListView.vue'
import QuizzSingleView from '../views/Quizz/QuizzSingleView.vue'
import ChallengeView from '../views/Challenge/ChallengeView.vue'
import SingleCoursView from '../views/Cours/SingleCoursView.vue'
import EcolesView from '../views/Ecoles/EcolesView.vue'
import ListeEventsView from '@/views/Events/ListeEventsView.vue'
import ListeRessourcesView from '@/views/Ressources/ListeRessourcesView.vue'
import MetierDetails from '@/views/Metiers/MetierDetails.vue'
import MetiersView from '@/views/Metiers/MetiersView.vue'
import AboutView from '../views/About/AboutView.vue'
import MLView from '@/views/ML/MLView.vue'
import PLView from '@/views/PL/PLView.vue'

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
    {
      path: "/challenge", 
      name: "challenge", 
      component: ChallengeView 
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
      path: '/events',
      name: 'events',
      component: ListeEventsView,
    },
    {
      path: '/ressources',
      name: 'ressources',
      component: ListeRessourcesView,
    },
    {
      path: '/metiers',
      name: 'Metiers',
      component: MetiersView
  },
  {
      path: '/metiers/:id',
      name: 'MetierDetail',
      component: MetierDetails,
      props: true
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/ml',
    name: 'ml',
    component: MLView
  },
  {
    path: '/pl',
    name: 'pl',
    component: PLView
  },

  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ el: to.hash, behavior: 'smooth', top: 100 });
        }, 500); // Ajuste le délai si nécessaire
      });
    }
    return { top: 0 };
  },
  
});

export default router;
