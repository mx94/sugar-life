import Vue from 'vue'
import Vuex from 'vuex'
import {getCookie} from '../common/js/utils'

Vue.use(Vuex)

const state = {
    positions: {
        longitude: getCookie('lon') || '',
        latitude: getCookie('lat') || ''
    },
    hasPos: localStorage.getItem('city') || false,
    cityName: localStorage.getItem('city'),
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
