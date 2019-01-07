<template>
  <div>
    <router-view></router-view>
    <ul v-if="children.length" class="child-list">
      <li v-for="(child, key) in children" :key="key">
        <router-link :to="{ name: child.path }">{{ child.path }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      children: []
    }
  },
  created () {
    this.updateRoutes()
  },
  methods: {
    updateRoutes () {
      this.$connecter.$emit('page', {
        title: {
          tag: '链接向导',
          description: '父级路由不提供访问哦!'
        }
      })
      this.children = []
      // 路由判断与获取子路由
      let $router = this.$router
      let _uid = $router.options.routes.length - 1
      let mainPath = $router.history.current.path
      while (_uid > 0 && $router.options.routes[_uid].path !== mainPath) {
        _uid--
      }
      let routes = $router.options.routes[_uid]
      if (routes) {
        let children = routes.children
        let router = $router.currentRoute.path.split('/')
        if (children) {
          for (let child of children) {
            // 目前在子路由内
            if (child.path === router[router.length - 1]) return
          }
          // 在父目录则输出子列表
          this.children = children
        }
      }
    }
  },
  beforeUpdate () {
    this.updateRoutes()
  }
}
</script>

<style lang="less">
.child-list {
  li {
    display: block;
    padding: 10px;
    border-radius: 5px;
    margin: 20px 10px;
    font-weight: bold;
    background-color: rgba(255, 255, 255, .5);
  }
}
</style>
