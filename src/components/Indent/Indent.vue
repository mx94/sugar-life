<template>
    <div style="height: 100%">
        <mt-header title="我的订单" class="m-header">
            <span @click="$router.go(-1)" slot="left">
                <mt-button icon="back" name="back"></mt-button>
            </span>
        </mt-header>
        <router-link :to="`/indentdetail/${info.id}`" tag="div" class="order" v-for="info in infos" :key="info.id">
            <div class="title">{{info.storeName}}</div>
            <div class="order-con">
                <div class="img-con">
                    <img :src="info.logo" />
                </div>
                <div class="info">
                    <div class="serv-name">{{info.serviceName}}</div>
                    <div class="count">数量：{{info.buyNumber}}</div>
                    <div class="other">
                        <div class="price">总价：{{info.totalPrice}}</div>
                        <div class="create-time">{{info.orderCreateTime}}</div>
                    </div>
                </div>
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
    import {formatDate} from '../../common/js/utils'

    export default {
        created() {
            this.$http.get(`${baseURL}/wechat/order?limit=10&page=1&offset=0&orderCreateId=${this.$route.params.id}`).then(res => {
                let result = res.body
                if (result.code == 200) {
                    result.data.items.forEach(item => {
                        let {
                            id,
                            storeName,
                            serviceName,
                            buyNumber,
                            totalPrice,
                            orderCreateTime,
                            serviceImageList
                        } = item
                        this.infos.push({
                            id,
                            storeName,
                            serviceName,
                            buyNumber,
                            totalPrice,
                            orderCreateTime: formatDate(new Date(orderCreateTime)),
                            logo: 'http://avatar.csdn.net/C/B/D/1_u010014658.jpg'
                        })
                    })
                }
            }).catch()
        },
        data () {
            return {
                infos: []
            }
        },
        components: {
            MtHeader,
            MtButton,
            DTooltip
        },
        methods: {}
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
