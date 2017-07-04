<template>
    <div>
        <div style="padding: 100px; text-align: center">服务信息</div>
        <div class="pay-con">
            <span>￥888</span>
            <mt-button type="primary" size="small" class="btn-pay" @click="$router.push('/pay')">购买</mt-button>
        </div>
        <jump-back @jumpBack="$router.go(-1)"></jump-back>
    </div>
</template>
<script>
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button";
    import JumpBack from '../../components/JumpBack/JumpBack.vue'

    export default {
        data () {
            return {}
        },
        components: {
            MtButton,
            JumpBack
        },
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .pay-con
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
