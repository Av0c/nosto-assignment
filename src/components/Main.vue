<template>
    <layout>
      <heading level='h3'>Site Metrics</heading>
      <tabs variation='underline'>
        <tab title='March Report'>
          <div class='tab-header'>
            Your storewide performance for March 2021
          </div>
          <div v-if='kpiPanelsLayout && panels.length > 0 && kpiData'>
            <KpiPanel
              v-for='panel in panels.slice(0,1)'
              :key='panel.panelHeader'
              :panelHeader='panel.panelHeader'
              :cards='panel.cards'
            />
            <ChartPanel
              :chartData='chartData'
            />
            <KpiPanel
              v-for='panel in panels.slice(1)'
              :key='panel.panelHeader'
              :panelHeader='panel.panelHeader'
              :cards='panel.cards'
            />
          </div>
        </tab>
        <tab title='Detail'>
          No Details Available
        </tab>
      </tabs>
    </layout>
</template>

<script>
import KpiPanel from './common/KpiPanel.vue'
import ChartPanel from './common/ChartPanel.vue'
import useKpiData from '@/hooks/useKpiData'
import useKpiPanelsLayout from '@/hooks/useKpiPanelsLayout'
import useChartData from '@/hooks/useChartData'
import { computed } from '@vue/composition-api'

export default {
  name: 'Main',
  data() {
    return {
      chartMetric: 'visits'
    }
  },
  components: {
    ChartPanel,
    KpiPanel
  },
  setup() {
    const { kpiData } = useKpiData()
    const { kpiPanelsLayout } = useKpiPanelsLayout()
    const { chartData } = useChartData()

    const panels = computed(() => {
      // Build panels rendering array from layout data and kpi data

      if (!kpiPanelsLayout.value || !kpiData.value) {
        return []
      }

      return kpiPanelsLayout.value.map(
        panel => {
          return {
            panelHeader: panel.panelHeader,
            cards: panel.cards.map(
              card => {
                return {
                  ...card,
                  values: eval('kpiData.value' + card.valuesAccessor)
                }
              }
            )
          }
        }
      )
    })

    return {
      kpiPanelsLayout,
      kpiData,
      panels,
      chartData
    }
  }
}
</script>

<style scoped lang='scss'>
.tab-header {
  margin-top: 32px;
  margin-bottom: 24px;
}
</style>
