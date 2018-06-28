<template>
  <div>
    <div>
      单选上传图片：{{uploadSingleValue}}
      <v-upload-s v-model="uploadSingleValue" />
    </div>
    <div>
      单选上传文件：{{uploadSingleValue}}
      <v-upload-s v-model="uploadSingleValue" is-file />
    </div>
    <div>
      <div>
        多选上传多张图片：{{uploadMultipleValue}}
        <v-upload-m v-model="uploadMultipleValue" :multiple="true" />
      </div>
      <div>
        多选上传单个文件：{{uploadMultipleValue}}
        <v-upload-m v-model="uploadMultipleValue" is-file />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadSingleValue: '',
      uploadMultipleValue: []
    }
  }
}
</script>

<style>
</style>
