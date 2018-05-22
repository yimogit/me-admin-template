export default {
  auth: {
    inserted: (el, binding) => {
      if (window.modules.indexOf(binding.value) === -1) {
        // el.remove()
        el.setAttribute('disabled', 'disabled')
      }
    }
  }
}
