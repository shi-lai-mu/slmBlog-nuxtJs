import Vue from 'vue'
import xss from 'xss'
import SkeletonCards from 'vue-ultimate-skeleton-cards'

Vue.use(SkeletonCards)
Vue.prototype.xss = xss
