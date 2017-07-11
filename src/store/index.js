import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    positions: {
        longitude: '121.48',
        latitude: '31.22'
    },
    hasPos: localStorage.getItem('city') || false,
    cityName: localStorage.getItem('city') || '上海市',
    isOtherCity: false,
    otherCityName: ''
}

import {actions} from './actions';
import {mutations} from './mutations';
import {getters} from './getters';
export const store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters
});
