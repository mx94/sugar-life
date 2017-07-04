<template>
    <div>
        <mt-header title="提交订单" class="m-header">
            <span @click="$router.go(-1)" slot="left">
                <mt-button icon="back" name="back"></mt-button>
            </span>
        </mt-header>

        <div class="pay-form">
            <mt-field label="门店名称：" :readonly="true" v-model="sellersName"></mt-field>
            <mt-field label="服务项目：" :readonly="true" v-model="serviceName"></mt-field>

            <a class="mint-cell mint-field">
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                    <div class="mint-cell-title"><span class="mint-cell-text">数量：</span></div>
                    <div class="mint-cell-value">
                        <mt-button type="default" size="small">-</mt-button>
                        <input placeholder="请输入数字" number="true" type="number" class="mint-field-core count" v-model="count">
                        <mt-button type="default" size="small">+</mt-button>
                        <div class="mint-field-clear" style="display: none;">
                            <i class="mintui mintui-field-error"></i>
                        </div>
                        <span class="mint-field-state is-default"><i class="mintui mintui-field-default"></i></span>
                        <div class="mint-field-other"></div>
                    </div>
                </div>
                <div class="mint-cell-right"></div>
            </a>

            <mt-field label="服务单价：" :readonly="true" v-model="sevicePrice"></mt-field>
            <mt-field label="绑定手机号：" :readonly="true" v-model="phoneNumber"></mt-field>
            <mt-field label="订单时间：" :readonly="true" v-model="orderTime"></mt-field>

            <a class="mint-cell mint-field" style="padding-bottom: 50px; background-image: none; border-bottom: 1px dotted #ffeb93">
                <div class="mint-cell-wrapper" style="position: relative">
                    <div class="mint-cell-title"><span class="mint-cell-text"><i class="icon-wechat"></i><span class="wechat-text">微信支付</span></span></div>
                    <div class="mint-cell-value">
                        <mt-radio
                            align="right"
                            v-model="wechat"
                            :options="['']">
                        </mt-radio>
                    </div>
                </div>
            </a>
        </div>

        <div class="pay-form-submit">
            <span>￥888</span>
            <mt-button type="primary" size="small" class="btn-pay">支付</mt-button>
        </div>
    </div>
</template>
<script>
    import MtHeader from "../../../node_modules/mint-ui/packages/header/src/header";
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button";
    import MtField from "../../../node_modules/mint-ui/packages/field/src/field";
    import MtRadio from "../../../node_modules/mint-ui/packages/radio/src/radio";
    export default {
        data () {
            return {
                sellersName: '贝贝宝（浦东大道店）',
                serviceName: '婴儿洗澡',
                count: 1,
                sevicePrice: '￥200',
                phoneNumber: '13774135698',
                orderTime: '2017-07-04 16:00',
                wechat: ''
            }
        },
        components: {
            MtRadio,
            MtField,
            MtButton,
            MtHeader
        },
        methods: {}
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable.styl"

    .m-header
        height 49px
        background-color $color-theme
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
