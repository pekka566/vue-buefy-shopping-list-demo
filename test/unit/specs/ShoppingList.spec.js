import Vue from 'vue'
import ShoppingList from '@/components/ShoppingList'
import Buefy from 'buefy'

Vue.use(Buefy)

describe('ShoppingList.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(ShoppingList)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('h1').textContent)
    .toEqual('Shopping List')
  })
})
