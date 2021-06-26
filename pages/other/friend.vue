<template>
  <div class="friend-page">
    <div class="friend-content max-content">
      <div class="row-box">
        <h2 class="title">友情链接</h2>
        <div class="row-content friend-list">
          <nuxt-link
            v-for="(item, index) in friendLink"
            :key="index"
            :to="item.link"
            class="friend-item"
          >
            <img class="friend-item__icon" :src="item.icon" :alt="`${item.icon} logo`" />
            <div class="friend-item__content">
              <div class="friend-item__title" v-text="item.name"></div>
              <div class="friend-item__description" v-text="item.desc"></div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { getFriendLink } from '~/core/service/data/notify'
import { Notify } from '~/interface/request/notify'

/** 友链页面 */
@Component
export default class FriendPage extends Vue {
  /** 友链 */
  friendLink: Notify.FriendLink[] = []

  async asyncData() {
    return {
      /** 获取友链 */
      friendLink: (await getFriendLink()).result?.list,
    }
  }
}
</script>

<style lang="scss" scoped>
.friend-page {
  .friend-content {
    margin: 80px auto 20px;
  }

  .title {
    font-size: 1.5rem;
    line-height: 3rem;
    text-align: center;
    border-bottom: 1px solid var(--c-border-primary);
  }

  .friend-list {
    display: grid;
    padding: 10px 0;
    grid-template-columns: repeat(3, 31.33%);
    grid-gap: 20px 3%;
  }

  .friend-item {
    display: flex;
    height: 100px;
    max-height: 100px;
    padding: 10px;
    background-color: var(--c-border-secondary);
    border-radius: 5px;

    .friend-item__content {
      width: calc(100% - 90px);
    }

    .friend-item__icon {
      width: 80px;
      height: 80px;
      margin-right: 10px;
    }

    .friend-item__title {
      font-weight: bold;
      font-size: 1.1rem;
    }

    .friend-item__description {
      display: -webkit-box;
      width: 100%;
      overflow: hidden;
      margin-top: 10px;
      // white-space: nowrap;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      color: var(--c-text-secondary);
    }
  }
}
</style>
