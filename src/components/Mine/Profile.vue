<template>
    <div style="height: 100%">
        <mt-header title="个人资料" class="m-header">
            <span @click="$router.go(-1)" slot="left">
                <mt-button icon="back" name="back"></mt-button>
            </span>
        </mt-header>

        <div class="profile-con">
            <mt-cell title="图像" is-link>
                <img class="avatar" src="http://avatar.csdn.net/C/B/D/1_u010014658.jpg">
            </mt-cell>
            <mt-cell title="昵称" value="光头强" is-link></mt-cell>
            <mt-cell title="绑定手机" is-link value="13888899660"></mt-cell>
        </div>
        <div class="logout-btn-con">
            <mt-button class="btn" type="primary" @click="logout">退出登录</mt-button>
        </div>
    </div>
</template>
<script>
    import MtHeader from "../../../node_modules/mint-ui/packages/header/src/header";
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button";
    import MtCell from "../../../node_modules/mint-ui/packages/cell/src/cell";
    import {getCookie, clearCookie} from '../../common/js/utils'

    export default {
        beforeRouteEnter(to, from, next) {
            if (getCookie('token')) {
                next()
            } else {
                next('/')
            }
        },
        data () {
            return {}
        },
        components: {
            MtCell,
            MtHeader,
            MtButton
        },
        methods: {
            logout() {
                clearCookie('token')
                this.$router.push('/')
            }
        }
    }
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable.styl"

    .m-header
        height 49px
        background-color $color-theme
        font-size 16px
    .profile-con
        padding 10px 15px
        background-color #fff
        color #333
        font-size 14px
        box-sizing border-box
        height calc(100% - 114px)
        .avatar
            width 75px
            height 75px
            border-radius 50%
        .mint-cell-text, .mint-cell-value
            font-size 14px
    .logout-btn-con
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
        padding 0 15px
        box-sizing border-box
        .btn
            width 100%
            background-color #6389CD
            border-radius 100px
            font-size 16px
</style>
