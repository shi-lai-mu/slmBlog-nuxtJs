<template>
  <Masks :hide="hide" :maskBackageMode="`blur-mask ${hideAni}`" :maskBoxStyle="maskBoxStyle" @close="() => hide = true">
    <main :class="['account-popup-box', modelClass[model]]">
      <div class="main-box transition-box">
        <div class="account-in-box login-box">
          <i class="slm blog-cuowu" @click="closeMask" @mouseenter="maskBoxStyle = { transform: 'rotate3d(1, 1, 0, 5deg)' }" @mouseout="maskBoxStyle = null"></i>
          <div class="title">登录</div>
          <div class="description">注册账号密码可同步收藏信息或发布文章</div>
          <Input
            class="input"
            placeholder="账号"
            v-model="formData.account"
            @keydown.enter="formData.account && formData.password && login()"
          />
          <Input
            class="input"
            placeholder="密码"
            v-model="formData.password"
            type="password"
            @keydown.enter="formData.account && formData.password && login()"
          />
          <a-button
            size="large"
            class="btn"
            type="primary"
            :disabled="!formData.account || !formData.password"
            :loading="loggingIn"
            @click="login"
          >登录</a-button>
          <span class="bottom-tips active-span" @click="model =  model === 'register' ? '' : 'unsetPwd'">{{ model === 'register' ? '使用账号登录' : '找回密码' }}</span>
        </div>
        <div class="account-in-box unset-pwd-box">
          <i class="slm blog-cuowu" @click="closeMask" @mouseenter="maskBoxStyle = { transform: 'rotate3d(1, 1, 0, 5deg)' }" @mouseout="maskBoxStyle = null"></i>
          <div class="title">找回密码</div>
          <div class="description">目前暂只支持邮箱找回密码</div>
          <Input class="input" placeholder="邮箱" type="email" v-model="formData.email" />
          <a-button size="large" class="btn" type="primary" :disabled="!formData.email">验证邮箱</a-button>
          <span class="bottom-tips active-span" @click="model = model ? '' : 'unsetPwd'">返回 登录</span>
        </div>
      </div>
      <div class="account-in-box register-box">
        <i class="slm blog-cuowu" @click="closeMask" @mouseenter="maskBoxStyle = { transform: 'rotate3d(1, 1, 0, 5deg)' }" @mouseout="maskBoxStyle = null"></i>
        <div class="title">注册</div>
        <div class="description">本站非强制性要求验证邮箱，但务必填写真实邮箱方便找回密码</div>
        <Input class="input" placeholder="邮箱" v-model="formData.email" />
        <Input class="input" placeholder="密码" v-model="formData.password" type="password" />
          <a-button size="large" class="btn" type="primary" :disabled="!formData.email || !formData.password">注册</a-button>
        <span v-if="model !== 'register'" class="bottom-tips">没有账号？<span class="active-span" @click="model = 'register'">注册</span></span>
      </div>
      <div class="tripartite-acccount">
        <a-tooltip v-for="(item, key) in tripartite" :key="key" placement="right">
          <template slot="title">{{item.name}}</template>
          <i :class="['slm', 'blog-' + item.icon]"></i>
        </a-tooltip>
      </div>
    </main>
    <div class="mask-footer" slot="mask-root">
      <div>
        <router-link class="footer-a" to="/">服务条款</router-link>
        <router-link class="footer-a" to="/privacy">隐私政策</router-link>
      </div>
      <div>© 2021 史莱姆的博客 保留所有权利</div>
    </div>
  </Masks>
</template>

<script lang="ts">
import { Input, Tooltip as ATooltip } from 'ant-design-vue';
import { Component, Prop, Watch, Vue } from 'nuxt-property-decorator';

import { loginAccount } from '@/core/service/data/user';

import Masks from '@/components/Masks.vue';
import tripartite from '@/config/note/tripartite';

/**
 * 登录弹窗组件
 */
@Component({
  components: {
    Masks,
    Input,
    ATooltip,
  },
})
export default class LoginPopup extends Vue {
  /**
   * 是否显示登录弹窗
   */
  @Prop(Boolean) show;
  /**
   * 是否隐藏
   */
  hide: boolean = true;
  /**
   * 隐藏动画
   */
  hideAni: string = '';
  /**
   * MaskBoxStyle
   */
  maskBoxStyle: any = {};
  /**
   * 当前模式
   * unsetPwd: 找回密码
   * register: 注册账号
   */
  model: 'unsetPwd' | 'register' | '' = '';
  /**
   * 模式对应类名
   */
  modelClass = {
    unsetPwd: 'unset-pwd',
    register: 'register toggle-card',
  };
  /**
   * 表单数据
   */
  formData = {
    account: '',    // 账号
    password: '',   // 密码
    email: '',      // 邮箱
  };
  /**
   * 是否正在登录
   */
  loggingIn: boolean = false;
  /**
   * 三方平台登录配置
   */
  tripartite = tripartite;


  /**
   * show值发生改变时
   */
  @Watch('show')
  updateShow(isShow) {
    this.hide = !isShow;
  }


  /**
   * 显示弹窗层
   */
  showMask(loginType?: '' | 'register' | 'unsetPwd') {
    this.model = loginType || '';
    this.hide = false;
  }


  /**
   * 关闭弹窗层
   */
  closeMask() {
    this.hideAni = 'hide-ani';
    this.maskBoxStyle = null;
    setTimeout(() => {
      this.hide = true;
      this.hideAni = '';
    }, 300);
  }


  /**
   * 登录账号
   */
  async login() {
    const { account, password } = this.formData;
    const ing = setTimeout(() => this.loggingIn = true, 100);
    const loginRes = await loginAccount(account, password);
    clearTimeout(ing);
    this.loggingIn = false;
    if (loginRes.code === 0) {
      const { result } = loginRes;
      this.$store.commit('initUser', result);
      const token = (loginRes._res.headers as any).token;
      if (token) {
        this.$store.commit('setJWT', token);
      }
      this.closeMask();
      this.$message.success(`登录成功!`);
    } else this.$message.error(loginRes.message);
  }
}
</script>

<style  lang="scss" scoped>
  .hide-ani /deep/ .mask-box {
    transition: .3s;
    opacity: .1;
    // transform: scale(.2) translate(100vw, -100vh);
    transform: rotate3d(1, 1, 0, 30deg);
  }

  /deep/ .mask-box {
    position: relative;
    background-color: transparent !important;
    transition: .8s;
  }
  
  .main-box {
    position: relative;
    z-index: 10;
  }

  .transition-box {
    transition: .5s ease;
  }

  .layout-default-mobile .tripartite-acccount {
    position: absolute;
    display: flex;
    bottom: 0;
    right: 50%;
    left: 50%;
    width: 150px;
    height: 50px;
    justify-content: space-between;
    transform: translateX(-50%) translateY(110px);
  }

  .tripartite-acccount {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 50px;
    height: 150px;
    transform: translateX(120%);

    .slm {
      display: block;
      width: 25px;
      margin: 10px 0;
      font-size: 25px;
      cursor: pointer;
      transform-origin: 25% 50%;

      &:hover {
        @include themify($themes) {
          color: themed('font-lv0-color-hover');
        }
        transition: .5s;
        transform: scale(1.2);
      }

      &:active {
        transform: scale(1.1);
      }
    }
  }

  .account-in-box {
    position: relative;
    overflow: hidden;
    z-index: 10;
    width: 90vw;
    height: 80vh;
    max-width: 400px;
    max-height: 500px;
    @include themify($themes) {
      background-color: themed('main-bg-color');
      box-shadow: 0 10px 10px rgba($color:  themed('bg-dp11-color'), $alpha: .5);
    }
    border-radius: 20px;
    perspective: 1000px;
    @extend .transition-box;

    .blog-cuowu {
      position: absolute;
      top: 0;
      right: 0;
      padding: 30px;
      font-size: 1.5rem;
      cursor: pointer;

      &:hover {
        transform: rotate3d(1, 1, 0, -5deg);
        text-shadow: 5px 5px 2px rgba($color: #000, $alpha: .5);
        @include themify($themes) {
          color: themed('font-lv0-color-hover');
        }
        transition: text-shadow .5s;
      }
    }

    .title {
      margin-top: 90px;
      font-size: 1.9rem;
      font-weight: bold;
      text-align: center;
    }

    .description {
      width: 80%;
      margin: 30px auto 60px;
      text-align: center;
      @include themify($themes) {
        color: themed('font-lv2-color');
      }
    }

    .input {
      display: block;
      height: 2.5rem;
      width: 70%;
      margin: 0 auto 20px;
      font-size: 1rem;
      // border-radius: 2rem;
      border-color: transparent;
      @include themify($themes) {
        background-color: rgba($color: themed('bg-dp10-color'), $alpha: .2);
        color: themed('font-lv1-color');

        &:hover,
        &:focus {
          background-color: rgba($color: themed('bg-dp10-color'), $alpha: .6);
          color: themed('font-lv0-color');
          border-color: themed('border-bottom-color');
        }

        &::placeholder {
          color: themed('font-lv3-color');
        }
      }
    }

    .input-msg {
      display: block;
      text-align: center;
      @include themify($themes) {
        color: themed('font-lv1-color');
      }
    }

    .btn {
      width: 70%;
      margin: 5% 15%;
      border-radius: 2rem;
    }
    
    .attach-btn {
      color: inherit;
      border-color: currentColor;
      background-color: transparent;

      &:hover {
        @include themify($themes) {
          background-color: rgba($color: themed('bg-dp10-color'), $alpha: .8);
        }
      }
    }

    .bottom-tips {
      position: absolute;
      bottom: 20px;
      left: 0;
      width: 100%;
      text-align: center;
      @include themify($themes) {
        color:  themed('font-lv3-color');
      }
    }

    .active-span {
      cursor: pointer;
      @include themify($themes) {
        color:  themed('font-lv1-color');

        &:hover {
          color:  themed('font-lv0-color-hover');
        }

        &:active {
          color:  themed('font-color');
        }
      }
    }
  }

  .account-popup-box {
    position: relative;
    display: flex;
    justify-content: center;
    perspective: 1000px;

    &.unset-pwd {
      .main-box {
        transform: rotateY(180deg);
        .unset-pwd-box {
          z-index: 11;
        }
      }

      .register-box {
        animation: registerUp .5s ease;
      }
    }

    &.toggle-card {
      .main-box {
        z-index: 1;
        transform: scale(.9) translateY(18%);
        animation: registerDown .5s ease;
      }

      .register-box {
        transform: scale(1);
      }
    }
  }

  .mask-footer {
    position: fixed;
    z-index: 999;
    right: 10px;
    bottom: 10px;
    text-align: right;

    .footer-a:last-child {
      padding-left: 10px;
      margin-left: 5px;
      @include themify($themes) {
        border-left: 1px solid rgba($color: themed('a-color'), $alpha: .5);
      }
    }
  }

  .login-box {
    position: relative;
    z-index: 11;
  }

  .register-box {
    position: absolute;
    z-index: 9;
    top: 0;
    transform: scale(.9) translateY(85px);
    animation: registerDown .5s ease;
  }

  .unset-pwd-box {
    position: absolute;
    z-index: 10;
    top: 0;
    transform: rotateY(180deg);
  }

  @keyframes registerUp {
    0% { transform: scale(.6) translateY(20%); }
    30% { transform: scale(0) translateY(-15%); }
  }

  @keyframes registerDown {
    0% { transform: scale(.6) translateY(-15%); opacity: 0; }
    50% { opacity: 0; }
    80% { transform: scale(.9) translateY(20%); opacity: 1;}
    100% { transform: scale(.9) translateY(18%); }
  }
</style>