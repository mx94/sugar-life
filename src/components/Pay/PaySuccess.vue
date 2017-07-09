<template>
    <div style="height: 100%">
        <mt-header title="提交订单" class="m-header">
            <span @click="$router.go(-1)" slot="left">
                <mt-button icon="back" name="back"></mt-button>
            </span>
        </mt-header>

        <div class="con">
            <div class="main">
                <div class="title">
                    服务名称：<span>婴儿游泳</span>
                </div>
                <div class="ok">
                    <div class="img"></div>
                    <span>购买服务成功</span>
                </div>
                <div class="btn-con">
                    <div class="btn-item">
                        <mt-button type="primary" class="look" @click="$router.push('/indent')">查看订单</mt-button>
                    </div>
                    <div class="btn-item">
                        <mt-button type="primary" class="continue" :plain="true"  @click="$router.push('/')">继续下单</mt-button>
                    </div>
                </div>
            </div>
        </div>

        <d-tooltip></d-tooltip>
    </div>
</template>
<script>
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button";
    import MtHeader from "../../../node_modules/mint-ui/packages/header/src/header";
    import DTooltip from '../../components/DTooltip/DTooltip.vue'

    export default {
        data () {
            return {}
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

    .con
        width 100%
        height calc(100% - 49px)
        box-sizing border-box
        padding 10px 15px
        .main
            width 100%
            height 100%
            box-sizing border-box
            padding 0 15px
            background-color #fff
            .title
                height 70px
                line-height 70px
                color #999
                font-size 16px
                border-bottom 1px solid #f0f0f0
                span
                    color #333
            .ok
                height 175px
                text-align center
                .img
                    width 50px
                    height 50px
                    background-image url("./icon_smilingFace @3x.png")
                    background-size 50px 50px
                    background-repeat no-repeat
                    display inline-block
                    margin-top 50px
                span
                    display block
                    font-size 12px
                    color #999
                    margin-top 10px
            .btn-con
                margin-top 50px
                display flex
                align-items center
                justify-content center
                box-sizing border-box
                .btn-item
                    flex 1
                    padding 0 8px
                    display flex
                    align-items center
                    justify-content center
                    box-sizing border-box
                    .look
                        background-color #648BD0
                        border-radius 100px
                        width 100%
                        font-size 16px
                        height 12vw
                    .continue
                        border-color #648BD0
                        border-radius 100px
                        width 100%
                        font-size 16px
                        color #648bd0
                        height 12vw
</style>
