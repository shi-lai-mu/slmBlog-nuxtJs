<template>
  <div>
    <ul class="content-box notice">
      <li v-for="(item, index) in title.list" :key="index">{{ item.description }}</li>
    </ul>
    <button type="primary" @click="get">bate</button>
  </div>
</template>

<script>
export default {
  // props: ['title'],
  data () {
  	return {
      title: {}
    }
  },
  created () {
  },
  methods: {
    get () {
      
    }
  }
}
</script>
