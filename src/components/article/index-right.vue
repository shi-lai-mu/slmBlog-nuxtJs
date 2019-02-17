<template>
  <div class="content-box article-right">
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
        <span v-else>抱歉,本文未找到导航!</span>
      </div>
    </div>
  </div>
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
  }
}
</script>

<style lang="less">
  
  // 右侧
  .article-right-box {
    margin: 20px 0;
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
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
        border: 1px solid #ededed;
        border-radius: 5px;
        padding: 5px 15px;
        color: #888;
        background-color: #fff;
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
          border: 3px solid rgba(0, 0, 0, .1);
          border-radius: 50%;
          vertical-align: middle;
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

  // 导航
  .article-right-fixed {
    position: fixed;
    width: 280px;
  }
  blockquote,
  h2,
  .treeFocus {
    transition: 1s;
  }
  .treeFocus {
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
</style>
