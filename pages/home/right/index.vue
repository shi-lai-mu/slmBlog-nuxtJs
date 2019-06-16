// 首页右侧组件
<template>
  <aside class="content-aff-box">
    <blogger />
    <notice :notice="right.notice" />
    <new-article :news="right.new"/>
    <friendship :ship="right.ship" />
    <leaveMessage :message="right.leaveMessage" />
  </aside>
</template>

<script>
export default {
  props: ['right'],
  components: {
    blogger: () => import('./blogger'),
    notice: () => import('./notice'),
    friendship: () => import('./friendship'),
    newArticle: () => import('./newArticle'),
    leaveMessage: () => import('./leaveMessage')
  }
}
</script>

<style lang="less" scope>
  // 右侧
  .home .content-aff-box {
    float: right;
    width: 28%;

    .content-tag {
      position: relative;
      font-size: 1.2rem;
      color: #666;
      user-select: none;

      .right {
        font-size: 1rem;
        color: #ccc;
      }
      .icon-gonggao,
      .content-desc {
        margin: 5px;
        color: #888;
        font-size: .9rem;
      }

      &::before {
        content: '';
        position: absolute;
        width: 5px;
        height: 100%;
        margin-left: -10px;
        border-radius: 0 5px 5px 0;
        background-color: #83e1f7;
      }
    }

    .content-list {
      margin: 10px 0;
      color: #888;

      li {
        margin: 5px 0;
      }
    }


    ol li {
      margin-left: 7%;
      padding-bottom: 5px;
      list-style: inherit;
      border-bottom: 1px solid #eee;

      .max-a {
        position: initial;
      }
    }

    .content-box {
      width: 100%;
      margin-bottom: 20px;
      padding: 10px;
    }
  }
</style>
