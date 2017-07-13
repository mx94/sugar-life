<template>
    <div style="height: 100%">
        <mt-header title="个人资料" class="m-header">
            <span @click="$router.go(-1)" slot="left">
                <mt-button icon="back" name="back"></mt-button>
            </span>
        </mt-header>

        <div class="profile-con">
            <mt-cell title="头像">
                <img class="avatar" :src="infos.photo">
            </mt-cell>
            <a class="mint-cell" @click="changeNick"><span class="mint-cell-mask"></span>
                <div class="mint-cell-left"></div>
                <div class="mint-cell-wrapper">
                    <div class="mint-cell-title"><!----> <span class="mint-cell-text">昵称</span> <!----></div>
                    <div class="mint-cell-value is-link"><span>{{infos.nickname}}</span></div>
                </div>
                <div class="mint-cell-right"></div>
                <i class="mint-cell-allow-right"></i></a>
            <mt-cell title="绑定手机" :value="infos.cellphone"></mt-cell>
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
    import Toast from 'mint-ui/packages/toast'
    import {getCookie, clearCookie} from '../../common/js/utils'
    import {baseURL} from '../../api/config'

    export default {
        beforeRouteEnter(to, from, next) {
            if (getCookie('token')) {
                next()
            } else {
                next('/')
            }
        },
        data () {
            return {
                infos: {}
            }
        },
        created() {
            this.$http.get(`${baseURL}/app/profile`).then(res => {
                if (res.body.code == 200) {
                    console.log(res.body);
                    let {userId, nickname, cellphone, photo} = res.body.data
                    this.infos = {userId, nickname, cellphone, photo}
                }
            })
        },
        components: {
            MtCell,
            MtHeader,
            MtButton
        },
        methods: {
            changeNick() {
                this.$router.push('/changename')
            },
            logout() {
                this.$http.get(`${baseURL}/app/auth/logout`).then(res => {
                    if (res.body.code == 200) {
                        clearCookie('token');
                        Toast({
                            message: '退出成功',
                            position: 'bottom',
                            duration: 2000,
                            className: 'toast-class'
                        })
                        this.$router.push('/')
                    }
                })
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
        .mint-cell-wrapper
            &:first-child
                background-image none
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
