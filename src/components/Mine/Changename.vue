<template>
    <div style="height: 100%">
        <mt-header title="昵称" class="m-header">
            <span @click="$router.go(-1)" slot="left">
                <mt-button icon="back" name="back"></mt-button>
            </span>
        </mt-header>

        <mt-field v-model="info.nickName"></mt-field>
        <div style="padding: 10px 15px; margin-top: 15px">
            <mt-button type="primary" class="btn" size="small" @click="saved">保存</mt-button>
        </div>
    </div>
</template>
<script>
    import MtHeader from "../../../node_modules/mint-ui/packages/header/src/header";
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button";
    import MtField from "../../../node_modules/mint-ui/packages/field/src/field";
    import Toast from 'mint-ui/packages/toast'
    import {baseURL} from '../../api/config'

    export default {
        data () {
            return {
                info: {
                    nickName: ''
                }
            }
        },
        components: {
            MtField,
            MtButton,
            MtHeader},
        methods: {
            saved() {
                this.$http.put(`${baseURL}/app/profile`, {nickname: this.info.nickName}).then(res => {
                    if (res.body.code == 200) {
                        Toast({
                            message: '修改成功',
                            position: 'bottom',
                            duration: 2000,
                        });
                        this.$router.go(-1)
                    }
                })
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable.styl"

    .m-header
        height 49px
        background-color $color-theme
        font-size 16px

    .btn
        border-radius 100px
        height 35px
        background-color #6389cd
        width 100%
        font-size 14px
</style>
