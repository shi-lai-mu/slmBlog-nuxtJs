<template>

    <div class="content-row single clearfix">

        <div class="account">
            <img src="@img/account-bg3.jpg" alt="图1" class="border-line">
            <form action="">
                <div>
                    <label>账号</label>
                    <input type="text" name="log_user" class="input-1v" v-model="login.user">
                </div>
                <div>
                    <label>密码</label>
                    <input type="password" name="log_pass" class="input-1v" v-model="login.pass_rsa">
                </div>
                <span class="button-v1" @click="loginEvent">登陆</span>
                <span class="account-right">
                    <a @click="qqLogin" :href="'https://graph.qq.com/oauth2.0/show?which=Login&display=pc&response_type=code&client_id=101540984&redirect_uri=http%3A%2F%2Fmczyzy.cn%3A8080%2Fqqlogin%2Fcallback&state=' + uid" target="_black">
                        <i class="iconfont icon-ziyuan"></i>
                        <span>QQ登录</span>
                    </a>
                </span>
            </form>
        </div>

    <!-- <div class="account">
        <img src="images/account-bg.jpg" alt="图1" class="border-line">
        <form>
            <label>账号</label><input type="text" name="reg_user" class="input-1v" placeholder="用户名不能超过9位" data-name='账号'>
            <label>密码</label><input type="password" name="reg_pass" class="input-1v" placeholder="密码不能过短" data-name='密码'>
            <label>邮箱</label><input type="email" name="reg_email" class="input-1v" placeholder="最好输入QQ邮箱" data-name='邮箱'>
            <label>验证</label><input type="text" name="reg_code" class="input-1v input-min" placeholder="确认你非机器人" data-name='验证'><canvas></canvas>
            <label>代码</label><input type="text" name="reg_codes" class="input-1v" placeholder="填完邮箱点我即发送验证码" data-name='代码'>
            <span class="button-v1" name="register">注册</span>
        </form>
    </div> -->

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
      uid: null
    }
  },
  created () {
    this.$connecter.$emit('page', {
      title: {
        tag: '登录',
        description: '欢迎回来 ~~~ '
      }
    })
    this.uid = Date.now()
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
    }
  }
}
</script>

<style lang="less">

.account {
    display: block;
    width: 80%;
    max-width: 600px;
    min-width: 200px;
    margin: 0 auto 100px;
    border: 10px solid rgba(255,255,255,.2);
    border-radius: 0 0 20px 20px;
    padding: 15px;
    color: var(--font-out);
    text-shadow: var(--font-out-shadow);
    border-top: 0;
    background-image: var(--body-img);
    background-clip: border-box;
    box-sizing: border-box;

    .account-right {
        display: block;
        width: 100%;
        margin-top: 10px;
        text-align: right;
        user-select: none;

        span {
            font-weight: bold;
            font-size: .9em;
            cursor: pointer;
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
        color: var(--text-black);
        text-shadow: 1px 1px 0 var(--text-black-shadow);
    }

    input {
        width: 50vw;
        max-width: 250px;
        min-width: 200px;
        margin-top: 10px;
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
        width: 150px;
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
        margin: 15px auto;
    }
}
.rest-round {
    transform-origin: center -270px;
    transition: 2s;
}
.account:nth-child(2) {
    position: absolute;
    z-index: 0;
    background-image: var(--body-img);
    transform: rotateZ(-90deg) translateX(534px) translateY(-27px);
}
</style>
