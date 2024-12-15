import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutUsView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactUsView.vue'),
    },
    {
      path: '/vision',
      name: 'vision',
      component: () => import('../views/OurVisionView.vue'),
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('../views/OurTeamView.vue'),
    },
    {
      path: '/sponsor/:projectname/:projectid',
      component: () => import('../views/BecomeASponsorView.vue')
    },
    {
      path: '/member-registration-form',
      component: () => import('../views/BecomeAMemberView.vue')
    },
    {
      path: '/login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/survey',
      component: () => import('../views/PublicSurveyListView.vue'),
      children: [
        {
          path: '/:townname',
          component: () => import('../views/PublicSurveyView.vue')
        }
      ]
    },
    {
      path: '/projects',
      children: [
        {
          path: '/completed',
          component: () => import('../views/ProjectListView.vue'),
          children: [
            {
              path: '/:projectname/:projectid',
              component: () => import('../views/ProjectView.vue')
            }
          ]
        },
        {
          path: '/ongoing',
          component: () => import('../views/ProjectListView.vue'),
          children: [
            {
              path: '/:projectname/:projectid',
              component: () => import('../views/ProjectView.vue')
            }
          ]
        },
        {
          path: '/uncommenced',
          component: () => import('../views/ProjectListView.vue'),
          children: [
            {
              path: '/:projectname/:projectid',
              component: () => import('../views/ProjectView.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/publications',
      component: () => import('../views/PublicationListView.vue'),
      children: [
        {
          path: '/:publicationname/:publicationid',
          component: () => import('../views/PublicationView.vue')
        }
      ]
    },
    {
      path: '/events',
      children: [
        {
          path: '/past',
          component: () => import('../views/EventListView.vue'),
          children: [
            {
              path: '/:eventname/:eventid',
              component: () => import('../views/EventView.vue')
            }
          ]
        },
        {
          path: '/upcoming',
          component: () => import('../views/EventListView.vue'),
          children: [
            {
              path: '/:eventname/:eventid',
              component: () => import('../views/EventView.vue')
            }
          ]
        }
      ]
    }
  ],
})

export default router
