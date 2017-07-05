<template>
    <div>
        <mt-header title="用户注册" class="m-header">
            <span @click="$router.go(-1)" slot="left">
                <mt-button icon="back" name="back"></mt-button>
            </span>
        </mt-header>

        <div class="login-con">
            <div class="input-row">
                <label><i class="icon-phone"></i></label>
                <input type="number" placeholder="请输入手机号">
                <span class="get-code">获取验证码</span>
            </div>
            <div class="input-row">
                <label><i class="icon-verification"></i></label>
                <input type="number" placeholder="请输入验证码">
            </div>
            <div class="input-row">
                <label><i class="icon-password"></i></label>
                <input type="password" placeholder="请输入6-20位数字或字母的密码">
            </div>
            <span class="duty"><i class="icon-choose"></i>我已阅读并同意<a href="javascript:;">《乐宝时代用户协议》</a></span>
            <mt-button class="btn" type="primary">注册并登录</mt-button>
        </div>
    </div>
</template>
<script>
    import MtHeader from "../../../node_modules/mint-ui/packages/header/src/header";
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button";

    export default {
        data () {
            return {}
        },
        components: {
            MtHeader,
            MtButton
        },
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable.styl"

    .m-header
        height 49px
        background-color $color-theme
        font-size 16px
    .login-con
        background-color #fff
        padding 20px 15px
        overflow hidden
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
            a
                color #6389cd
</style>
