<template>
  <el-button :size="size" v-auth="auth" @click="$emit('click')">
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
      default: 'el-icon-edit'
    },
    text: {
      type: String,
      default: '编辑'
    }
  }
}
</script>
