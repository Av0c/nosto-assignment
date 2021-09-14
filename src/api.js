import CurrentKpiData from '@nosto/design-system/mock-data/site-metrics-kpis-march-2021.json' 
import PreviousKpiData from '@nosto/design-system/mock-data/site-metrics-kpis-feb-2021.json'
import VisitsFeb from '@nosto/design-system/mock-data/visits-feb-2021.json'
import VisitsMarch from '@nosto/design-system/mock-data/visits-march-2021.json'
import KpiPanelsLayout from './data/kpiPanelsLayout.json'

export const fetchRawKpiData = () => {
  // Using setTimeout to simulate API fetch
  return new Promise(
    (resolve) => {
      setTimeout(() => {
        // Good enough for a demo
        // May want to implement queries for the current/previous period in production
        resolve({
          current: CurrentKpiData,
          previous: PreviousKpiData
        })
      }, 100)
    }
  )
}

export const fetchKpiPanelsLayout = () => {
  return new Promise(
    (resolve) => {
      setTimeout(() => {
        resolve(KpiPanelsLayout)
      }, 100)
    }
  )
}

export const fetchVisits = (period) => {
  return new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        // Simulate period query 
        switch (period) {
          case 'feb':
            resolve(VisitsFeb)
            break;
          case 'march':
            resolve(VisitsMarch)
            break;

          default:
            reject('Unvalid period query')
            break;
        }
      }, 100)
    }
  )
}