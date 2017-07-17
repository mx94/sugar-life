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
                    <img :src="infos.photo">
                    <span>{{infos.serviceName}}</span>
                </div>
                <div class="order-item" style="border-top: 1px solid #f0f0f0">
                    <div>订单信息</div>
                </div>
                <div class="order-item">
                    <div class="label">订单号：</div>
                    <div class="value">{{infos.id}}</div>
                </div>
                <div class="order-item">
                    <div class="label">门店：</div>
                    <div class="value">{{infos.storeName}}</div>
                </div>
                <div class="order-item">
                    <div class="label">服务：</div>
                    <div class="value">{{infos.serviceName}}</div>
                </div>
                <div class="order-item" v-show="infos.nurseryTeacherName">
                    <div class="label">育婴师：</div>
                    <div class="value">{{infos.nurseryTeacherName}}</div>
                </div>
                <div class="order-item">
                    <div class="label">数量：</div>
                    <div class="value">{{infos.buyNumber}}</div>
                </div>
                <div class="order-item">
                    <div class="label">总价：</div>
                    <div class="value">{{infos.totalPrice}}</div>
                </div>
                <div class="order-item">
                    <div>兑换券</div>
                </div>

                <div class="order-item" v-for="(quan, idx) in infos.voucherList" :key="idx">
                    <div class="label" style="flex: 3">券{{idx + 1}}：<span class="quan">{{quan.id}}</span></div>
                    <div v-if="quan.voucherUseStatus === 'UN_SPEND'" class="value">待消费</div>
                    <div v-if="quan.voucherUseStatus === 'SPEND_SUCCESS'" class="value">消费成功</div>
                    <div v-if="quan.voucherUseStatus === 'REFUNDING'" class="value">退款中</div>
                    <div v-if="quan.voucherUseStatus === 'REFUND_SUCCESS'" class="value">退款成功</div>
                </div>

                <div class="order-item">
                    <div>支付</div>
                </div>
                <div class="order-item">
                    <div class="label">支付方式：</div>
                    <div class="value" v-if="infos.payType === 'BABY_GOLD'">宝币</div>
                    <div class="value" v-if="infos.payType === 'ALIPAY'">支付宝</div>
                    <div class="value" v-if="infos.payType === 'WECHAT'">微信</div>
                    <div class="value" v-if="infos.payType === 'WECHAT_PUB'">微信公众号</div>
                    <div class="value" v-if="infos.payType === 'unknow'">取消付款</div>
                </div>
                <div class="order-item">
                    <div class="label">下单时间：</div>
                    <div class="value">{{infos.createTime}}</div>
                </div>
                <div class="order-item" v-if="this.refundFlag">
                    <mt-button
                        class="back-btn"
                        type="primary"
                        @click="$router.push(`/refund/${infos.id}`)"
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
        mounted() {
            this._getData()
        },
        data () {
            return {
                infos: {
                },
                refundFlag: false
            }
        },
        components: {
            MtHeader,
            MtButton},
        methods: {
            _getData() {
                this.$http.get(`${baseURL}/wechat/order/${this.$route.params.id}`).then(res => {
                    let result = res.body
                    if (result.code == 200) {
                        let {
                            serviceImageList,
                            serviceName,
                            id,
                            storeName,
                            nurseryTeacherName,
                            buyNumber,
                            totalPrice,
                            payType,
                            createTime,
                            voucherList,
                            orderStatusText
                        } = result.data;
                        this.refundFlag = voucherList.find(item => item.voucherUseStatus === 'UN_SPEND');
                        this.infos = {
                            serviceImageList,
                            serviceName,
                            id,
                            storeName,
                            nurseryTeacherName,
                            buyNumber,
                            totalPrice,
                            payType,
                            createTime: formatDate(new Date(createTime)),
                            voucherList,
                            orderStatusText,
                            photo: serviceImageList[0]['imagePath']
                        }
                    } else {
                        console.log(result)
                    }
                }).catch()
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
