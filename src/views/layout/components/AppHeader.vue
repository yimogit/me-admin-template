<template>
    <header :style="headerStyle">
        header
    </header>
</template>

<script>
export default {
  props: ['height'],
  data() {
    return {
      headerStyle:
        'height:' + this.height + 'px;line-height:' + this.height + 'px;'
    }
  }
}
</script>

<style>
</style>
