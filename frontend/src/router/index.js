import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Landing from '../views/Landing.vue'
import Edit from '../views/Edit.vue'
import Result from '../views/Result.vue'
import SelectPalettes from '../views/SelectPalettes'
import Viewer from '../views/Viewer'

import EditKang from '../views/EditKang.vue'
// import Editing from '../components/edit/Editing'
// import Coloring from '../components/edit/Coloring'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit,
    // children: [
    //   {
    //     path: 'md',
    //     name: 'Editing',
    //     component: Editing
    //   },
    //   {
    //     path: 'color',
    //     name: 'Coloring',
    //     component: Coloring
    //   }
    // ]
  },
  {
    path: '/edit_kang',
    name: 'Edit_kang',
    component: EditKang
  },
  {
    path: '/select',
    name: 'Select',
    component: SelectPalettes
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
    path: '/themeTest',
    name: 'ThemeTest',
    component: () => import('../views/getThemeTest.vue')
  },
  {
    path: '/result',
    name: 'Result',
    component: Result
  },
  {
    path: '/viewer/:id',
    name: 'Viewer',
    component: Viewer,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
