import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7663dc74 = () => interopDefault(import('../pages/article/index.vue' /* webpackChunkName: "pages/article/index" */))
const _6ea0e2a4 = () => interopDefault(import('../pages/article/editArticle.vue' /* webpackChunkName: "pages/article/editArticle" */))
const _9e52ece4 = () => interopDefault(import('../pages/other/friendship.vue' /* webpackChunkName: "pages/other/friendship" */))
const _6d960368 = () => interopDefault(import('../pages/other/me.vue' /* webpackChunkName: "pages/other/me" */))
const _8d46ddfa = () => interopDefault(import('../pages/other/terms.vue' /* webpackChunkName: "pages/other/terms" */))
const _e56adf8e = () => interopDefault(import('../pages/other/thisSite.vue' /* webpackChunkName: "pages/other/thisSite" */))
const _1ed895ba = () => interopDefault(import('../pages/user/admin/login.vue' /* webpackChunkName: "pages/user/admin/login" */))
const _5488f0e2 = () => interopDefault(import('../pages/user/admin/register.vue' /* webpackChunkName: "pages/user/admin/register" */))
const _8f6a4f4a = () => interopDefault(import('../pages/user/ment/hot.vue' /* webpackChunkName: "pages/user/ment/hot" */))
const _366be7a4 = () => interopDefault(import('../pages/user/ment/new.vue' /* webpackChunkName: "pages/user/ment/new" */))
const _46666bdc = () => interopDefault(import('../pages/article/_id.vue' /* webpackChunkName: "pages/article/_id" */))
const _7d1b416a = () => interopDefault(import('../pages/user/_id.vue' /* webpackChunkName: "pages/user/_id" */))
const _3d02194d = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/article",
    component: _7663dc74,
    name: "article"
  }, {
    path: "/article/editArticle",
    component: _6ea0e2a4,
    name: "article-editArticle"
  }, {
    path: "/other/friendship",
    component: _9e52ece4,
    name: "other-friendship"
  }, {
    path: "/other/me",
    component: _6d960368,
    name: "other-me"
  }, {
    path: "/other/terms",
    component: _8d46ddfa,
    name: "other-terms"
  }, {
    path: "/other/thisSite",
    component: _e56adf8e,
    name: "other-thisSite"
  }, {
    path: "/user/admin/login",
    component: _1ed895ba,
    name: "user-admin-login"
  }, {
    path: "/user/admin/register",
    component: _5488f0e2,
    name: "user-admin-register"
  }, {
    path: "/user/ment/hot",
    component: _8f6a4f4a,
    name: "user-ment-hot"
  }, {
    path: "/user/ment/new",
    component: _366be7a4,
    name: "user-ment-new"
  }, {
    path: "/article/:id",
    component: _46666bdc,
    name: "article-id"
  }, {
    path: "/user/:id?",
    component: _7d1b416a,
    name: "user-id"
  }, {
    path: "/",
    component: _3d02194d,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
