import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Skills from "../views/Skills.vue";
import Fun from "../views/Fun.vue";
import Resume from "../views/Resume.vue";
import PageNotFound from '@/views/PageNotFound.vue'

import FormSuccess from '../components/FormSuccess'
import FormFail from '../components/FormFail'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/skills",
    name: "Skills",
    component: Skills,
  },
  {
    path: "/fun",
    name: "Fun",
    component: Fun,
  },
  {
    path: "/resume",
    name: "Resume",
    component: Resume,
  },
  {
    path: '/:catchAll(.*)*',
    name: "PageNotFound",
    component: PageNotFound,
  },
  {
    path: '/thanks',
    name: 'success',
    component: FormSuccess
  },
  {
    path: '/404',
    name: 'fail',
    component: FormFail
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
