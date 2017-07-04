import Vue from 'vue'
import Router from 'vue-router'
import HomeHeader from '@/components/HomeHeader/HomeHeader'
import Main from '@/components/Main/Main'
import Sellers from '@/components/Sellers/Sellers'
import Indent from '@/components/Indent/Indent'
import Mine from '@/components/Mine/Mine'
import Detail from '@/components/Detail/Detail'
import Service from '@/components/Service/Service'
import Baby from '@/components/Baby/Baby'
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
            path: '/sellers',
            component: Sellers
        },
        {
            path: '/detail',
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
            path: '/paydetail',
            component: PayDetail
        },
        {
            path: '/pay',
            component: Pay
        }
    ]
})
