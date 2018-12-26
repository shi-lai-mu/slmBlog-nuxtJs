<template>
  <div class="content-row single clearfix">
    <div class="rest-round" style="/*transform: rotateZ(90deg)*/">
    <div class="account">
        <img src="@img/account-bg3.jpg" alt="图1" class="border-line">
        <form>
            <label>账号</label><input type="text" name="log_user" class="input-1v">
            <label>密码</label><input type="password" name="log_pass" class="input-1v">
            <span class="button-v1" name="login">登陆</span>
        </form>
    </div>

    <div class="account" style="">
        <img src="images/account-bg.jpg" alt="图1" class="border-line">
        <form>
            <label>账号</label><input type="text" name="reg_user" class="input-1v" placeholder="用户名不能超过9位" data-name='账号'>
            <label>密码</label><input type="password" name="reg_pass" class="input-1v" placeholder="密码不能过短" data-name='密码'>
            <label>邮箱</label><input type="email" name="reg_email" class="input-1v" placeholder="最好输入QQ邮箱" data-name='邮箱'>
            <label>验证</label><input type="text" name="reg_code" class="input-1v input-min" placeholder="确认你非机器人" data-name='验证'><canvas></canvas>
            <label>代码</label><input type="text" name="reg_codes" class="input-1v" placeholder="填完邮箱点我即发送验证码" data-name='代码'>
            <span class="button-v1" name="register">注册</span>
        </form>
    </div>
    </div>
  </div>
</template>

<script>
import connect from '@pub/connecter'

export default {
  created () {
    connect.$emit('page', {
      title: {
        tag: '登录',
        description: '欢迎回来 ~~~ '
      }
    })
  }
}
</script>

<style lang="less">
.account {
    display: inline-block;
    width: 60%;
    max-width: 500px;
    margin: 0 auto 150px;
    padding: 20px;
    border-radius: 0 0 20px 20px;
    border: 10px solid rgba(255,255,255,.3);
    border-top: none;
    background-clip: border-box;
    // background-image: url('../images/sc/html-bg.png');
}
.account img {
  width: 100%;
}
.rest-round {
    transform-origin: center -270px;
    transition: 2s;
}
.account:nth-child(2) {
    position: absolute;
    z-index: 0;
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
    /* user-select: none; */
}
.account input {
    width: 250px;
    margin-top: 10px;
}
.account > form {
    width: 350px;
    margin: 15px auto;
}
.account .button-v1 {
    display: inline-block;
    width: 280px;
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
