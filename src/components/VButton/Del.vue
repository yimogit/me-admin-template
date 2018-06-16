<template>
  <button :size="size" v-auth="auth" @click="click_handle">
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
      default: 'iconfont icon-del'
    },
    text: {
      type: String,
      default: '删除'
    },
    confirm: Boolean
  },
  methods: {
    click_handle() {
      if (this.confirm) return this.confirmHandle()
      else return this.$emit('click')
    },
    confirmHandle() {
      if (confirm('是否删除？')) {
        this.$emit('yes')
      } else {
        this.$emit('no')
      }
    }
  }
}
</script>
