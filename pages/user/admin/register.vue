<template>
  <section class="conter">
    <div class="account clearfix">
      <img src="/img/account-bg3.jpg" alt="图1" class="border-line">
      <form>
        <label>昵称</label>
        <input type="text" v-model="register.username" @change="regUsername">
        <label>账号</label>
        <input type="text" v-model="register.user" @dblclick="addUser" ref="userInput">
        <label>密码</label>
        <input type="password" v-model="register.rsa.pass" autocomplete="tel">
        <!-- <label>邮箱</label><input type="email" v-model="register.email" class="input-1v" placeholder="最好输入QQ邮箱" data-name='邮箱'> -->
        <!-- <label>验证</label><input type="text" v-model="register.code" class="input-1v input-min" placeholder="确认你非机器人" data-name='验证'><canvas></canvas> -->
        <!-- <label>代码</label><input type="text" class="input-1v" placeholder="填完邮箱点我即发送验证码" data-name='代码'> -->
        <span class="button-lv0" @click="registerEvent">注册</span>
      </form>
      <span class="account-right">
        <nuxt-link to="login">
          <i class="iconfont icon-zhuce"></i>
          <span>登录账号</span>
        </nuxt-link>
      </span>
    </div>
  </section>
</template>

<script>
import py from "~/plugins/Convert_Pinyin";
export default {
  data() {
    return {
      register: {
        user: null,
        rsa: {
          pass: null
        },
        username: null
      }
    };
  },
  methods: {
    /* 注册按钮点击事件 */
    registerEvent() {
      let that = this
      const reg = that.register
      // 判断注册信息是否全面
      if (reg.user && reg.rsa.pass && reg.user) {
        that.$axios
          .api("USER_REGISTER")
          .post(reg)
          .then(res => {
            if (!res.error) {
              that.$store.dispatch('USER', res)
              that.$router.push({ path: '/' })
              that.observer.emit('toast', {
                icon: 'zhiwen',
                text: `注册成功, [${reg.user || ""}] 欢迎加入!`
              })
              that.observer.emit('HeaderRouter')
            } else that.observer.emit("toast", res)
          })
      } else {
        that.observer.emit("toast", {
          error: '请将信息填写完整!'
        });
      }
    },

    /** 注册用户名自动转为拼音 */
    regUsername(e) {
      this.$refs.userInput.placeholder = `双击填充(${py
        .getFullChars(e.target.value)
        .toLocaleLowerCase()})`;
    },

    /* 自动填充用户名 */
    addUser(e) {
      this.register.user = py
        .getFullChars(this.register.username)
        .toLocaleLowerCase();
    }
  }
};
</script>

<style lang="less">
@import "./login-register.less";
</style>
