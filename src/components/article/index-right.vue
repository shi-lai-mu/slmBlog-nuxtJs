<template>
  <aside class="content-box article-right">
    <div class="article-right-fixed">
      <!-- 快捷工具 -->
      <div class="article-right-box clearfix">
        <div class="binary">
          <i class="iconfont icon-shoucang-k"></i>收藏本文
        </div>
        <div class="binary">
          <i class="iconfont icon-fenxiang"></i>分享本文
        </div>
      </div>
      <!-- 标签类 -->
      <div class="article-right-box clearfix">
        <label class="article-right-title">标签</label>
        <ul class="article-right-tag">
          <li v-for="(item, index) in article.type" :key="index" v-text="item" @click="searchKeyWord(item)"></li>
        </ul>
      </div>
      <!-- 导航树 -->
      <div class="article-right-box clearfix">
        <label class="article-right-title">导航</label>
        <ul class="article-right-tree" v-if="article.tree" @click="treeMove">

          <li
            v-for="(item, index) in article.tree"
            :key="index"
            :class="[{ focus: lookParent == index }]"
            :data-move="index"
          >
            {{ item.tag }}
            <!-- 叶节点 -->
            <ul class="article-right-tree-sub" v-if="item.sub">
              <li
                v-for="(sub, key) in item.sub"
                :key="key"
                :class="['ellipsis', { focus: lookTree == `${index}-${key + 1}` }]"
                :title="sub"
                :data-move="`${index}-${key + 1}`"
                v-html="sub"
              ></li>
            </ul>
          </li>

        </ul>
        <div class="tree-not" v-else>抱歉,本文未找到导航!</div>
      </div>
    </div>
  </aside>
</template>

<script>
import animation from '@pub/js/animation'
export default {
  props: ['article'],
  data () {
    return {
      lookParent: '0',
      lookTree: '0',
      treeList: []
    }
  },
  watch: {
    'article' () {
      let data = this.article
      // 导航树
      if (!data.tree) {
        let h2 = data.content.match(/<(h2|blockquote)[^>]*>.*?<\/(h2|blockquote)>/ig)
        if (h2) {
          let tree = []
          // 建立树 添加导航点
          let html = data.content
          for (let i = 0, len = h2.length; i < len; i++) {
            const content = h2[i].replace(/(<(\/)?\w+[^>]*>|:|：)/g, '')
            // 添加根
            let className = 'move-'
            if (h2[i].search('h2') > -1) {
              className += tree.push({ tag: content }) - 1
            } else {
              let parent = i - 1
              // 找到父节点
              while (!tree[parent] && parent > 0) {
                parent--
              }
              if (!tree[parent] && parent === -1) {
                tree[0] = {
                  tag: data.title
                }
                parent = 0
              }
              // 添加叶节点
              if (!tree[parent].sub) {
                tree[parent].sub = []
              }
              className += parent + '-' + tree[parent].sub.push(content)
            }
            html = html.replace(h2[i], `<div class="${className}">${h2[i]}</div>`)
          }
          data.tree = tree
          data.content = html
        }
      }
      // 滚动监听
      data.tree && window.addEventListener('scroll', this.scroll)
      this.article = data
    }
  },
  methods: {
    /* 搜索关键词 */
    searchKeyWord (keyword) {
      this.$router.push({
        name: 'home'
      })
      this.$connecter.$emit('searchKeyWord', keyword)
    },

    /* 滚动监测 */
    scroll () {
      const Top = window.scrollY + 150
      const list = this.treeList
      for (let index = 0, len = list.length; index < len; index++) {
        const element = list[index]
        const down = list[index + 1]
        if (Top > element.top && (!down || Top < down.top)) {
          this.lookTree = element.index
          this.lookParent = element.parent
        }
      }
    },

    /* 导航移动 */
    treeMove (e) {
      const target = e.target.dataset.move
      if (target) {
        const node = document.getElementsByClassName('move-' + target)[0]
        if (node && node.offsetTop) {
          const StTop = parseInt(window.scrollY)
          const ToTop = parseInt(node.offsetTop) - StTop
          let WTop = StTop
          // 变相结束时间
          let endDate = Math.abs(ToTop) > 700 ? 700 : Math.abs(ToTop)
          // 移动动画
          animation.create((tw, oldTime) => {
            const time = new Date() - oldTime
            WTop = tw.linear(time, StTop, ToTop, endDate)
            // 动画时间到
            if (endDate - time <= 0) {
              node.className = 'treeFocus'
              setTimeout(() => {
                node.className = 'move-' + target
              }, 1500)
              return false
            }
            window.scrollTo(0, WTop)
            return true
          })
        }
      }
    },

    /* 获取树元素 */
    getTreeElement (el) {
      // 获取导航树
      const treeEl = el.querySelectorAll('div[class^="move-"]')
      let treeList = []
      for (let index = 0, len = treeEl.length; index < len; index++) {
        const item = treeEl[index]
        treeList.push({
          el: item,
          top: item.offsetTop,
          index: item.className.replace('move-', ''),
          parent: item.className.split('-')[1]
        })
      }
      this.treeList = treeList
    }
  },
  destroyed () {
    this.article.tree && window.removeEventListener('scroll', this.scroll)
  }
}
</script>

<style lang="less">
.article-box {

  .article-right {
    position: absolute;
    width: 300px;
    height: 100%;
    background-color: rgba(250, 250, 250, .8);
    border-radius: 0 5px 5px 0;
  }

  // 右侧
  .article-right-box {
    margin: 20px 0;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;

    // 二分
    .binary {
      float: left;
      width: 50%;
      font-size: 1.2rem;
      color: #666;
      cursor: pointer;

      &:hover {
        color: #333;
      }

      .iconfont {
        margin: 0 10px;
        font-size: 1.5rem;
        vertical-align: middle;
      }
    }

    .article-right-tag {

      li {
        float: left;
        margin: 5px 5px 5px 10px;
        padding: 5px 15px;
        color: #888;
        background-color: #fff;
        border: 1px solid #ededed;
        border-radius: 5px;
        cursor: pointer;

        &:hover {
          color: #444;
          border: 1px solid #666;
        }
      }
    }

    .article-right-title {
      position: relative;
      margin: 10px;
      font-size: 1.5rem;
      font-weight: bold;
      line-height: 1.2;

      &::after {
        content: '';
        position: absolute;
        left: -20px;
        width: 5px;
        height: 100%;
        border-radius: 0 5px 5px 0;
        background-color: rgba(0, 0, 0, .1);
      }
    }
    .article-right-tree {

      li {
        margin: 5px 20px;
        color: #888;
        cursor: pointer;

        &::before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          margin: -2px 15px 0 10px;
          vertical-align: middle;
          border: 3px solid rgba(0, 0, 0, .1);
          border-radius: 50%;
        }

        &:hover,
        &.focus {
          color: #333;

          &::before {
            border: 3px solid #70d7cf;
          }
        }
      }
      .article-right-tree-sub li {
        color: #ccc;

        &::before {
          border: 3px solid rgba(0, 0, 0, .05);
        }

        &:hover,
        &.focus {
          color: #555;

          &::before {
            border: 3px solid #fb8869;
          }
        }
      }
    }
  }

  // 无树
  .tree-not {
    margin: 10px;
    color: #999;
  }

  // 导航
  .article-right-fixed {
    position: fixed;
    width: 280px;
  }

  blockquote,
  h2,
  .treeFocus {
    -webkit-transition: 1s;
            transition: 1s;
  }

  .treeFocus {
    -webkit-transform: translateX(-20px);
            transform: translateX(-20px);

    h2 {
      color: #eb3a42;
    }

    blockquote {
      color: #fff;
      border-left: 8px solid #ad292f;
      background-color: #eb3a42;
    }
  }

  // 响应
  @media screen and (max-width: 1100px) {
    div.content-box {

      &.article-index {
        width: 100%;
      }

      &.article-right {
        display: none;
      }
    }
  }
}
</style>
