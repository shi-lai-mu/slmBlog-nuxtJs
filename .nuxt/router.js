import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _c31c4c3e = () => interopDefault(import('../pages/article/index.vue' /* webpackChunkName: "pages/article/index" */))
const _0193065b = () => interopDefault(import('../pages/article/editArticle.vue' /* webpackChunkName: "pages/article/editArticle" */))
const _36460dfe = () => interopDefault(import('../pages/other/friendship.vue' /* webpackChunkName: "pages/other/friendship" */))
const _15a0de82 = () => interopDefault(import('../pages/other/me.vue' /* webpackChunkName: "pages/other/me" */))
const _d495f4a0 = () => interopDefault(import('../pages/other/terms.vue' /* webpackChunkName: "pages/other/terms" */))
const _66fc406c = () => interopDefault(import('../pages/other/thisSite.vue' /* webpackChunkName: "pages/other/thisSite" */))
const _52df052d = () => interopDefault(import('../pages/user/admin/login.vue' /* webpackChunkName: "pages/user/admin/login" */))
const _e5272ee2 = () => interopDefault(import('../pages/user/admin/register.vue' /* webpackChunkName: "pages/user/admin/register" */))
const _3f4e5470 = () => interopDefault(import('../pages/user/ment/hot.vue' /* webpackChunkName: "pages/user/ment/hot" */))
const _0cd8099b = () => interopDefault(import('../pages/user/ment/new.vue' /* webpackChunkName: "pages/user/ment/new" */))
const _22bee089 = () => interopDefault(import('../pages/article/_id.vue' /* webpackChunkName: "pages/article/_id" */))
const _25261c84 = () => interopDefault(import('../pages/user/_id.vue' /* webpackChunkName: "pages/user/_id" */))
const _0f46d3ba = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'hash',
  base: decodeURI('./'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/article",
    component: _c31c4c3e,
    name: "article"
  }, {
    path: "/article/editArticle",
    component: _0193065b,
    name: "article-editArticle"
  }, {
    path: "/other/friendship",
    component: _36460dfe,
    name: "other-friendship"
  }, {
    path: "/other/me",
    component: _15a0de82,
    name: "other-me"
  }, {
    path: "/other/terms",
    component: _d495f4a0,
    name: "other-terms"
  }, {
    path: "/other/thisSite",
    component: _66fc406c,
    name: "other-thisSite"
  }, {
    path: "/user/admin/login",
    component: _52df052d,
    name: "user-admin-login"
  }, {
    path: "/user/admin/register",
    component: _e5272ee2,
    name: "user-admin-register"
  }, {
    path: "/user/ment/hot",
    component: _3f4e5470,
    name: "user-ment-hot"
  }, {
    path: "/user/ment/new",
    component: _0cd8099b,
    name: "user-ment-new"
  }, {
    path: "/article/:id",
    component: _22bee089,
    name: "article-id"
  }, {
    path: "/user/:id?",
    component: _25261c84,
    name: "user-id"
  }, {
    path: "/",
    component: _0f46d3ba,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
