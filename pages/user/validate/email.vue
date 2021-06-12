<template>
  <main class="email-page row-box max-content">
    <div class="content-box">
      <i
        :class="[
          'slm',
          'blog-email',
          'animate__animated',
          'animate__bounce',
          { animate__infinite: loading },
        ]"
      >
        <i
          v-if="status !== null"
          :class="[
            'slm',
            status ? 'blog-xuanzhong' : 'blog-cuowu',
            'animate__animated',
            'animate__bounceIn',
            'animate__jackInTheBox',
            'animate__rubberBand',
          ]"
        ></i>
      </i>
      <div>
        <h2 class="title">
          {{ loading ? '邮箱验证中...' : `验证${status ? '成功' : '失败'}!` }}
        </h2>
        <p class="tips">{{ message }}</p>
        <aside v-if="!loading" class="aside-btn">
          <a-button><router-link :to="{ path: '/' }">首页</router-link></a-button>
          <a-button v-show="status" @click="$observer.emit('login')">登录</a-button>
          <a-button v-show="!status" @click="() => validateEmail()">重试</a-button>
        </aside>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { Button } from 'ant-design-vue'
import { Component, Vue } from 'nuxt-property-decorator'
import { validateAccountEmail } from '@/core/service/data/user'

/**
 * 邮箱 验证页
 */
@Component({
  components: {
    AButton: Button,
  },
})
export default class UserValidateEmailPage extends Vue {
  /**
   * 请求
   */
  loading: boolean = true
  /**
   * 验证状态
   */
  status: boolean | null = null
  /**
   * 信息
   */
  message: string = ''

  mounted() {
    this.validateEmail()
  }

  /**
   * 验证邮箱方法
   */
  validateEmail() {
    const { query } = this.$route
    const { uuid, code, n } = query as { [k: string]: string }

    this.loading = true
    this.message = '请稍等...'
    this.status = null

    // 给个动画时间
    setTimeout(() => {
      validateAccountEmail({ uuid, email: code, id: Number(n) }).then(res => {
        this.loading = false
        this.status = !!res.success
        this.message = res.result || res.message
      })
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.email-page {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.content-box {
  margin-top: -10vh;
  text-align: center;

  .title {
    font-size: 2rem;
  }

  .aside-btn {
    display: flex;
    justify-content: space-between;
    transform: translateY(10vh);

    .ant-btn {
      width: 40%;
    }
  }
}

.blog-email {
  position: relative;
  display: block;
  line-height: 1;
  text-align: center;
  font-size: 16vmax;
  text-shadow: 1rem 1rem 2rem var(--c-bg-primary);

  .slm {
    position: absolute;
    display: flex;
    top: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    &.blog-cuowu::before {
      background-color: var(--c-alert-error-icon);
    }

    &.blog-xuanzhong::before {
      background-color: var(--c-alert-success-icon);
    }

    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      padding: 1.5vmax;
      font-size: 4vmax;
      color: var(--c-bg-primary);
      border-radius: 6vmax;
      text-shadow: none;
      box-shadow: 0.5rem 0.5rem 1rem var(--c-bg-primary);
      animation: success-big 1s;
    }
  }
}
</style>
