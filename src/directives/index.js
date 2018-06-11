export default {
  auth: {
    inserted: (el, binding) => {
      if (
        binding.value &&
        window.modules &&
        window.modules.indexOf(binding.value) === -1
      ) {
        // el.remove()
        el.setAttribute('disabled', 'disabled')
      }
    }
  }
}
