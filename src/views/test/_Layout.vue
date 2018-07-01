<template>
  <div>
    <ul class="nav">
      <li :class="{'active':$route.path==='/test/'+item.path}" v-for="item in navs" :key="item.path" @click="open(item)">{{item.path}}</li>
    </ul>
    <div class="main" :style="contentStyle">
      <router-view />
    </div>
  </div>
</template>

<script>
import routes from '@/router/modules/test'
export default {
  data() {
    return {
      innerHeight: 0,
      navHeight: 0,
      navs: routes.children
    }
  },
  computed: {
    contentStyle() {
      return 'height:' + (this.innerHeight - this.navHeight - 12) + 'px'
    }
  },
  created() {
    var _this = this
    _this.innerHeight = window.innerHeight
    window.onresize = function() {
      if (_this.innerHeight !== window.innerHeight) {
        _this.innerHeight = window.innerHeight
      }
    }
    this.$nextTick(() => {
      this.navHeight = document.getElementsByClassName('nav')[0].clientHeight
    })
  },
  methods: {
    open(item) {
      this.$router.push('/test/' + item.path)
    }
  }
}
</script>
<style lang="scss" scoped>
ul.nav {
  height: 40px;
  line-height: 40px;
  li {
    width: 100px;
    cursor: pointer;
    float: left;
    list-style: none;
    background: #6b928a;
    color: white;
    text-align: center;
    border-right: 1px solid white;
  }
  li:hover,
  li.active {
    background: #5db9a5;
  }
}
.main {
  clear: both;
  border: 1px solid #5db9a5;
  padding: 5px;
  overflow: auto;
}
</style>

<style>
body,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
p,
blockquote,
dl,
dt,
dd,
ul,
ol,
li,
pre,
form,
fieldset,
legend,
button,
input,
textarea,
th,
td {
  margin: 0;
  padding: 0;
}
body,
button,
input,
select,
textarea {
  font: 12px/1.5tahoma, arial, \5b8b\4f53;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
}
address,
cite,
dfn,
em,
var {
  font-style: normal;
}
code,
kbd,
pre,
samp {
  font-family: couriernew, courier, monospace;
}
small {
  font-size: 12px;
}
ul,
ol {
  list-style: none;
}
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
sup {
  vertical-align: text-top;
}
sub {
  vertical-align: text-bottom;
}
legend {
  color: #000;
}
fieldset,
img {
  border: 0;
}
button,
input,
select,
textarea {
  font-size: 100%;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>
