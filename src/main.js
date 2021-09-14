import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import DesignSystem from '@nosto/design-system'

import '@nosto/design-system/dist/system/fonts.min.css'
import '@nosto/design-system/dist/system/system.min.css'
import './styles/globals.scss'

import App from './App.vue'

Vue.use(VueCompositionAPI)
Vue.use(DesignSystem)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
