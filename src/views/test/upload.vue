<template>
  <div>
    <div>
      uploadSingleValue：{{uploadSingleValue}}
      <v-upload-single v-model="uploadSingleValue" />
      <v-upload-single v-model="uploadSingleValue" is-file />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadSingleValue: ''
    }
  }
}
</script>

<style>
</style>
