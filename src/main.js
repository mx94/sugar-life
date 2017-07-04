// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Header, Button, Field, Radio } from 'mint-ui'
import 'mint-ui/lib/style.min.css'
import './common/stylus/index.styl'

Vue.use(Header)
Vue.use(Button)
Vue.use(Field)
Vue.use(Radio)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    ...App
})
