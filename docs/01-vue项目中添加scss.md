## 添加 scss 支持

* 安装 `node-sass` 和 `sass-loader` 即可使用

```js
npm install node-sass --save-dev
npm install sass-loader --save-dev  
```

* 使用方式，可通过在 script/style 引入 scss 文件或者直接在 style 中编写

```js
<script>
import "@/assets/index.scss";
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/assets/index.scss";
</style>
```
