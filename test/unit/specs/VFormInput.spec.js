import Vue from 'vue'
import VFormInput from '@/components/VForm/Input'

function getRendered(Component, propsData) {
  const Constructor = Vue.extend(Component)
  const vm = new Constructor({ propsData: propsData }).$mount()
  return vm
}

describe('VFormInput', () => {
  it('检测Input组件', () => {
    var vm = getRendered(VFormInput, { value: '233' })
    expect(vm.currentValue).toBe(vm.value)
  })
})
