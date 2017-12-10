<template>
  <section>
    <h1 class="title">Shopping List</h1>
    <b-tabs type="is-boxed" v-model="activeTab">
        <b-tab-item label="Items">
          <Items :items="items"
            :categories="categories"
            @modifyItem="moveToModifyItem"/>
        </b-tab-item>
        <b-tab-item label="Add item">
          <NewItem @addNewItem="addNewItem"
            :categories="categories"
            v-bind:isModify=false />
        </b-tab-item>
        <b-tab-item label="" v-bind:disabled=true>
          <NewItem @modifyItem="doItemModify"
            @removeItem="doItemRemove"
            :categories="categories"
            :item="item"
            v-bind:isModify=true />
        </b-tab-item>
    </b-tabs>
  </section>
</template>

<script>
  import NewItem from './NewItem'
  import Items from './Items'

  /* eslint-disable */
  const testData =
    [{ 'item':{ 'name':'Apple', 'count':'2', 'categoryId':2}},
    { 'item':{ 'name':'Banana', 'count':'6', 'categoryId':2}},
    { 'item':{ 'name':'Cucumber', 'count':'1', 'categoryId':1}},
    { 'item':{ 'name':'Orange', 'count':'8', 'categoryId':2}},
    { 'item':{ 'name':'Milk','count':'2','categoryId':null}},
    { 'item':{ 'name':'Super glue','count':'1','categoryId':null}},
    { 'item':{ 'name':'Applex', 'count':'2', 'categoryId':2}},
    { 'item':{ 'name':'Bananax', 'count':'6', 'categoryId':2}},
    { 'item':{ 'name':'Cucumberx', 'count':'1', 'categoryId':1}},
    { 'item':{ 'name':'Orangex', 'count':'8', 'categoryId':2}},
    { 'item':{ 'name':'Milkx','count':'2','categoryId':null}},
    { 'item':{ 'name':'Super gluex','count':'1','categoryId':null}}
  ]

  const categories = [
    {id: 1, name: 'Beverages'},
    {id: 2, name: 'Bread/Bakery'},
    {id: 3, name: 'Canned/Jarred Goods'},
    {id: 4, name: 'Dairy'},
    {id: 5, name: 'Dry/Baking Goods'},
    {id: 6, name: 'Frozen Foods'},
    {id: 7, name: 'Meat'},
    {id: 8, name: 'Produce'},
    {id: 9, name: 'Cleaners'},
    {id: 10, name: 'Paper Goods'},
    {id: 11, name: 'Personal Care'},
    {id: 12, name: 'Other'}
  ]
  /* eslint-enable */

  export default {
    components: {
      NewItem,
      Items
    },
    name: 'ShoppingList',
    methods: {
      addNewItem (item) {
        item.timestamp = Date.now()
        this.items.push({
          item
        })
      },
      doItemModify (item) {
        this.activeTab = 0
      },
      doItemRemove (item) {
        this.activeTab = 0
        this.items = this.items.filter((itemInMap) => {
          return item.timestamp !== itemInMap.item.timestamp
        })
      },
      moveToModifyItem (timestamp) {
        let item = this.items.find(x => x.item.timestamp === timestamp)
        this.item = item.item
        this.isModify = true
        this.activeTab = 2
      }
    },
    data () {
      return {
        msg: 'Shopping List',
        items: [],
        item: {},
        categories: categories,
        activeTab: 0,
        isModify: false
      }
    }
  }
</script>
