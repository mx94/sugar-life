import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    positions: {
        longitude: '121.48',
        latitude: '31.22'
    },
    hasPos: false,
    cityName: '上海'
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
