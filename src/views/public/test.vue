<template>
  <div>
    <p>VFormInput:
      <v-form-input v-model="test" />{{test}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: 'abc'
    }
  }
}
</script>

<style>

</style>
