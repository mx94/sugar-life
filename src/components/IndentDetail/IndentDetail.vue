<template>
    <div>
        <mt-header title="订单详情" class="m-header">
            <span @click="$router.go(-1)" slot="left">
                <mt-button icon="back" name="back"></mt-button>
            </span>
        </mt-header>

        <div class="order-detail-con">
            <div class="con">
                <div class="serv-name">
                    <img src="http://avatar.csdn.net/C/B/D/1_u010014658.jpg">
                    <span>婴儿游泳</span>
                </div>
                <div class="order-item" style="border-top: 1px solid #f0f0f0">
                    <div>订单信息</div>
                </div>
                <div class="order-item">
                    <div class="label">订单号：</div>
                    <div class="value">222332121221</div>
                </div>
                <div class="order-item">
                    <div class="label">门店：</div>
                    <div class="value">母婴店（浦东南路店）</div>
                </div>
                <div class="order-item">
                    <div class="label">服务：</div>
                    <div class="value">婴儿洗澡</div>
                </div>
                <div class="order-item">
                    <div class="label">育婴师：</div>
                    <div class="value">向阳</div>
                </div>
                <div class="order-item">
                    <div class="label">数量：</div>
                    <div class="value">2</div>
                </div>
                <div class="order-item">
                    <div class="label">总价：</div>
                    <div class="value">200</div>
                </div>
                <div class="order-item">
                    <div>兑换券</div>
                </div>
                <div class="order-item">
                    <div class="label" style="flex: 3">券1：<span class="quan">22222222223</span></div>
                    <div class="value">已消费</div>
                </div>
                <div class="order-item">
                    <div class="label" style="flex: 3">券2：<span class="quan">22222222223</span></div>
                    <div class="value">已消费</div>
                </div>
                <div class="order-item">
                    <div>支付</div>
                </div>
                <div class="order-item">
                    <div class="label">支付方式：</div>
                    <div class="value">支付宝</div>
                </div>
                <div class="order-item">
                    <div class="label">下单时间：</div>
                    <div class="value">2016-10-09 12:00:00</div>
                </div>
                <div class="order-item">
                    <mt-button
                        class="back-btn"
                        type="primary"
                        @click="$router.push(`/refund/1`)"
                    >退款</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button"
    import MtHeader from "../../../node_modules/mint-ui/packages/header/src/header"
    import {baseURL} from '../../api/config'
    import {formatDate} from '../../common/js/utils'

    export default {
        created() {
            this.$http.get(`${baseURL}/wechat/order/${this.$route.params.id}`).then(res => {
                let result = res.body
                if (result.code == 200) {
                    console.log(result);
                } else {
                    console.log(result)
                }
            }).catch()
        },
        data () {
            return {
                info: {
                }
            }
        },
        components: {
            MtHeader,
            MtButton},
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable.styl"

    .m-header
        height 49px
        background-color $color-theme
        font-size 16px
    .order-detail-con
        width 100%
        padding 15px
        box-sizing border-box
        .con
            padding 15px 30px
            background-color #fff
            box-sizing border-box
            .serv-name
                display flex
                align-items center
                img
                    width 75px
                    height 75px
                    border-radius 50%
                span
                    color #333
                    font-size 16px
                    margin-left 10px
            .order-item
                display flex
                height 51px
                align-items center
                border-bottom 1px solid #f0f0f0
                color #333
                .label
                    font-size 14px
                    color #999
                    flex 1
                    .quan
                        color #6389cd
                .value
                    font-size 14px
                    color #333
                    display flex
                    flex 2
                    justify-content flex-end
                .back-btn
                    width 100%
                    height 40px
                    background-color #6389cd
                    border-radius 100px
</style>
