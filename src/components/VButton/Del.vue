<template>
  <el-button :size="size" v-auth="auth" @click="click_handle">
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
      this.$ui.pages
        .confirm('是否删除？')
        .then(() => {
          this.$emit('yes')
        })
        .catch(() => {
          this.$emit('no')
        })
    }
  }
}
</script>
