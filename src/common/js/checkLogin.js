import {getCookie} from './utils'

export default function () {
    return decodeURIComponent(localStorage.getItem('isLogined')) == getCookie('token')
}
