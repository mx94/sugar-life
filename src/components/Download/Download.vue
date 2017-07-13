<template>
    <div style="height: 100%; background-color: #fff">
        <mt-header title="" class="m-header">
            <span @click="$router.go(-1)" slot="left">
                <mt-button icon="back" name="back"></mt-button>
            </span>
        </mt-header>
        <div class="image"></div>
        <div class="btn-con">
            <mt-button type="primary" class="download" @click="downApp">下载客户端</mt-button>
            <mt-button type="primary" :plain="true" class="back-web" @click="$router.go(-1)">使用网页版继续访问</mt-button>
        </div>
    </div>
</template>
<script>
    import MtHeader from "../../../node_modules/mint-ui/packages/header/src/header";
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button";
    export default {
        data () {
            return {
                url: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.kuaicto.lebao'
            }
        },
        components: {
            MtButton,
            MtHeader
        },
        methods: {
            downApp() {
                window.location.href = this.url
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/mixin.styl"
    @import "~common/stylus/variable.styl"

    .m-header
        height 49px
        background-color $color-theme
        font-size 16px

    .image
        width 100vw
        height 80vw
        bg-image('./more')
        background-size 100vw 80vw

    .btn-con
        padding 50px 30px
        .download
            width 100%
            font-size 16px
            background-color #648bd0
            border-radius 100px
        .back-web
            width 100%
            font-size 16px
            margin-top 15px
            border-color #648bd0
            color #648bd0
            border-radius 100px
</style>
