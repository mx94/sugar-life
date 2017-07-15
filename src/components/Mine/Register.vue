<template>
    <div class="m-con">
        <mt-header title="用户注册" class="m-header">
            <span @click="$router.go(-1)" slot="left">
                <mt-button icon="back" name="back"></mt-button>
            </span>
        </mt-header>

        <div class="login-con">
            <div class="input-row">
                <label><i class="icon-phone"></i></label>
                <input type="number" placeholder="请输入手机号" v-model="info.cellphone">
                <span class="get-code" @click="sendCode">
                    <span v-show="!showTimeout">获取验证码</span>
                    <span v-show="showTimeout">{{second}} s</span>
                </span>
            </div>
            <div class="input-row">
                <label><i class="icon-verification"></i></label>
                <input type="number" placeholder="请输入验证码" v-model="info.phoneCode" ref="validCode">
            </div>
            <div class="input-row">
                <label><i class="icon-password"></i></label>
                <input type="password" placeholder="请输入6-20位数字或字母的密码" v-model="info.password">
            </div>
            <span class="duty" @click="changeModal">
                <i class="icon-choose"></i>我已阅读并同意<span>《乐宝时代用户协议》</span>
            </span>
            <mt-button class="btn" type="primary" @click="registe">注册并登录</mt-button>
        </div>

        <!--用户协议-->
        <mt-popup v-model="popupVisible" popup-transition="popup-fade" position="top">
            <div class="mint-popup mint-popup-1" style="top: 60px">{{content}}</div>
        </mt-popup>
    </div>
</template>
<script>
    import MtHeader from "../../../node_modules/mint-ui/packages/header/src/header";
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button";
    import Toast from 'mint-ui/packages/toast'
    import { Popup } from 'mint-ui';
    import { baseURL } from '../../api/config'
    import {getCookie, setCookie} from '../../common/js/utils'
    import MtPopup from "../../../node_modules/mint-ui/packages/popup/src/popup";

    export default {
        created() {
            this.$http.get(`${baseURL}/app/aboutUs/getInfo`).then(res => {
                if (res.body.code == 200) {
                    this.content = res.body.data.declaration
                }
            }).catch(e => console.log(e))
        },
        beforeDestroy() {
            this.timer = null
        },
        data () {
            return {
                info: {
                    cellphone: '',
                    password: '',
                    phoneCode: ''
                },
                showTimeout: false,
                second: 60,
                timer: null,
                popupVisible: false,
                content: ''
            }
        },
        components: {
            MtPopup,
            MtHeader,
            MtButton
        },
        methods: {
            changeModal() {
                this.popupVisible = !this.popupVisible
            },
            alertToast(msg) {
                Toast({
                    message: msg,
                    position: 'bottom',
                    duration: 2000,
                    className: 'toast-class'
                })
            },
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
                    ;
                    this.second--;
                    this.calcSec();
                }, 1000)
            },
            registe() {
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
                this.$http.post(baseURL + '/app/register', this.info).then(res => {
                    switch (res.body.code) {
                        case '200':
                            document.cookie = `token=${res.body.data}`;
                            setCookie('token', res.body.data, 60);
                            this.alertToast('注册成功');
                            this.$router.push('/');
                            break;
                        case '1200':
                            this.alertToast(res.body.message);
                        case '6700':
                            this.alertToast(res.body.message);
                    }
                }).catch(e => {})
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
            .duty
                display inline-block
                font-size 12px
                color #999
                margin-top 15px
                .icon-choose
                    display inline-block
                    width 14px
                    height 14px
                    background-image url("./icon_choose@3x.png")
                    background-repeat no-repeat
                    background-size 14px 14px
                    margin-right 5px
                span
                    color #6389cd
        .mint-popup-1
            width: 75vw
            height 90vw
            overflow scroll
            border-radius 8px
            padding 15px
            -webkit-transform translate(-50%)
            transform translate(-50%)
            color #333
</style>
