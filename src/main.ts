import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import 'material-icons/iconfont/material-icons.css'
import './index.css'
import VueUploadComponent from 'vue-upload-component'
import { vue3Debounce } from 'vue-debounce'

import App from './App.vue'
import router from './router'

import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
import pl from '@/translations/pl'
import en from '@/translations/en'
import CartService from '@/stores/cartService'
import CountryService from '@/stores/CountryService'

//eslint-disable-next-line
const i18n = createI18n({
  locale: 'en',
  messages: {
    en: { ...en },
    pl: { ...pl },
  },
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.component('file-upload', VueUploadComponent)
app.component('v-select', vSelect)
app.directive('debounce', vue3Debounce({ lock: true }))

app.mount('#app')

//Initialize pinia stores
export const cartServices = new CartService()
export const countryServices = new CountryService()
