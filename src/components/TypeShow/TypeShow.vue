<template>
    <div style="padding-top: 10px">
        <div class="rows">
            <router-link tag="div" to="/sellers" class="link">
                <div class="image"><img src="./icon_swimming_weixin@2x.png"></div>
                <div class="text">婴儿游泳</div>
            </router-link>
            <router-link tag="div" to="/sellers" class="link">
                <div class="image"><img src="./icon_classroom_weixin@2x.png"></div>
                <div class="text">妈妈课堂</div>
            </router-link>
            <router-link tag="div" to="/sellers" class="link">
                <div class="image"><img src="./icon_massage_weixin@2x.png"></div>
                <div class="text">小儿推拿</div>
            </router-link>
        </div>
        <div class="rows">
            <router-link tag="div" to="/sellers" class="link">
                <div class="image"><img src="./icon_amusement_weixin@2x.png"></div>
                <div class="text">儿童游乐</div>
            </router-link>
            <router-link tag="div" to="/sellers" class="link">
                <div class="image"><img src="./icon_vr_weixin@2x.png"></div>
                <div class="text">VR虚拟体验</div>
            </router-link>
            <router-link tag="div" to="/sellers" class="link">
                <div class="image"><img src="./icon_Store_weixin@2x.png"></div>
                <div class="text">全部门店</div>
            </router-link>
        </div>
    </div>
</template>
<script>

    export default {
        data () {
            return {}
        },
        components: {
        },
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable.styl"
    @import "~common/stylus/mixin.styl"

    .rows
        display flex
        align-items center
        justify-content center
        .link
            display flex
            align-items center
            justify-content center
            flex-direction column
            flex 1
            height 88px
            border-bottom 1px solid #ededed
            border-right 1px solid #ededed
            background-color #fff
            &:last-child
                border-right none
            .image
                display flex
                flex 2
                align-items center
                img
                    width 35px
                    height 35px
            .text
                flex 1
                font-size $font-size-medium
                color $color-text
</style>
