<template>
    <div class="download-tooltip">
        <div class="text">
            <span>更多精彩内容</span>
            <span>尽在甜生活手机客户端</span>
        </div>
        <div class="btn-con">
            <mt-button type="default" size="small" :plain="true" class="btn" @click="$router.push('/download')">去下载</mt-button>
        </div>
    </div>
</template>
<script>
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button";
    export default {
        data () {
            return {}
        },
        components: {MtButton},
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .download-tooltip
        display flex
        justify-content center
        align-items center
        position fixed
        left 0
        right 0
        bottom 0
        width 100vw
        height 20vw
        box-sizing border-box
        padding 0 15px
        background-color rgba(0, 0, 0, .6)
        .text
            display flex
            flex-direction column
            flex 1
            justify-content space-around
            height 12vw
            span
                display flex
                justify-content flex-start
                color #fff
                font-size 14px
        .btn-con
            display flex
            flex 1
            align-items center
            justify-content flex-end
            .btn
                border-radius 100px
                border-color #fff
                color #fff
</style>
