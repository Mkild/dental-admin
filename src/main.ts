import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './style/index.scss'
import './utils/rem'
import global from './utils/global'

const app = createApp(App)
const pinia = createPinia()
global(app)

app.use(router).use(pinia).mount('#app')
