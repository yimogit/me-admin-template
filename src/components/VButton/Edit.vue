<template>
    <button :size="size" v-auth="auth" @click="$emit('click')">
        <slot name="icon">
            <i :class="icon"></i>
        </slot>
        <slot>{{text}}</slot>
    </button>
</template>

<script>
import button from './mixins/button.js'
export default {
  mixins: [button],
  props: {
    icon: {
      type: String,
      default: 'iconfont icon-edit'
    },
    text: {
      type: String,
      default: '编辑'
    }
  }
}
</script>
