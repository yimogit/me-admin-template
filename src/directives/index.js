export default {
  auth: {
    inserted: (el, binding) => {
      const authModules = (window.authInfo && window.authInfo.modules) || []
      if (binding.value && authModules.indexOf(binding.value) === -1) {
        if (binding.arg === 'remove') {
          el.remove()
        } else {
          el.className += ' is-disabled '
          el.setAttribute('disabled', 'disabled')
        }
      }
    }
  }
}
