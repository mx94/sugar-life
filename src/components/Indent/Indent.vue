<template>
    <div style="height: 100%">
        <mt-header title="我的订单" class="m-header">
            <span @click="$router.push('/')" slot="left">
                <mt-button icon="back" name="back"></mt-button>
            </span>
        </mt-header>
        <router-link :to="`/indentdetail/${info.id}`" tag="div" class="order" v-for="info in infos" :key="info.id">
            <div class="title">{{info.storeName}}</div>
            <div class="order-con">
                <div class="img-con">
                    <img :src="info.logo"/>
                </div>
                <div class="info">
                    <div class="serv-name">{{info.serviceName}}</div>
                    <div class="count">数量：{{info.buyNumber}}</div>
                    <div class="other">
                        <div class="price">总价：{{info.totalPrice}}</div>
                        <div class="create-time">{{info.createTime}}</div>
                    </div>
                </div>
                <mt-button v-show="info.orderStatus === 'WAITING_FOR_PAY'" type="primary" size="small" class="pay-btn" :plain="true" @click.stop="jumpToPay(info.serviceId)">付款</mt-button>
            </div>
        </router-link>

        <d-tooltip></d-tooltip>
    </div>
</template>
<script>
    import MtHeader from "../../../node_modules/mint-ui/packages/header/src/header";
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button";
    import DTooltip from '../../components/DTooltip/DTooltip.vue'
    import {baseURL} from '../../api/config'
    import {formatDate, getCookie} from '../../common/js/utils'

    export default {
        beforeRouteEnter(to, from, next) {
            if (getCookie('token')) {
                next(vm => {
                    vm.$http.get(`${baseURL}/app/profile`).then(res => {
                        if (res.body.code == 200) {
                            vm.userId = res.body.data.userId
                        }
                    })
                })
            } else {
                next({path: '/mine/0'})
            }
        },
        watch: {
            userId(val, old) {
                if (val) {
                    this.$http.get(`${baseURL}/wechat/order?limit=10&page=1&offset=0&orderCreateId=${val}`).then(res => {
                        let result = res.body
                        if (result.code == 200) {
                            result.data.items.forEach(item => {
                                let {
                                    id,
                                    storeId,
                                    storeName,
                                    serviceId,
                                    serviceName,
                                    buyNumber,
                                    totalPrice,
                                    orderCreateTime,
                                    orderStatus,
                                    serviceImageList,
                                    createTime
                                } = item
                                this.infos.push({
                                    id,
                                    storeId,
                                    storeName,
                                    serviceId,
                                    serviceName,
                                    buyNumber,
                                    totalPrice,
                                    orderStatus,
                                    createTime: formatDate(new Date(createTime)),
                                    logo: serviceImageList[0]['imagePath']
                                })
                            })
                        }
                    }).catch()
                }
            }
        },
        data () {
            return {
                infos: [],
                userId: null
            }
        },
        components: {
            MtHeader,
            MtButton,
            DTooltip
        },
        methods: {
            jumpToPay(id) {
                this.$router.push(`/pay/${id}`)
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable.styl"

    .m-header
        height 49px
        background-color $color-theme
        font-size 16px

    .order
        width 100%
        padding 15px
        box-sizing border-box
        border-bottom 1px solid #ededed
        background-color #fff
        .title
            font-size 16px
            color #333
            height 40px
            line-height 40px
        .order-con
            display flex
            align-items center
            position relative
            .pay-btn
                position absolute
                top 0
                right 0
                width 75px
                height 30px
                border-radius 100px
                border-color #6389cd
            .img-con
                width 75px
                height 75px
                img
                    width 100%
                    height 100%
                    border-radius 50%
                    border none
                    vertical-align top
            .info
                flex-direction column
                display flex
                width calc(100% - 85px)
                height 75px
                margin-left 10px
            .serv-name
                display flex
                align-items center
                flex 1
                font-size 16px
                color #333
            .count
                display flex
                align-items center
                flex 1
                font-size 12px
                color #666
            .other
                display flex
                align-items center
                flex 1
                display flex
                justify-content space-around
                font-size 12px
                .price
                    flex 1
                    color #ff6743
                .create-time
                    display flex
                    justify-content flex-end
                    flex 2
                    color #999
</style>
