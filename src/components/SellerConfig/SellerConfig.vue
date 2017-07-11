<template>
    <div class="sellers-config">
        <div class="title">门店设施</div>
        <div class="con">
            <div v-show="facilities.indexOf('WIFI') > -1" class="item item-wifi">
                <div class="img-con">
                    <div class="img"></div>
                </div>
                <div class="text">WIFI</div>
            </div>
            <div v-show="facilities.indexOf('停车场') > -1" class="item item-park">
                <div class="img-con">
                    <div class="img"></div>
                </div>
                <div class="text">停车场</div>
            </div>
            <div v-show="facilities.indexOf('休息区') > -1" class="item item-rest">
                <div class="img-con">
                    <div class="img"></div>
                </div>
                <div class="text">休息区</div>
            </div>
            <div v-show="facilities.indexOf('茶水') > -1" class="item item-tea">
                <div class="img-con">
                    <div class="img"></div>
                </div>
                <div class="text">茶水</div>
            </div>
        </div>
        <div class="sell-time">营业时间 8:00-21:00</div>
    </div>
</template>
<script>
    export default {
        props: ['facilities'],
        data () {
            return {}
        },
        components: {},
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .sellers-config
        padding 0 15px
        background-color #fff
        margin-top 10px
        .title
            color #333
            font-size 14px
            height 40px
            line-height 40px
            border-bottom 1px solid #f0f0f0
        .con
            display flex
            align-items center
            justify-content center
            border-bottom 1px solid #f0f0f0
            height 85px
            .item
                flex 1
                display flex
                flex-direction column
                align-items center
                justify-content center
                .img-con
                    flex 2
                    .img
                        width 35px
                        height 35px
                        background-repeat no-repeat
                        background-size 35px 35px
                .text
                    flex 1
                    font-size 10px
                    color #333
                    padding-top 5px
                &.item-wifi
                    .img
                        background-image url("./icon_wifi@3x.png")
                &.item-park
                    .img
                        background-image url("./icon_parking@3x.png")
                &.item-rest
                    .img
                        background-image url("./icon_rest@3x.png")
                &.item-tea
                    .img
                        background-image url("./icon_tea@3x.png")
        .sell-time
            font-size 14px
            color #333
            height 40px
            line-height 40px
</style>
