<template>

    <div class="content-row single clearfix">

        <div :class="['account', {'login': page == 'login'}]">
            <img src="http://120.78.221.235/img/account-bg3.jpg" alt="图1" class="border-line">
            <form action="">
                <label>账号</label>
                <input type="text" name="log_user" class="input-1v" v-model="login.user">
                <label>密码</label>
                <input type="password" name="log_pass" class="input-1v" v-model="login.pass_rsa">
                <span class="button-v1" @click="loginEvent">登陆</span>
            </form>
            <span class="account-right">
                <a @click="qqLogin" :href="qqLoginUrl" target="_black">
                    <i class="iconfont icon-ziyuan"></i>
                    <span>QQ登录</span>
                </a>
                <a>
                    <i class="iconfont icon-zhuce"></i>
                    <span @click="togglepage" data-page="register">注册账号</span>
                </a>
            </span>
        </div>

        <div :class="['account', {'register': page == 'register'}]">
            <img src="http://120.78.221.235/img/account-bg3.jpg" alt="图1" class="border-line">
            <form>
                <label>账号</label><input type="text" v-model="register.user" placeholder="用户名不能超过9位">
                <label>密码</label><input type="password" v-model="register.pass_rsa" placeholder="密码不能过短">
                <!-- <label>邮箱</label><input type="email" v-model="register.email" class="input-1v" placeholder="最好输入QQ邮箱" data-name='邮箱'> -->
                <!-- <label>验证</label><input type="text" v-model="register.code" class="input-1v input-min" placeholder="确认你非机器人" data-name='验证'><canvas></canvas> -->
                <!-- <label>代码</label><input type="text" class="input-1v" placeholder="填完邮箱点我即发送验证码" data-name='代码'> -->
                <span class="button-v1" @click="registerEvent">注册</span>
            </form>
            <span class="account-right">
                <a @click="qqLogin" :href="qqLoginUrl" target="_black">
                    <i class="iconfont icon-ziyuan"></i>
                    <span>QQ登录</span>
                </a>
                <a>
                    <i class="iconfont icon-zhuce"></i>
                    <span @click="togglepage" data-page="login">登录账号</span>
                </a>
            </span>
        </div>

    </div>

</template>

<script>
export default {
  data () {
    return {
      login: {
        user: null,
        pass_rsa: null
      },
      register: {
        user: null,
        pass_rsa: null
      },
      uid: Date.now(),
      qqLoginUrl: 'not url',
      page: 'login'
    }
  },
  created () {
    this.$store.state.user && history.back(-1)
    this.$connecter.$emit('page', {
      title: {
        tag: '登录',
        description: '欢迎回来 ~~~ '
      }
    })
    this.page = this.$route.query.register === null ? 'register' : 'login'
    this.qqLoginUrl = 'https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&client_id=101540984&redirect_uri=http%3A%2F%2Fmczyzy.cn%3A8080%2Fqqlogin%2Fcallback&state=' + this.uid
    this.$store.state.mobile && (this.qqLoginUrl = 'https://xui.ptlogin2.qq.com/cgi-bin/xlogin?appid=716027609&pt_3rd_aid=101540984&daid=383&pt_skey_valid=0&style=35&s_url=http%3A%2F%2Fconnect.qq.com&refer_cgi=authorize&which=&client_id=101540984&redirect_uri=http%3A%2F%2Fmczyzy.cn%3A8080%2Fqqlogin%2Fcallback&response_type=code&state=' + this.uid)
  },
  methods: {

    /**
     * 登录按钮点击事件
     */
    loginEvent () {
      let self = this
      let toast = {
        text: `登录成功,欢迎回来 [${self.login.user}]!`,
        icon: 'success',
        hideTime: 4000
      }
      if (self.login.user && self.login.pass_rsa) {
        self.$http.get(`user/login`, self.login)
          .then(res => {
            window.localStorage.setItem('userInfo', JSON.stringify(res.data))
            self.$store.state.user = res.data
            self.$connecter.$emit('page', { toast })
            self.$router.push({path: '/'})
          })
          .catch(err => {
            toast.icon = 'error'
            toast.text = err.data.error
            self.$connecter.$emit('page', { toast })
          })
      }
    },

    /**
     * 注册按钮点击事件
     */
    registerEvent () {
      let self = this
      let toast = {
        text: `注册成功, [${self.login.user}] 欢迎加入!`,
        icon: 'success',
        hideTime: 4000
      }
      if (self.register.user && self.register.pass_rsa) {
        self.$http.get(`user/register`, self.register)
          .then(res => {
            window.localStorage.setItem('userInfo', JSON.stringify(res.data))
            self.$store.state.user = res.data
            self.$connecter.$emit('page', { toast })
            self.$router.push({path: '/'})
          })
          .catch(err => {
            toast.icon = 'error'
            toast.text = err.data.error
            self.$connecter.$emit('page', { toast })
          })
      }
    },

    /**
     * 点击QQ登录后，进行窗口检测
     */
    qqLogin () {
      let toast = {
        text: `QQ登录授权失败!`,
        icon: 'error',
        hideTime: 4000
      }
      let self = this
      window.addEventListener('blur', blur)
      function blur () {
        // 当用户关闭授权窗口后 或者 取消授权 回到本窗口时
        window.addEventListener('focus', focus)
        function focus () {
          window.removeEventListener('blur', blur)
          window.removeEventListener('focus', focus)

          // 检测授权uid是否存在服务器中
          self.$http.get('qqLogin/exists', { uid: self.uid })
            .then(res => {
              // 授权uid存在
              if (res.data.value) {
                // window.localStorage.setItem('userInfo', JSON.stringify(res.data))
                self.$store.state.user = JSON.parse(JSON.parse(res.data.value))
                toast.icon = 'success'
                toast.text = `授权成功, 欢迎回来 [${self.$store.state.user.nickname}]!`
                self.$connecter.$emit('page', { toast })
              } else {
                toast.text = `授权失败, 回调值错误!`
                self.$connecter.$emit('page', { toast })
              }
            })
            .catch(() => {
              self.$connecter.$emit('page', { toast })
            })
        }
      }
    },

    /**
     * 切换为注册
     */
    togglepage (e) {
      let data = e.target.dataset
      data.page && (this['page'] = data.page)
    }

  }
}
</script>

<style lang="less">
.content-row {
}

.account {
    display: block;
    width: 80%;
    max-width: 600px;
    min-width: 200px;
    max-height: 0;
    border-radius: 0 0 20px 20px;
    opacity: 0;
    margin: 0 auto;
    color: var(--font-out);
    text-shadow: var(--font-out-shadow);
    background-image: var(--body-img);
    background-clip: border-box;
    box-sizing: border-box;
    transition: 1s;
    transform: translateY(-30%);
    pointer-events: none;

    .account-right {
        display: block;
        width: 100%;
        margin-top: 10px;
        text-align: right;
        user-select: none;
        font-weight: bold;

        span {
            font-size: .9em;
            cursor: pointer;
        }

        a {
            margin: 0 10px;
        }
    }

    img {
        width: 100%;
        padding: 10px;
        border: 1px solid rgba(255, 255, 255, .3);
        border-radius: 20px;
        background-image: var(--img-bg);
        box-sizing: border-box;
    }

    label {
        display: inline-block;
        width: 50px;
        margin-right: 20px;
        font-size: 20px;
        font-weight: 600;
        line-height: 40px;
        color: var(--text-black);
        text-shadow: 1px 1px 0 var(--text-black-shadow);
    }

    input {
        width: 50vw;
        max-width: 250px;
        min-width: 100px;
        margin: 5px 0;
    }

    canvas {
        width: 90px;
        height: 35px;
        margin-left: 10px;
        vertical-align: middle;
        background: white;
        border-radius: 5px;
    }

    .input-min {
        width: 151px;
        max-width: 151px;
    }

    .button-v1 {
        width: 40vw;
        max-width: 280px;
        margin-top: 25px;
    }

    & > form {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        width: 345px;
        margin: 15px auto;
    }
}
.login, .register {
    max-height: 100vh;
    margin: 0 auto 100px;
    padding: 15px;
    border: 10px solid rgba(255,255,255,.2);
    border-top: 0;
    opacity: 1;
    transform: none;
    pointer-events: initial;
}
</style>
