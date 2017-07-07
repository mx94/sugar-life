<template>
    <div class="m-con">
        <mt-header title="用户登录" class="m-header">
            <span @click="$router.push('/')" slot="left">
                <mt-button icon="back" name="back"></mt-button>
            </span>
            <router-link to="/register" slot="right">注册</router-link>
        </mt-header>

        <div class="login-con">
            <div class="input-row">
                <label><i class="icon-phone"></i></label>
                <input type="number" placeholder="请输入手机号" v-model="info.username">
            </div>
            <div class="input-row">
                <label><i class="icon-password"></i></label>
                <input type="password" placeholder="请输入密码" v-model="info.password">
            </div>
            <mt-button class="btn" type="primary" @click="login">登录</mt-button>
            <router-link to="/changepassword" class="find" :replace="true">找回密码</router-link>
        </div>
    </div>
</template>
<script>
    import MtHeader from "../../../node_modules/mint-ui/packages/header/src/header";
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button";
    import Toast from 'mint-ui/packages/toast'
    import {baseURL} from '../../api/config'
    import {getCookie} from '../../common/js/utils'

    export default {
        beforeRouteEnter(to, from, next) {
            if (!getCookie('token')) {
                next()
            } else {
                next({path: '/profile'})
            }
        },
        data () {
            return {
                info: {
                    username: '',
                    password: ''
                }
            }
        },
        components: {
            MtHeader,
            MtButton
        },
        methods: {
            alertToast(msg) {
                Toast({
                    message: msg,
                    position: 'bottom',
                    duration: 2000,
                    className: 'toast-class'
                })
            },
            login() {
                if (!/^1[34578]\d{9}$/.test(this.info.username)) {
                    this.alertToast('请输入正确的手机号');
                    return
                }
                if (!/^[a-zA-Z0-9]{6,20}$/.test(this.info.password)) {
                    this.alertToast('请输入6~20位密码');
                    return
                }
                this.$http.post(baseURL + '/app/auth/login', this.info).then(res => {
                    if (res.body.code == '200') {
                        document.cookie = `token=${res.body.data}`;
                        this.alertToast('登录成功');
                        this.$router.push('/');
                    } else {
                        this.alertToast(res.body.message);
                    }
                })
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable.styl"

    .m-con
        box-sizing border-box
        height 100%
        .m-header
            height 49px
            background-color $color-theme
            font-size 16px
        .login-con
            background-color #fff
            padding 20px 15px
            overflow hidden
            height calc(100% - 49px)
            box-sizing border-box
            .input-row
                display flex
                align-items center
                justify-content space-around
                border-bottom 1px solid #e6e6e6
                height 45px
                label
                    display flex
                    width 45px
                    align-items center
                    justify-content flex-start
                    .icon-phone
                        display inline-block
                        width 25px
                        height 25px
                        background-image url("./icon_phone @3x.png")
                        background-repeat no-repeat
                        background-size 25px 25px
                    .icon-password
                        display inline-block
                        width 25px
                        height 25px
                        background-image url("./icon_password@3x.png")
                        background-repeat no-repeat
                        background-size 25px 25px
                input
                    flex 1
                    outline: 0;
                    line-height: 1.6;
                    font-size: font-size 14px;
                    width: 100%;
                    border 0
                    border-radius 0
                    -webkit-appearance none
                    padding 0 8px
                    &::placeholder
                        color #b6b6b6
                        font-size 14px
            .btn
                width 100%
                background-color #6389CD
                border-radius 100px
                font-size 16px
                margin-top 30px
            .find
                color #b6b6b6
                font-size 14px
                float right
                margin-top 20px
</style>
