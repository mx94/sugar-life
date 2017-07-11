export const getters = {
    ctName(state) {
        return state.cityName
    },
    hasPsition(state) {
        return state.hasPos
    },
    psitions(state) {
        return state.positions
    },
    isOtherCity(state) {
        return state.isOtherCity
    },
    otherCityName(state) {
        return state.otherCityName
    }
}
