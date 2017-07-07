import * as types from './types'

export const mutations = {
    [types.SET_POSITION](state, positions) {
        state.positions = positions
    },

    [types.HAS_POSITION](state, flag) {
        state.hasPos = flag
    },

    [types.CITY_NAME](state, city) {
        state.cityName = city
    }
}
