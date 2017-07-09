<template>
    <div style="height: 100%">
        <mt-header title="申请退款" class="m-header">
            <span @click="$router.go(-1)" slot="left">
                <mt-button icon="back" name="back"></mt-button>
            </span>
        </mt-header>

        <div class="order-detail-con">
            <div class="con">
                <div class="serv-name">
                    <img src="http://avatar.csdn.net/C/B/D/1_u010014658.jpg">
                    <div class="title-info">
                        <span>婴儿生活馆（浦东南路店）</span>
                        <span>婴儿游泳</span>
                    </div>
                </div>
                <div class="order-item" style="border-top: 1px solid #f0f0f0; margin-top: 10px">
                    <div class="label">退款数量：</div>
                    <div class="value" style="flex: 1">
                        <mt-button type="default" size="small" @click="mini">-</mt-button>
                        <input v-model="info.count" type="number" class="mint-field-core count" readonly>
                        <mt-button type="default" size="small" @click="sum">+</mt-button>
                    </div>
                </div>
                <div class="order-item">
                    <div class="label">退款金额：</div>
                    <div class="value">￥{{total}}</div>
                </div>
                <div class="order-item">
                    <div class="label">退款方式：</div>
                    <div class="value">原路退回（1-7个工作日内退款到原支付方）</div>
                </div>
            </div>
        </div>
        <div class="refund-con">
            <mt-button type="primary" size="small" class="btn-refund" @click="confirmIt">申请退款</mt-button>
        </div>
    </div>
</template>
<script>
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button";
    import MtHeader from "../../../node_modules/mint-ui/packages/header/src/header";
    import MessageBox from "mint-ui/packages/message-box"

    export default {
        computed: {
            total() {
                return parseFloat(this.info.count) * parseFloat(this.info.unitPrice)
            }
        },
        data () {
            return {
                info: {
                    count: '1',
                    unitPrice: 200
                }
            }
        },
        components: {
            MtHeader,
            MtButton
        },
        methods: {
            mini() {
                if (this.info.count <= 1) return
                this.info.count--
            },
            sum() {
                this.info.count++
            },
            confirmIt() {
                MessageBox.confirm('请下载APP，进行退款操作').then(action => {
                    this.$router.push('/download')
                }, cancel => {});
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
    .order-detail-con
        width 100%
        height calc(100% - 51px)
        padding 15px
        box-sizing border-box
        .con
            padding 15px 30px
            background-color #fff
            box-sizing border-box
            font-size 12px
            height 100%
            .serv-name
                display flex
                align-items center
                img
                    width 75px
                    height 75px
                    border-radius 50%
                .title-info
                    display flex
                    flex-direction column
                    span
                        flex 1
                        color #333
                        margin-left 10px
                        line-height 1.5
            .order-item
                display flex
                height 45px
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
                    .count
                        text-align center
                        background-color #f0f0f0
    .refund-con
        position: fixed
        bottom 0
        width 100%
        height 65px
        line-height 65px
        display flex
        justify-content space-between
        align-items center
        background-color #fff
        box-shadow: -4px 2px 13px 0px rgba(180, 180, 180, .5)
        padding 0 15px
        box-sizing border-box
        .btn-refund
            background-color #6389cd
            border-radius 100px
            width 100%
            height 40px
            font-size 16px
</style>
