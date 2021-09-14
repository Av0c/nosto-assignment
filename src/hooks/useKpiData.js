import { fetchRawKpiData } from '../api'
import { ref, onMounted } from '@vue/composition-api'

export default function useKpiData() {
  const kpiData = ref({})

  const calculateKpiData = (rawKpiData) => {
    return {
      totalSales: {
        ...rawKpiData.totalSales,
        averageVisitValue: rawKpiData.totalSales.sales / rawKpiData.totalSales.visits,
        averageOrderValue: rawKpiData.totalSales.sales / rawKpiData.totalSales.orders,
        conversionPercent: rawKpiData.totalSales.orders * 100 / rawKpiData.totalSales.visits,
        recommendedPercentOfSoldItems:
          rawKpiData.totalSales.soldItemsThroughNosto * 100 / rawKpiData.totalSales.soldItems
      },
      potentialSales: {
        ...rawKpiData.potentialSales,
        cartsAbandonedPercent:
          rawKpiData.potentialSales.cartsAbandoned * 100 / rawKpiData.potentialSales.carts,
        averageAbandonedCartValue: 
          (rawKpiData.potentialSales.cartTotalValue -  rawKpiData.totalSales.sales)
            / rawKpiData.potentialSales.cartsAbandoned
      },
      sessionLifecycle: rawKpiData.sessionLifecycle
    }
  }

  const formatKpiData = (fullKpiData) => {
    return {
      totalSales: Object.fromEntries(
        Object.entries(fullKpiData.current.totalSales)
          .map(([key, value]) => {
            return [
              key,
              {
                current: value,
                previous: fullKpiData.previous.totalSales[key]
              }
            ]
          })
      ),
      potentialSales: Object.fromEntries(
        Object.entries(fullKpiData.current.potentialSales)
          .map(([key, value]) => {
            return [
              key,
              {
                current: value,
                previous: fullKpiData.previous.potentialSales[key]
              }
            ]
          })
      ),
      sessionLifecycle: Object.fromEntries(
        Object.entries(fullKpiData.current.sessionLifecycle)
          .map(([key, value]) => {
            return [
              key,
              {
                current: value,
                previous: fullKpiData.previous.sessionLifecycle[key]
              }
            ]
          })
      )
    }
  }

  const getKpiData = async () => {
    const result = await fetchRawKpiData()
    kpiData.value = formatKpiData({
      current: calculateKpiData(result.current),
      previous: calculateKpiData(result.previous),
    })
  }

  onMounted(getKpiData)

  return {
    kpiData,
    getKpiData
  }
}