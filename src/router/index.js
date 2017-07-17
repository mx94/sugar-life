import Vue from 'vue'
import Router from 'vue-router'
import { Indicator } from 'mint-ui';

const Main = resolve => {
    Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
    });
    require.ensure(['@/components/Main/Main'], () => {
        resolve(require('@/components/Main/Main'))
        Indicator.close()
    })
}
const Sellers = resolve => require(['@/components/Sellers/Sellers'], resolve)
const Indent = resolve => require(['@/components/Indent/Indent'], resolve)
const IndentDetail = resolve => require(['@/components/IndentDetail/IndentDetail'], resolve)
const Refund = resolve => require(['@/components/Refund/Refund'], resolve)
const Mine = resolve => require(['@/components/Mine/Mine'], resolve)
const Register = resolve => require(['@/components/Mine/Register'], resolve)
const ChangePassword = resolve => require(['@/components/Mine/ChangePassword'], resolve)
const Changename = resolve => require(['@/components/Mine/Changename'], resolve)
const Profile = resolve => require(['@/components/Mine/Profile'], resolve)
const Detail = resolve => {
    Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
    });
    require.ensure(['@/components/Detail/Detail'], () => {
        resolve(require('@/components/Detail/Detail'))
        Indicator.close()
    })
}

const Service = resolve => require(['@/components/Service/Service'], resolve)
const Baby = resolve => require(['@/components/Baby/Baby'], resolve)
const BabyDetail = resolve => require(['@/components/BabyDetail/BabyDetail'], resolve)
const PayDetail = resolve => require(['@/components/PayDetail/PayDetail'], resolve)
const Pay = resolve => require(['@/components/Pay/Pay'], resolve)
const PaySuccess = resolve => require(['@/components/Pay/PaySuccess'], resolve)
const PayFail = resolve => require(['@/components/Pay/PayFail'], resolve)
const CitySelect = resolve => require(['@/components/CitySelect/CitySelect'], resolve)
const Download = resolve => require(['@/components/Download/Download'], resolve)

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
            path: '/indentdetail/:id',
            component: IndentDetail
        },
        {
            path: '/refund/:id',
            component: Refund
        },
        {
            path: '/mine/:storeId',
            component: Mine
        },
        {
            path: '/changepassword',
            component: ChangePassword
        },
        {
            path: '/changename',
            component: Changename
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
            path: '/pay/:id',
            component: Pay
        },
        {
            path: '/paysuccess/:storeId/:orderId',
            component: PaySuccess
        },
        {
            path: '/payfail/:id',
            component: PayFail
        },
        {
            path: '/babydetail/:id',
            component: BabyDetail
        },
        {
            path: '/cityselect',
            component: CitySelect
        },
        {
            path: '/download',
            component: Download
        }
    ]
})
