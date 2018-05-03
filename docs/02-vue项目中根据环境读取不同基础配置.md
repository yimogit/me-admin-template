## 根据环境读取不同基础配置

在实际项目开发中,接口域名等配置开发环境和生成有所不同,需要将其剥离开来,方法很多,下面介绍我所认为的最简单做法

1.  在项目中新建 config 文件夹
2.  添加 index.js 并写入`export default require('./_' + process.env.NODE_ENV)`
3.  根据 vue-cli 生成的环境变量(根目录 config 设置)有三个环境:`development`,`testing`,`production`,config 目录结构如下所示

```
    config
        - _development.js
        - _production.js
        - _testing.js
```

4.  使用:`import webConfig from '@/config'`,运行后将自动根据环境加载不同的配置
5.  config 代码示例
    ![图片](https://dn-coding-net-production-pp.qbox.me/a9d58aac-b0d0-4350-8f8d-4c6e839fae6f.png)

## 其他配置方式

1.  在 `build\webpack.base.conf.js` 中设置别名

```js
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'config$': process.env.NODE_ENV === 'production'
        ? resolve('src/config/config.prod.js')
        : resolve('src/config/config.dev.js'),
    }
  },
```

使用的时候直接`import config from 'config'`即可

2.  直接将配置写在 config\xxx.env.js 中。通过`process.env.变量`使用，但这种开发时变更配置测试的时候不太方便，需要重启开发服务器才能生效
