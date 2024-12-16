import './assets/base.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import Vue3TouchEvents, { type Vue3TouchEventsOptions } from "vue3-touch-events";

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
  
app.use<Vue3TouchEventsOptions>(Vue3TouchEvents, {
  disableClick: false
  // any other global options...
});

app.mount('#app')
