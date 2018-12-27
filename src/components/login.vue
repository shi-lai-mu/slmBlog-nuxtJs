<template>

    <div class="content-row single clearfix">

        <div class="content-box">

            <div class="account">
                <img src="@img/account-bg3.jpg" alt="图1" class="border-line">
                <form action="">
                    <div>
                        <label>账号</label>
                        <input type="text" name="log_user" class="input-1v" v-model="login.user">
                    </div>
                    <div>
                        <label>密码</label>
                        <input type="password" name="log_pass" class="input-1v" v-model="login.pass">
                    </div>
                    <span class="button-v1" @click="loginEvent">登陆</span>
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

    </div>

</template>

<script>

export default {
  data () {
    return {
      login: {
        user: null,
        pass: null
      }
    }
  },
  created () {
    this.$connecter.$emit('page', {
      title: {
        tag: '登录',
        description: '欢迎回来 ~~~ '
      }
    })
  },
  methods: {
    loginEvent () {
      this.$http.get(`user/login`, this.login)
        .then(res => {
          console.log(res)
        })
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
    padding: 15px;
    color: var(--font-out);
    text-shadow: var(--font-out-shadow);
    border-radius: 0 0 20px 20px;
    border: 10px solid rgba(255,255,255,.2);
    border-top: 0;
    background-image: var(--body-img);
    background-clip: border-box;
    box-sizing: border-box;
}
.account img {
  width: 100%;
  padding: 10px;
  background-image: var(--img-bg);
  border: 1px solid rgba(255, 255, 255, .3);
  border-radius: 20px;
  box-sizing: border-box;
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
.account label {
    display: inline-block;
    width: 50px;
    margin-right: 20px;
    font-size: 20px;
    font-weight: 600;
    color: var(--text-black);
    text-shadow: 1px 1px 0 var(--text-black-shadow);
}
.account input {
    width: 50vw;
    max-width: 250px;
    min-width: 200px;
    margin-top: 10px;
}
.account > form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: 15px auto;
}
.account .button-v1 {
    width: 40vw;
    max-width: 280px;
    margin-top: 25px;
}
.account .input-min {
    width: 150px;
}
.account canvas {
    width: 90px;
    height: 35px;
    margin-left: 10px;
    vertical-align: middle;
    background: white;
    border-radius: 5px;
    /* user-select: none; */
}
</style>
