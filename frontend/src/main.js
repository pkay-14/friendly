import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import Toast from 'vue-toastification';
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import 'vue-toastification/dist/index.css';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark'
  }
})

createApp(App)
    .use(router)
    .use(vuetify)
    .use(Toast)
    .mount('#app')
