<template>
    <div style="height: 100%; background-color: #fff">
        <mt-header title="选择城市" class="m-header">
            <span @click="$router.go(-1)" slot="left">
                <mt-button icon="back" name="back"></mt-button>
            </span>
        </mt-header>

        <div class="city-con">
            <div class="title">当前城市：<span>{{ctName}}</span></div>
            <div class="position">定位城市</div>
            <div class="city-pos">上海</div>
            <div class="position">其他城市</div>
        </div>

        <dl v-for="list in lists">
            <dt>{{list.initials}}</dt>
            <dd @click="selectCity(city)" v-for="city in list.cityList">{{city}}</dd>
        </dl>
    </div>
</template>
<script>
    import MtHeader from "../../../node_modules/mint-ui/packages/header/src/header"
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button"
    import {mapState, mapActions, mapGetters} from 'vuex'
    import * as types from '../../store/types'
    import {baseURL} from '../../api/config'

    export default {
        computed: {
            ...mapGetters(['ctName'])
        },
        created() {
            this.$http.get(`${baseURL}/wechat/store/findAllCityName`).then(res => {
                console.log(res.body);
                if (res.body.code == 200) {
                    this.lists = res.body.data
                }
            }).catch()
        },
        data () {
            return {
                lists: []
            }
        },
        components: {
            MtButton,
            MtHeader
        },
        methods: {
            ...mapActions([
                types.CHANGE_CITY,
                types.IS_OTHER_CITY
            ]),
            selectCity(city) {
                if (localStorage.getItem('city') != city) {
                    this[types.IS_OTHER_CITY](true);
                    this[types.CHANGE_CITY](city);
                } else {
                    this[types.IS_OTHER_CITY](false);
                }
                this.$router.go(-1)
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

    .city-con
        padding 15px
        .title
            font-size 16px
            color #000
            height 49px
            line-height 49px
        .position
            padding 8px 0
            font-size 14px
        .city-pos
            padding 0 40px
            font-size 16px
            color #000
            height 49px
            line-height 49px
            display inline-block
            &:active
                background-color #d8d8d8

    dl
        width 100%
        dt
            height 30px
            line-height 30px
            padding-left 15px
            background-color rgb(244, 244, 244)
        dd
            height 49px
            line-height 49px
            padding-left 15px
            background-color #fff
            color #000
            border-bottom 1px solid #f0f0f0
            &:active
                background-color #d8d8d8
</style>
