<template>
  <div class="shuffling">
      <div class="shuffling-flex">
          <span class="shuffling-left" @click="up"></span>
          <ul class="shuffling-ling">
            <li v-for="(item, key) in list" :key="key" :class="item.css">
              <img v-lazy="item.url" alt="NAV-0">
            </li>
          </ul>
          <span class="shuffling-right" @click="down"></span>
      </div>
      <ul class="shuffling-select" @click="select">
          <li v-for="(item, key) in list" :key="key" :class="{ on: key == no }" :data-i="key"></li>
      </ul>
  </div>
</template>
<script>
let upInterval = 0
export default {
  data () {
    let url = 'http://120.78.221.235/img/shuffling/'
    return {
      no: 1,
      list: [
        {
          url: url + '0.png',
          page: false,
          css: {}
        },
        {
          url: url + '1.jpg',
          page: false,
          css: {}
        }
      ]
    }
  },
  watch: {
    no (nw, ol) {
      let len = this.list.length - 1
      if (nw < 0) {
        this.no = len
        return
      }
      if (nw > len) {
        this.no = 0
        return
      }
      ol = Math.max(ol, 0)
      ol = Math.min(ol, len)
      let CssOn = 'transformLeft'
      let olCssOff = 'transformRight'
      if (nw < ol) {
        CssOn += '-x'
        olCssOff += '-x'
      }
      this.list[ol].css = {
        [CssOn]: true
      }
      this.list[nw].css = {
        [olCssOff]: true,
        look: true
      }
      setTimeout(() => {
        if (ol !== this.no) this.list[ol].css = {none: 1}
        if (this.list[nw + 1] && nw + 1 !== this.no) this.list[nw + 1].css = {none: 1}
      }, 400)
    }
  },
  created () {
    this.no = 0
    this.createNext()
  },
  methods: {
    select (e) {
      if (e.target.dataset.i) this.no = e.target.dataset.i
    },
    createNext () {
      upInterval && clearInterval(upInterval)
      upInterval = setInterval(() => {
        this.no ++
      }, 5000)
    },
    up () {
      this.no--
      this.createNext()
    },
    down () {
      this.no++
      this.createNext()
    }
  }
}
</script>
<style lang="less">
.shuffling ul.shuffling-ling li {
  position: absolute;
  opacity: 0;
  transition: .5s;
}

.shuffling ul.shuffling-ling .look {
  opacity: 1;
}
.shuffling ul.shuffling-ling .none {
  display: none;
}
.shuffling ul.shuffling-ling li.transformLeft {
  opacity: 1;
  transform: translateX(0);
  animation: left .5s .2s;
  animation-fill-mode: forwards;
}
@keyframes left {
  to {
    opacity: 0;
    transform: translateX(-100%);
  }
}
.transformRight {
  opacity: 1;
  transform: translateX(100%);
  animation: right .5s .2s;
  animation-fill-mode: forwards;
}
@keyframes right {
  to {
    transform: translateX(0);
  }
}

.transformRight-x {
  opacity: 0;
  transform: translateX(-100%);
  animation: left-x .5s .2s;
  animation-fill-mode: forwards;
}
@keyframes left-x {
  to {
    transform: translateX(0);
  }
}
.transformLeft-x {
  transform: translateX(0);
  opacity: 1;
  animation: right-x .5s .2s;
  animation-fill-mode: forwards;
}
@keyframes right-x {
  to {
    transform: translateX(100%);
  }
}
</style>
