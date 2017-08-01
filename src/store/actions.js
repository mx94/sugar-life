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
    },

    // 与当前定位城市是否相同
    [types.IS_OTHER_CITY]({commit}, flag) {
        commit(types.IS_OTHER_CITY, flag)
    },

    // 一进来全局设置定位的当前城市
    [types.HELLO_WORLD]({commit}, firstCity) {
        commit(types.HELLO_WORLD, firstCity)
    }
}
