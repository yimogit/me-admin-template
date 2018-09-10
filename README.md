# me-admin-template

[![Build Status](https://travis-ci.org/yimogit/me-admin-template.svg?branch=master)](https://travis-ci.org/yimogit/me-admin-template)

> 一个基于 vue-cli 的后台模板框架,以期构建一个可以快速使用的简单后台模板

## 命令说明

- `npm run mock` 启动测试接口服务器
- `npm run dev` 启动开发服务器
- `npm run build` 构建生成包
- `npm run mock-build&npm run build-test` 构建 mock 测试数据, 构建测试包并打包 api-json 文件到 dist/api-test-data 目录

## 技术栈

- vue
- vue-router
- vuex
- axios

## 拟定功能项及相关文档

- [x] [添加 scss 支持](./docs/01-vue项目中添加scss.md)
- [x] [根据环境读取不同基础配置](./docs/02-vue项目中根据环境读取不同基础配置.md)
- [x] [根据环境路由使用不同加载方式](./docs/03-vue项目中根据环境路由使用不同加载方式.md)
- [x] [通用 components-directives-filters 的注册与使用](./docs/04-vue项目中通用组件-指令-过滤器的注册与使用.md)
- [x] [添加 vuex 使其更加方便管理全局变量](./docs/05-vue项目中使用vuex进行状态管理.md)
- [x] [添加 axios 封装 api 请求](./docs/06-添加axios封装api请求.md)
- [x] [添加 express-mockjs 进行数据模拟](./docs/07-添加express-mockjs进行数据模拟.md)
- [x] [前后端分离后权限的实现](./docs/08-前后端分离后权限的实现.md)
- [x] [封装通用操作,解耦组件](./docs/09-封装通用操作以期解耦组件.md)
- [x] [添加 pwa 解决发布后刷新出错问题](./10-为vue项目添加pwa解决发布后刷新出错问题.md)
- [x] 集成 element-ui
- 手写一个代码生成器构建基础的 CURD 前端代码

## 项目参考

- https://github.com/PanJiaChen/vue-element-admin
- https://github.com/sls-admin/sls-admin-vue
- https://github.com/nicejade/vue-boilerplate-template

## 项目进度

- 2018-06-16: 引入 element-ui
- 2018-05-03: 基础框架搭建

## 框架效果预览

[整容前](https://user-gold-cdn.xitu.io/2018/8/11/165291278ea146d1)
[整容后](https://user-gold-cdn.xitu.io/2018/8/11/1652912db78bd206)
