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
  mixins: [button]
}
</script>
