import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style/transition.styl'
import { Input, Button, Table } from 'ant-design-vue'

createApp(App)
  .use(router)
  .use(Input)
  .use(Button)
  .use(Table)
  .mount('#app')
