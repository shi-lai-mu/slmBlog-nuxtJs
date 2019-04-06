<template>
  <section class="conter">
    <div class="account clearfix">
      <img src="/img/account-bg3.jpg" alt="图1" class="border-line">

      <form action>
        <label>账号</label>
        <input type="text" name="log_user" class="input-1v" v-model="login.user">
        <label>密码</label>
        <input
          type="password"
          name="log_pass"
          class="input-1v"
          v-model="login.rsa.pass"
          @keyup.enter="loginEvent"
          autocomplete="tel"
        >
        <span class="button-lv0" @click="loginEvent">登陆</span>
      </form>

      <span class="account-right">
        <a @click="qqLogin" :href="qqLoginUrl" target="_black" rel="noopener noreferrer">
          <i class="iconfont icon-ziyuan"></i>
          <span>QQ登录</span>
        </a>
        <nuxt-link to="register">
          <i class="iconfont icon-zhuce"></i>
          <span>注册账号</span>
        </nuxt-link>
      </span>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      login: {
        user: null,
        rsa: {
          pass: null
        }
      },
      uid: Date.now(),
      qqLoginUrl: "not url",
      page: "login"
    };
  },
  created() {
    this.page = this.$route.name === "register" ? "register" : "login";
    this.qqLoginUrl =
      "https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&client_id=101540984&display=mobile&redirect_uri=http%3A%2F%2Fmczyzy.cn%3A8080%2Fqqlogin%2Fcallback&state=" +
      this.uid;
    this.$store.state.mobile &&
      (this.qqLoginUrl =
        "https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=716027609&pt_3rd_aid=101540984&daid=383&pt_skey_valid=1&style=35&s_url=http%3A%2F%2Fconnect.qq.com&refer_cgi=authorize&which=&client_id=101540984&response_type=code&redirect_uri=http%3A%2F%2Fmczyzy.cn%3A8080%2Fqqlogin%2Fcallback&state=" +
        this.uid +
        "&scope=get_user_info%2Cadd_share%2Cadd_t%2Cadd_pic_t%2Cget_repost_list&display=mobile");
    // 移动端 qq登录兼容
    if (this.$router.history.current.query.state) {
      this.qqLoginState();
    }
  },
  methods: {
    /**
     * 登录按钮点击事件
     */
    loginEvent() {
      let that = this;
      let toast = {
        text: `登录成功,欢迎回来 [${that.login.user}]!`,
        icon: "success",
        hideTime: 4000
      };
      if (that.login.user && that.login.rsa.pass) {
        that.$axios
          .api("USER_LOGIN")
          .get({
            data: {
              ...that.login
            }
          })
          .then(res => {
            if (!res.error) {
              window.localStorage.setItem("userInfo", JSON.stringify(res));
              that.$store.dispatch("USER", res);
              that.observer.emit("toast", {
                icon: "zhiwen",
                text: `登录成功,欢迎回来 [${that.login.user}]!`,
                time: false,
                select: [
                  {
                    value: "管理账号",
                    action: () => {}
                  },
                  {
                    value: "个人中心",
                    action: () => {
                      that.$router.push({
                        path: "/user/" + res.id
                      });
                    }
                  }
                ]
              });
              const page = that.$route.query.page;
              if (page) {
                that.$router.push({ path: page });
              } else {
                that.$router.push({ path: "/" });
              }
            } else that.observer.emit("toast", res);
          });
      } else
        that.observer.emit("toast", {
          icon: "wrong",
          text: "请将信息先写完整!"
        });
    },

    /**
     * 点击QQ登录后，进行窗口检测
     */
    qqLogin() {
      window.addEventListener("blur", blur);
      let self = this;
      function blur() {
        // 当用户关闭授权窗口后 或者 取消授权 回到本窗口时
        window.addEventListener("focus", focus);
        function focus() {
          window.removeEventListener("blur", blur);
          window.removeEventListener("focus", focus);

          // 检测授权uid是否存在服务器中
          self.qqLoginState();
        }
      }
    },

    /**
     * 检测QQ授权
     */
    qqLoginState(state) {
      let self = this;
      let uid = this.$router.history.current.query.state || self.uid;
      let toast = {
        text: `QQ登录授权失败!`,
        icon: "error",
        hideTime: 4000
      };
      self.$axios
        .get("qqLogin/exists", { uid })
        .then(res => {
          // 授权uid存在
          if (res.data.value) {
            // window.localStorage.setItem('userInfo', JSON.stringify(res.data))
            self.$store.state.user = JSON.parse(JSON.parse(res.data.value));
            toast.icon = "success";
            toast.text = `授权成功, 欢迎回来 [${
              self.$store.state.user.nickname
            }]!`;
            self.$connecter.$emit(
              "user",
              JSON.parse(JSON.parse(res.data.value))
            );
            self.$connecter.$emit("page", { toast });
          } else {
            toast.text = `授权失败, 回调值错误!`;
            self.$connecter.$emit("page", { toast });
          }
        })
        .catch(() => {
          self.$connecter.$emit("page", { toast });
        });
    }
  }
};
</script>

<style lang="less">
@import "./login-register.less";
</style>
