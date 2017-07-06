import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main/Main'
import Sellers from '@/components/Sellers/Sellers'
import Indent from '@/components/Indent/Indent'
import Mine from '@/components/Mine/Mine'
import Register from '@/components/Mine/Register'
import ChangePassword from '@/components/Mine/ChangePassword'
import Profile from '@/components/Mine/Profile'
import Detail from '@/components/Detail/Detail'
import Service from '@/components/Service/Service'
import Baby from '@/components/Baby/Baby'
import BabyDetail from '@/components/BabyDetail/BabyDetail'
import PayDetail from '@/components/PayDetail/PayDetail'
import Pay from '@/components/Pay/Pay'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            component: Main
        },
        {
            path: '/indent',
            component: Indent
        },
        {
            path: '/mine',
            component: Mine
        },
        {
            path: '/changepassword',
            component: ChangePassword
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/profile',
            component: Profile
        },
        {
            path: '/sellers/:serviceTypeId',
            component: Sellers
        },
        {
            path: '/detail/:id',
            component: Detail,
            children: [

                {
                    path: 'service',
                    component: Service,
                },
                {
                    path: 'baby',
                    component: Baby
                },
            ]
        },
        {
            path: '/paydetail/:id',
            component: PayDetail
        },
        {
            path: '/pay',
            component: Pay
        },
        {
            path: '/babydetail/:id',
            component: BabyDetail
        },
    ]
})
