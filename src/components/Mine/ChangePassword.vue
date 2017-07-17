<template>
    <div class="m-con">
        <mt-header title="修改密码" class="m-header">
            <span @click="$router.go(-1)" slot="left">
                <mt-button icon="back" name="back"></mt-button>
            </span>
        </mt-header>

        <div class="login-con">
            <div class="input-row">
                <label><i class="icon-phone"></i></label>
                <input type="number" placeholder="请输入手机号" v-model="info.cellphone">
            </div>
            <div class="input-row">
                <label><i class="icon-verification"></i></label>
                <input type="number" placeholder="请输入短信验证码" ref="validCode" v-model="info.phoneCode">
                <span class="get-code" @click="sendCode">
                    <span v-show="!showTimeout">获取验证码</span>
                    <span v-show="showTimeout">{{second}} s</span>
                </span>
            </div>
            <div class="input-row">
                <label><i class="icon-password"></i></label>
                <input type="password" placeholder="请输入新密码" v-model="info.password">
            </div>
            <mt-button class="btn" type="primary" @click="confirmUpdate">确认修改</mt-button>
        </div>
    </div>
</template>
<script>
    import MtHeader from "../../../node_modules/mint-ui/packages/header/src/header";
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button";
    import Toast from 'mint-ui/packages/toast'
    import {baseURL} from '../../api/config'

    export default {
        data () {
            return {
                info: {
                    cellphone: '',
                    phoneCode: '',
                    password: ''
                },
                showTimeout: false,
                second: 60,
                timer: null
            }
        },
        components: {
            MtHeader,
            MtButton
        },
        methods: {
            sendCode() {
                if (!/^1[34578]\d{9}$/.test(this.info.cellphone)) {
                    this.alertToast('请输入正确的手机号');
                    return
                }
                this.showTimeout = !this.showTimeout;
                this.calcSec();
                this.$refs.validCode.focus();
                this.$http.post(`${baseURL}/phoneCode/single`, {cellphone: this.info.cellphone})
            },
            calcSec() {
                this.timer = setTimeout(() => {
                    clearTimeout(this.timer);
                    if (this.second <= 0) {
                        this.showTimeout = !this.showTimeout;
                        this.second = 60
                    }
                    this.second--;
                    this.calcSec();
                }, 1000)
            },
            alertToast(msg) {
                Toast({
                    message: msg,
                    position: 'bottom',
                    duration: 2000,
                    className: 'toast-class'
                })
            },
            confirmUpdate() {
                if (!/^1[34578]\d{9}$/.test(this.info.cellphone) ) {
                    this.alertToast('请输入正确的手机号');
                    return
                }
                if (this.info.phoneCode.trim() === '') {
                    this.alertToast('请输入短信验证码');
                    return
                }
                if (!/^[a-zA-Z0-9]{6,20}$/.test(this.info.password)) {
                    this.alertToast('请输入6~20位密码');
                    return
                }

                this.$http.put(`${baseURL}/app/password`, this.info).then(res => {
                    if (res.body.code == 200) {
                        this.alertToast('修改成功');
                        this.$router.push('/mine/0');
                    } else {
                        this.alertToast(res.body.message)
                    }
                }).catch()

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
                    .icon-verification
                        display inline-block
                        width 25px
                        height 25px
                        background-image url("./icon_verificationCode@3x.png")
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
                .get-code
                    flex 1
                    font-size 14px
                    color #6389cd
                    display: flex;
                    justify-content: flex-end;
            .btn
                width 100%
                background-color #6389CD
                border-radius 100px
                font-size 16px
                margin-top 20px
</style>
