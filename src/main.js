// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
var Promise = require('es6-promise').Promise
import App from './App.vue'
import router from './router'
import VueResource from 'vue-resource'
import AMap from 'vue-amap'
import fastclick from 'fastclick'
import { Header, Button, Field, Radio, Cell } from 'mint-ui'
import { store } from './store/index'
import 'mint-ui/lib/style.min.css'
import './common/stylus/index.styl'

fastclick.attach(document.body)

Vue.use(VueResource)
Vue.use(Header)
Vue.use(Button)
Vue.use(Field)
Vue.use(Radio)
Vue.use(Cell)
Vue.use(AMap)
AMap.initAMapApiLoader({
    key: '114b7baa5c86583475e6c416e0207eda',
    plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType']
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    ...App,
    store
})
