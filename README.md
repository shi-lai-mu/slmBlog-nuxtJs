<div align="center">
  <img width="300"src="https://slmblog.com/git_slmblog_logo_mini.png" alt="SLM-BLOG LOGO"/>

  <p align="center">
    <a href="https://github.com/vuejs/vue">
      <img src="https://img.shields.io/badge/vue-2.6.12-brightgreen" alt="vue">
    </a>
    <a href="https://github.com/Microsoft/TypeScript">
      <img src="https://img.shields.io/badge/typescript-4.0.3-brightgreen" alt="typescript">
    </a>
    <a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
    <a href="https://github.com/vueComponent/ant-design-vue">
      <img src="https://img.shields.io/badge/antdUI-1.6.5-lightgrey" alt="antd">
    </a>
  </p>
</div>


## [SLM BLOG](https://slmblog.com) NuxtJs SSR版
SLMBLOG 是使用 NuxtJs + MidwayJs + MySql 等技术开发的个人博客系统，前后端分离扁平化UI。

---
### 开发流程
线上分为预发环境staging和真线环境，主开发流程：[开发环境](#开发环境) > [mock本地化测试](#mock本地化测试) > [YApi测试](#YApi测试) > [冒烟测试](#冒烟测试) > [预发环境](#预发环境) > [真线环境](#预发环境)
> 后面还会加入jest测试单元，尽量的去完善完整的流程。


---

web主站:

 - 页面
    - [ ] 首页 -- (开发中...)
    - [ ] 博文页
    - [ ] 登录页
    - [ ] 个人中心
    - [ ] 发布博文页
    - 待定....

 - 功能
    - [x] 自定义主题皮肤 -- 完成
    - [x] mock封装 -- 完成
    - [x] axios封装 -- 完成

Flutter 移动端: (待开发...)

Midway 后端工程: (待开发...)

---

```shell
git clone https://github.com/shi-lai-mu/slmBlog-nuxtJs.git
cd slmBlog-nuxtJs
npm i --registry=https://registry.npm.taobao.org


# 编译 (包含编译主题皮肤)
npm run build

# 启动正式生产环境 需先运行 "npm run build" (端口 8881)
npm run start

# 开发模式 (包含编译主题皮肤 | 端口 8881)
npm run dev

# 无网/无yapi平台 本地mock调试模式 (包含编译本地mock为json5 | 端口 8881)
npm run mock

# 编译本地mock(包含注释)为json5输出到 /mock/YAPI/dist
npm run build:yapi

# 运行demo预发环境 (端口 4000)
npm run staging

# 编译主题皮肤
npm run themes

# 运行jest
npm run test

# tslint 检查
npm run lint

# 生成静态文件
npm run generate
```

## 线上部署
```
$ pm2 start process.json
```

---
### 开发环境
包含UI设计、创新尝试、BUG修复、性能优化及最主要的新功能开发和基础冒烟

### mock本地化测试
mockjs去模拟 请求响应的(异常值、空值、延迟、错误、文字溢出、图过大过小) 和 跨权限组调用等情况
对于不清楚接口响应参数及没有yapi平台的用户，可以通过mock数据进行一定程度上的了解，且这里严格要求mock数据必须包含完整且有意义的注释

### YApi测试
自己搭建了一个YApi平台，除了本地的mock我想在线上也有完整的接口文档，好后续开发和导出文档
对于线上和本地后端接口进行测试集合测试，确保后端迭代不会导致其他功能塌陷

### 冒烟测试
前段主流程走通，首页及新功能无明显BUG

### 预发环境
预发工程到线上服务器，走测试数据库避免脏数据，尽可能模拟[真线](#真线环境)确保无 跨域、超时、过期 等问题

### 真线环境
正式发布到线上，确保发布效果与预期相符
