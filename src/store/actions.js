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

    // 切换城市
    [types.CHANGE_CITY]({commit}, city) {
        commit(types.CHANGE_CITY, city)
    }
}
