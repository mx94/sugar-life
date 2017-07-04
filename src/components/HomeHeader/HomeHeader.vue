<template>
    <mt-header class="home-header">
        <div class="city" slot="left">
            <span>上海</span>&nbsp;
            <i class="mintui mintui-back icon-down"></i>
        </div>
        <div class="login" slot="right">
            <router-link to="/indent">
                <div class="pay"></div>
                <span>订单</span>
            </router-link>
            <router-link to="/mine">
                <div class="mine"></div>
                <span>我的</span>
            </router-link>
        </div>
    </mt-header>
</template>
<script>
    import {Header} from 'mint-ui'
    import MtHeader from "../../../node_modules/mint-ui/packages/header/src/header";

    export default {
        data () {
            return {}
        },
        components: {MtHeader},
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable.styl"
    @import "~common/stylus/mixin.styl"

    .home-header
        display flex
        height 49px
        background-color $color-theme
        color $color-text-white
        align-items center
        justify-content space-between
        .city
            display flex
            justify-content center
            flex 1
            .icon-down
                transform rotate(-90deg)
                display inline-block
        .login
            display flex
            align-items center
            justify-content center
            flex 1.5
            text-align right !important
            a
                display flex
                align-items center
                justify-content center
                flex-direction column
                padding 0 4px
                .pay
                    bg-image('icon_order_white')
                    width 22px
                    height 22px
                    background-size 22px 22px
                    background-repeat no-repeat
                    flex 2
                .mine
                    bg-image('icon_me_white')
                    width 22px
                    height 22px
                    background-size 22px 22px
                    background-repeat no-repeat
                    flex 2
                span
                    flex 1
                    color $color-text-white
                    font-size $font-size-small-s
                    padding-top 3px
</style>
