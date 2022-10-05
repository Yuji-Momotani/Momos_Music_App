import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Certification from '@/views/Certification.vue'
import Login from '@/views/Login.vue'
import MusicSearch from '@/views/search/MusicSearch.vue'
import SearchNowPlaying from '@/views/search/SearchNowPlaying.vue'
import SearchKeyword from '@/views/search/SearchKeyword.vue'
import SearchDJNextTune from '@/views/search/SearchDJNextTune.vue'
import Piano from '../views/piano/Piano.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/Certification',
    name: 'Certification',
    component: Certification,
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/MusicSearch',
    name: 'MusicSearch',
    component: MusicSearch,
    props: (route) => {
      return { routeParams: route.query }
    }
  },
  {
    path: '/MusicSearch/SearchNowPlaying',
    name: 'SearchNowPlaying',
    component: SearchNowPlaying,
    // props: (route) => {
    //   return { routeParams: route.query }
    // }
    props: true
  },
  {
    path: '/MusicSearch/SearchKeyword',
    name: 'SearchKeyword',
    component: SearchKeyword,
    props: true
  },
  {
    path: '/MusicSearch/SearchDJNextTune',
    name: 'SearchDJNextTune',
    component: SearchDJNextTune,
    props: true
  },
  {
    path: '/Piano',
    name: 'Piano',
    component: Piano
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
