<template>
    <mt-header class="home-header">
        <div class="city" slot="left" @click="selectCity">
            <span v-show="isOtherCity">{{otherCityName}}</span>
            <span v-show="!isOtherCity">{{firstCity}}</span>&nbsp;
            <i class="mintui mintui-back icon-down"></i>
        </div>
        <div class="login" slot="right">
            <router-link to="/indent">
                <div class="pay"></div>
                <span>订单</span>
            </router-link>
            <router-link to="/mine/0">
                <div class="mine"></div>
                <span>我</span>
            </router-link>
        </div>
    </mt-header>
</template>
<script>
    import {Header} from 'mint-ui'
    import MtHeader from "../../../node_modules/mint-ui/packages/header/src/header";
    import {mapState, mapActions, mapGetters} from 'vuex';
    import * as types from '../../store/types';
    import {getCookie} from '../../common/js/utils'

    export default {
        computed: {
            ...mapGetters(['ctName', 'isOtherCity', 'otherCityName'])
        },
        created() {
            this.getPsition()
        },
        beforeDestroy() {
            this.$timer = null
            this.searchTimer = null
        },
        watch: {
            ctName(newVal, oldVal) {
                this.firstCity = newVal
            }
        },
        data() {
            return {
                $timer: null,
                $searchTimer: null,
                firstCity: this.ctName ? this.ctName : ''
            }
        },
        components: {MtHeader},
        methods: {
            ...mapActions([
                types.SET_POSITION,
                types.HAS_POSITION,
                types.HELLO_WORLD
            ]),
            searchTimer() {
                this.$searchTimer = setTimeout(() => {
                    clearTimeout(this.$searchTimer)
                    if (getCookie('lat') && getCookie('lon')) {
                        this[types.HAS_POSITION](true)
                        this[types.SET_POSITION]({
                            latitude: getCookie('lat'),
                            longitude: getCookie('lon')
                        })
                        this[types.HELLO_WORLD](localStorage.getItem('city'));
                        return;
                    }
                    this.searchTimer()
                }, 500)
            },
            getPsition() {
                if (!getCookie('lat') || !getCookie('lon')) {
                    this.searchTimer();
                } else {
                    this.firstCity = localStorage.getItem('city')
                }
            },
            selectCity() {
                this.$router.push('/cityselect')
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable.styl"
    @import "~common/stylus/mixin.styl"

    .home-header
        display flex
        height 49px
        background-color $color-theme
        color $color-text-white
        align-items center
        justify-content space-between
        .city
            display flex
            justify-content center
            flex 1
            .icon-down
                transform rotate(-90deg)
                display inline-block
        .login
            display flex
            align-items center
            justify-content center
            flex 1.5
            text-align right !important
            a
                display flex
                align-items center
                justify-content center
                flex-direction column
                padding 0 8px
                .pay
                    bg-image('icon_order_white')
                    width 22px
                    height 22px
                    background-size 22px 22px
                    background-repeat no-repeat
                    flex 2
                .mine
                    bg-image('icon_me_white')
                    width 22px
                    height 22px
                    background-size 22px 22px
                    background-repeat no-repeat
                    flex 2
                span
                    flex 1
                    color $color-text-white
                    font-size $font-size-small-s
                    padding-top 3px
</style>
