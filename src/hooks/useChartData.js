import { fetchVisits } from '../api'
import { ref, onMounted } from '@vue/composition-api'

export default function useChartData() {
  const chartData = ref({})

  const getChartData = async () => {
    chartData.value = {
      feb: Object.values(await fetchVisits('feb')),
      march: Object.values(await fetchVisits('march'))
    }
  }

  onMounted(getChartData)

  return {
    chartData,
    getChartData
  }
}