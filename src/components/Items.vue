<template>
  <section>
    <b-table
      :data="items"
      v-bind:paginated=true
      v-bind:narrowed=true
      v-bind:pagination-simple=true
      v-bind:mobile-cards=false
      :per-page=10
      default-sort-direction="asc"
      default-sort="item.name">

      <template slot-scope="props">
        <b-table-column field="item.count" label="Count" centered>
            {{ props.row.item.count }}
        </b-table-column>

        <b-table-column field="item.name" label="Name" sortable>
            <a href=""
              @click.prevent="modify($event, props.row.item.timestamp)">
              {{ props.row.item.name }}</a>
        </b-table-column>

        <b-table-column field="item.categoryId" label="Category" sortable>
            {{ categoryName(props.row.item.categoryId) }}
        </b-table-column>
      </template>
    </b-table>
  </section>
</template>

<script>
  export default {
    props: {
      items: {
        type: Array,
        required: true
      },
      categories: {
        type: Array,
        required: true
      },
      modifyItem: {
        type: Function
      }
    },
    methods: {
      categoryName (id) {
        return id ? this.categories.find(x => x.id === id).name : ''
      },
      modify (e, id) {
        this.$emit('modifyItem', id)
      }
    }
  }
</script>
