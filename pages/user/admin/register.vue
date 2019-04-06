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
        <input type="password" v-model="register.pass_rsa">
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
        pass_rsa: null,
        username: null
      }
    };
  },
  methods: {
    /* 注册按钮点击事件 */
    registerEvent() {
      let self = this;
      const reg = self.register;
      let toast = {
        text: `注册成功, [${reg.user || ""}] 欢迎加入!`,
        icon: "success",
        hideTime: 4000
      };
      // 判断注册信息是否全面
      if (reg.user && reg.pass_rsa && reg.user) {
        self.$axios
          .api("USER_REGISTER")
          .post({
            data: reg
          })
          .then(res => {
            console.log(res);
            // window.localStorage.setItem('userInfo', JSON.stringify(res.data))
            // self.$store.state.user = res.data
            // self.observer.emit('page', { toast })
            // self.$router.push({path: '/'})
          })
      } else {
        self.observer.emit("toast", {
          toast: {
            text: `请将信息填写完整!`,
            icon: "error",
            hideTime: 3000
          }
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
