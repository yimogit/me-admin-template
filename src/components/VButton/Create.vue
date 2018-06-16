<template>
  <el-button :size="size" v-auth="auth" type="primary" @click="$emit('click')">
    <slot name="icon">
      <i :class="icon"></i>
    </slot>
    <slot>{{text}}</slot>
  </el-button>
</template>

<script>
import button from './mixins/button.js'
export default {
  mixins: [button],
  props: {
    icon: {
      type: String,
      default: 'iconfont icon-create'
    },
    text: {
      type: String,
      default: '创建'
    }
  }
}
</script>
