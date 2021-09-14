<template>
  <LineChart
    class='chart'
    :categories='categories'
    :series='series'
  />
</template>

<script>

export default {
  name: 'CustomLineChart',
  props: {
    // label: String,
    values: {
      type: Object
      /**
        @type {
          [period]: Array<String | Number>
        }
      */
    },
    metric: {
      type: String
    }
  },
  computed: {
    series: function() {
      /**
        @type Array<{
          name: String,
          data: Array<String | Number>
        }>
      */
      return Object.entries(this.values).map(
        ([key, value]) => {
          return {
            name: `${this.metric} (${key})`,
            data: value,
            styles: {
            }
          }
        }
      )
    },
    categories: function() {
      // Since month select is not implemented, day numbers is hard-coded at 31
      return [...Array(31).keys()].map(x => x+1)
    }
  }
}
</script>

<style scoped lang='scss'>
.chart {
  width: 100%;

  &::v-deep g.dots .dot { // Using deep selector to reach within internal stylings
    display: none;

    &.active {
      display: inherit;
    }
  }
}
</style>

