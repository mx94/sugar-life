import * as types from './types'

export const mutations = {
    [types.SET_POSITION](state, positions) {
        state.positions = positions
    },

    [types.HAS_POSITION](state, flag) {
        state.hasPos = flag
    },

    [types.CHANGE_CITY](state, city) {
        state.otherCityName = city
    },

    [types.IS_OTHER_CITY](state, flag) {
        state.isOtherCity = flag
    },

    [types.HELLO_WORLD](state, firstCity) {
        state.cityName = firstCity
    }
}
