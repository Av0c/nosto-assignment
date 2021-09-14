import { fetchKpiPanelsLayout } from '../api'
import { ref, onMounted } from '@vue/composition-api'

export default function useKpiPanelsLayout() {
  const kpiPanelsLayout = ref([])

  const getKpiPanelsLayout = async () => {
    kpiPanelsLayout.value = await fetchKpiPanelsLayout()
  }

  onMounted(getKpiPanelsLayout)

  return {
    kpiPanelsLayout,
    getKpiPanelsLayout
  }
}