export default {
  props: {
    auth: String,
    type: String,
    icon: String,
    size: {
      type: String,
      default: 'small'
    }
  },
  methods: {
    handle() {
      this.$emit('click')
    }
  }
}
