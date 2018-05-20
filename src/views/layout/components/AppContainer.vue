<template>
    <div :style="cstyle">
        <slot></slot>
    </div>
</template>

<script>
export default {
  props: ['cstyle']
}
</script>
