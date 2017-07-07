import * as types from './types'

export const actions = {
    // 获取经纬度
    [types.SET_POSITION]({commit}, positions) {
        commit(types.SET_POSITION, positions)
    },

    // 是否定位
    [types.HAS_POSITION]({commit}, flag) {
        commit(types.HAS_POSITION, flag)
    },

    // 城市名称
    [types.CITY_NAME]({commit}, city) {
        commit(types.HAS_POSITION, city)
    },
}
