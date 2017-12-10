<template>
  <section>
    <form class="box">
      <b-field label="Item *" v-if="!isModify">
        <b-autocomplete
          type="text"
          v-model="item.name"
          :data="filteredItemArray"
          placeholder="e.g. Banana"
          @select="option => selected = option">
          <template slot="empty">No results found</template>
        </b-autocomplete>
      </b-field>

      <b-field label="Item *" v-if="isModify">
        <b-input
          placeholder="Item name"
          v-model="item.name"></b-input>
      </b-field>

      <b-field label="Count *">
          <b-input placeholder="Item count"
            type="number"
            v-model="item.count"></b-input>
      </b-field>

      <b-field label="Category">
          <b-select placeholder="Select a category"
            v-model="item.categoryId"
            v-bind:expanded=true
          >
          <option
              v-for="option in categories"
              :value="option.id"
              :key="option.id">
              {{ option.name }}
          </option>
          </b-select>
      </b-field>

      <b-notification :active.sync="isErrors" type="is-danger">
        Check your input.
      </b-notification>

      <b-notification :active.sync="isAddedSuccessfully"
        type="is-success" v-if="!isModify">
        Item added successfully.
      </b-notification>

      <button
        class="button is-primary is-default"
        @click.prevent="addItem" v-if="!isModify">
        Add item
      </button>

      <button
        class="button is-primary is-default"
        @click.prevent="modifyThisItem" v-if="isModify">
        Modify item
      </button>

      <button
        class="button is-primary is-danger"
        @click.prevent="removeThisItem" v-if="isModify">
        Remove item
      </button>
    </form>
    <b-loading :active.sync="wait" :canCancel="true"></b-loading>
  </section>
</template>

<script>

export default {
  data () {
    return {
      items: [
        'Apple',
        'Banana',
        'Cucumber',
        'Milk',
        'Pineapple'
      ],
      isErrors: false,
      isAddedSuccessfully: false,
      wait: false
    }
  },
  computed: {
    filteredItemArray () {
      return this.items.filter((option) => {
        let name = this.item.name ? this.item.name : ''
        return option
          .toString()
          .toLowerCase()
          .indexOf(name.toLowerCase()) >= 0
      })
    }
  },
  created () {
  },
  methods: {
    addItem (e) {
      let item = this.item
      if (item.name && item.count) {
        if (this.wait) {
          return
        }
        this.wait = true
        setTimeout(() => { this.wait = false }, 400)

        this.$emit('addNewItem', JSON.parse(JSON.stringify(this.item)))
        this.isErrors = false
        this.isAddedSuccessfully = true
        item.name = ''
        item.categoryId = null
        item.count = null
      } else {
        this.isErrors = true
        this.isAddedSuccessfully = false
      }
    },
    modifyThisItem (e) {
      this.$emit('modifyItem', this.item)
    },
    removeThisItem (e) {
      this.$emit('removeItem', this.item)
    }
  },
  props: {
    addNewItem: {
      type: Function
    },
    modifyItem: {
      type: Function
    },
    removeItem: {
      type: Function
    },
    item: {
      type: Object,
      default: () => {
        return {count: 1}
      }
    },
    categories: {
      type: Array,
      required: true
    },
    isModify: {
      type: Boolean
    }
  }
}
</script>
