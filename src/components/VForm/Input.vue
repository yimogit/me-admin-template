<template>
  <input type="value" v-model="currentValue" @change="change" />
</template>

<script>
export default {
  name: 'v-form-input',
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  watch: {
    value(val) {
      if (this.currentValue !== val) {
        this.currentValue = val
      }
    },
    currentValue(val) {
      if (val !== this.value) this.$emit('input', val)
    }
  },
  methods: {
    change(e) {
      this.$emit('change', e)
    }
  }
}
</script>
