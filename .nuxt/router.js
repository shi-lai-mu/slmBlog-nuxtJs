import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'

const _2bbe5b79 = () => interopDefault(import('..\\pages\\article\\index.vue' /* webpackChunkName: "pages_article_index" */))
const _5b24141a = () => interopDefault(import('..\\pages\\article\\editArticle.vue' /* webpackChunkName: "pages_article_editArticle" */))
const _ad73a6c6 = () => interopDefault(import('..\\pages\\other\\friendship.vue' /* webpackChunkName: "pages_other_friendship" */))
const _19e4205b = () => interopDefault(import('..\\pages\\other\\me.vue' /* webpackChunkName: "pages_other_me" */))
const _05c90094 = () => interopDefault(import('..\\pages\\other\\terms.vue' /* webpackChunkName: "pages_other_terms" */))
const _0c15ab08 = () => interopDefault(import('..\\pages\\other\\thisSite.vue' /* webpackChunkName: "pages_other_thisSite" */))
const _3cdd16a2 = () => interopDefault(import('..\\pages\\user\\admin\\login.vue' /* webpackChunkName: "pages_user_admin_login" */))
const _fac4320c = () => interopDefault(import('..\\pages\\user\\admin\\register.vue' /* webpackChunkName: "pages_user_admin_register" */))
const _5b09ebf7 = () => interopDefault(import('..\\pages\\user\\ment\\hot.vue' /* webpackChunkName: "pages_user_ment_hot" */))
const _f0edc06c = () => interopDefault(import('..\\pages\\user\\ment\\new.vue' /* webpackChunkName: "pages_user_ment_new" */))
const _3beee821 = () => interopDefault(import('..\\pages\\article\\_id.vue' /* webpackChunkName: "pages_article__id" */))
const _2c40f602 = () => interopDefault(import('..\\pages\\user\\_id.vue' /* webpackChunkName: "pages_user__id" */))
const _119e3985 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */))

Vue.use(Router)

if (process.client) {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'

    // reset scrollRestoration to auto when leaving page, allowing page reload
    // and back-navigation from other pages to use the browser to restore the
    // scrolling position.
    window.addEventListener('beforeunload', () => {
      window.history.scrollRestoration = 'auto'
    })

    // Setting scrollRestoration to manual again when returning to this page.
    window.addEventListener('load', () => {
      window.history.scrollRestoration = 'manual'
    })
  }
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected and scrollToTop is not explicitly disabled
  if (
    to.matched.length < 2 &&
    to.matched.every(r => r.components.default.options.scrollToTop !== false)
  ) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise((resolve) => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    base: decodeURI('/'),
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,

    routes: [{
      path: "/article",
      component: _2bbe5b79,
      name: "article"
    }, {
      path: "/article/editArticle",
      component: _5b24141a,
      name: "article-editArticle"
    }, {
      path: "/other/friendship",
      component: _ad73a6c6,
      name: "other-friendship"
    }, {
      path: "/other/me",
      component: _19e4205b,
      name: "other-me"
    }, {
      path: "/other/terms",
      component: _05c90094,
      name: "other-terms"
    }, {
      path: "/other/thisSite",
      component: _0c15ab08,
      name: "other-thisSite"
    }, {
      path: "/user/admin/login",
      component: _3cdd16a2,
      name: "user-admin-login"
    }, {
      path: "/user/admin/register",
      component: _fac4320c,
      name: "user-admin-register"
    }, {
      path: "/user/ment/hot",
      component: _5b09ebf7,
      name: "user-ment-hot"
    }, {
      path: "/user/ment/new",
      component: _f0edc06c,
      name: "user-ment-new"
    }, {
      path: "/article/:id",
      component: _3beee821,
      name: "article-id"
    }, {
      path: "/user/:id?",
      component: _2c40f602,
      name: "user-id"
    }, {
      path: "/",
      component: _119e3985,
      name: "index"
    }],

    fallback: false
  })
}
