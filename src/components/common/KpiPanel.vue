<template>
  <Panel
    class='custom-panel'
  >
    <Heading class='custom-panel-header' level='h4'>{{ panelHeader }}</Heading>
    <KpiCard
      v-for='card in cards'
      :key='card.label'
      :label='card.label'
      :values='card.values'
      :type='card.type'
      :positiveUp='card.positiveUp'
    />
  </Panel>
</template>

<script>
import KpiCard from './KpiCard.vue'

export default {
  name: 'KpiPanel',
  components: {
    KpiCard,
  },
  props: {
    panelHeader: String,
    cards: Array
  }
}
</script>

<style scoped lang='scss'>
@import '~@/styles/panels.scss';
</style>
