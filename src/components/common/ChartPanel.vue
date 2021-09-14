<template>
  <Panel
    class='custom-panel'
  >
    <div class='custom-panel-header'>
      <Heading level='h4'>{{ 'Graph View' }}</Heading>
      <Tag class='chart-period'>
        1 Mar, 2021 - 31 Mar, 2021
      </Tag>
    </div>
    <div class='custom-panel-subheading'>
      <select v-model='chartMetric' class='select-input chart-metric-selector'>
        <option value='visits'>Visits</option>
        <option value='other'>Other</option>
      </select>
    </div>
    <CustomLineChart
      :values='chartData'
      :metric='chartMetric'
    />
  </Panel>
</template>

<script>
import CustomLineChart from './CustomLineChart.vue'

export default {
  name: 'ChartPanel',
  components: {
    CustomLineChart
  },
  data() {
    return {
      chartMetric: 'visits'
    }
  },
  props: {
    chartData: Object
  }
}
</script>

<style scoped lang='scss'>
@import '~@/styles/panels.scss';
</style>
