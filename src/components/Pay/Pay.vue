<template>
    <div>
        <mt-header title="提交订单" class="m-header-pay">
            <span @click="$router.go(-1)" slot="left">
                <mt-button icon="back" name="back"></mt-button>
            </span>
        </mt-header>

        <div class="pay-form">
            <mt-field label="门店名称：" :readonly="true" v-model="info.storeName"></mt-field>
            <mt-field label="服务项目：" :readonly="true" v-model="info.serviceName"></mt-field>

            <a class="mint-cell mint-field">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                    <div class="mint-cell-title"><span class="mint-cell-text">数量：</span></div>
                    <div class="mint-cell-value">
                        <mt-button type="default" size="small" @click="mini">-</mt-button>
                        <input placeholder="请输入数字" number="true" type="number" class="mint-field-core count"
                               v-model="other.count" disabled="disabled">
                        <mt-button type="default" size="small" @click="sum">+</mt-button>
                    </div>
                </div>
            </a>

            <mt-field label="服务单价：" :readonly="true" v-model="info.unitPrice"></mt-field>
            <mt-field label="绑定手机号：" :readonly="true" v-model="other.phoneNumber"></mt-field>
            <mt-field label="订单时间：" :readonly="true" v-model="other.orderTime"></mt-field>

            <a class="mint-cell mint-field"
               style="padding-bottom: 50px; background-image: none; border-bottom: 1px dotted #ffeb93">
                <div class="mint-cell-wrapper" style="position: relative; background-image: none">
                    <div class="mint-cell-title"><span class="mint-cell-text"><i class="icon-wechat"></i><span
                        class="wechat-text">微信支付</span></span></div>
                    <div class="mint-cell-value">
                        <mt-radio
                            align="right"
                            v-model="other.wechat"
                            :options="['']">
                        </mt-radio>
                    </div>
                </div>
            </a>
        </div>

        <div class="pay-form-submit">
            <span>￥{{ total }}</span>
            <mt-button type="primary" size="small" class="btn-pay" @click="payIt">支付</mt-button>
        </div>
    </div>
</template>
<script>
    import MtHeader from "../../../node_modules/mint-ui/packages/header/src/header";
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button";
    import MtField from "../../../node_modules/mint-ui/packages/field/src/field";
    import MtRadio from "../../../node_modules/mint-ui/packages/radio/src/radio";
    import {baseURL} from '../../api/config'
    import {formatDate, getCookie, randomWord} from '../../common/js/utils'

    export default {
        beforeRouteEnter(to, from, next) {
            if (getCookie('token')) {
                next()
            } else {
                next('/mine')
            }
        },
        created() {
            this.$http.get(`${baseURL}/wechat/storeService/${this.$route.params.id}`).then(res => {
                let result = res.body;
                if (result.code == 200) {
                    console.log(result.data);
                    let {
                        id,
                        storeId,
                        storeName,
                        unitPrice,
                        serviceName,
                        memberPrice
                    } = result.data;
                    this.info = {
                        id,
                        storeId,
                        storeName,
                        unitPrice,
                        serviceName,
                        memberPrice
                    };
                    this.$http.get(`${baseURL}/app/profile`).then(res => {
                        if (res.body.code == 200) {
                            this.other = {
                                orderTime: formatDate(new Date()),
                                count: 1,
                                wechat: '',
                                phoneNumber: res.body.data.cellphone
                            }
                        }
                    })
                }
            }).catch();
        },
        computed: {
            total() {
                return (Math.floor(parseFloat(this.info.unitPrice) * this.other.count * 100) / 100).toFixed(2)
            },
            memberTotal() {
                return (Math.floor(parseFloat(this.info.memberPrice) * this.other.count * 100) / 100).toFixed(2)
            }
        },
        data () {
            return {
                info: {},
                other: {}
            }
        },
        components: {
            MtRadio,
            MtField,
            MtButton,
            MtHeader
        },
        methods: {
            payIt() {
                this.$http.post(`${baseURL}/wechat/order`, {
                    storeId: this.info.storeId,
                    serviceId: this.info.id,
                    serviceName: this.info.serviceName,
                    buyNumber: this.other.count,
                    unitPrice: this.info.unitPrice,
                    memberPrice: this.info.memberPrice,
                    totalPrice: this.total,
                    cellphone: this.other.phoneNumber,
                    memberTotalPrice: this.memberTotal,
                    buyType: 'SERVICE'
                }).then(res => {
                    if (res.body.code == 200) {
                        let order_no = res.body.data.id;
                        this.$http.post(`${baseURL}/app/pay`, {
                            order_no: `FW${order_no}`,
                            channel: 'wx_pub',
                            amount: this.total,
                            openId: sessionStorage.getItem('openId') || 'ohi2TwdIUr4G10TnNSfiNWW2QMXg'
                        }).then(res => {
                            // 唤起微信支付
                            let result = res.body.data
                            console.log(result);

//                            let flag = confirm('支付成功？')
//                            if (flag) {
//                                this.$router.replace('/paysuccess/' + this.info.storeId)
//                            } else {
//                                this.$router.replace('/payfail/' + this.info.storeId)
//                            }

                            if (res.body.code == 200) {
                                let wx_data = result.credential.wx;

                                function onBridgeReady() {
                                    alert('准备支付');
                                    WeixinJSBridge.invoke(
                                        'getBrandWCPayRequest', {
                                            "appId": wx_data.appid,     //公众号名称，由商户传入
                                            "timeStamp": wx_data.timestamp,         //时间戳，自1970年以来的秒数
                                            "nonceStr": wx_data.noncestr, //随机串
                                            "package": wx_data.package,
                                            "signType": wx_data.signType,         //微信签名方式：
                                            "paySign": wx_data.paySign //微信签名
                                        },
                                        function (res) {
                                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                                                // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回 ok，但并不保证它绝对可靠
                                                this.$router.replace('/paysuccess/' + this.info.storeId)
                                            } else {
                                                this.$router.replace('/payfail/' + this.info.storeId)
                                            }
                                        }
                                    );
                                }

                                if (typeof WeixinJSBridge == "undefined") {
                                    alert('不在微信环境')
                                    if (document.addEventListener) {
                                        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                                    } else if (document.attachEvent) {
                                        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                                        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                                    }
                                } else {
                                    onBridgeReady();
                                }
                            }

                        }).catch(e => console.log(e))
                    }
                }).catch(e => console.log(e))


            },
            mini() {
                if (this.other.count <= 1) return
                this.other.count--
            },
            sum() {
                this.other.count++
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .m-header-pay
        height 49px
        background-color #6389cd !important
        font-size 16px

    .pay-form
        margin 15px 15px 0 15px
        padding 0 20px
        background-color #fff
        font-size 14px
        .mint-cell-text
            font-size 12px
            color #999
        .mint-field-core
            font-size 12px
            color #333
            text-align right
        .count
            text-align center
            background-color #f0f0f0
        .mint-cell
            &:nth-child(6)
                border-bottom 2px dotted #FFEB93
            &:nth-child(7)
                border-bottom none
                .mint-cell-value
                    justify-content flex-end
                    .mint-cell
                        background-image none
                        .mint-cell-wrapper
                            background-image none
        .icon-wechat
            display inline-block
            width 22px
            height 22px
            background-image url("./icon_WeChatPay@3x.png")
            background-repeat no-repeat
            background-size 22px 22px
        .wechat-text
            position: absolute;
            bottom: 23px;
            left: 40px;
            font-size 12px
            color #333

    .pay-form-submit
        margin 0 15px
        height 90px
        line-height 90px
        background-color #fff
        display flex
        justify-content space-between
        align-items center
        background-color #fff
        span
            margin-left 15px
            color #ff6743
            font-size 18px
        .btn-pay
            background-color #6389cd
            border-radius 100px
            margin-right 15px
            width 150px
</style>
