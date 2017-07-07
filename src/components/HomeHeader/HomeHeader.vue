<template>
    <mt-header class="home-header">
        <div class="city" slot="left" @click="selectCity">
            <span>{{cityName}}</span>&nbsp;
            <i class="mintui mintui-back icon-down"></i>
        </div>
        <div class="login" slot="right">
            <router-link to="/indent">
                <div class="pay"></div>
                <span>订单</span>
            </router-link>
            <router-link to="/mine">
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

    export default {
        computed: {
            ...mapState(['positions', 'cityName'])
        },
        created() {
            this.getPos()
        },
        data () {
            return {}
        },
        components: {MtHeader},
        methods: {
            ...mapActions([
                types.SET_POSITION,
                types.HAS_POSITION
            ]),
            getPos() {
                var options = {
                    enableHighAccuracy: true,
                    maximumAge: 1000
                }
                if (navigator.geolocation) {
                    //浏览器支持geolocation
                    navigator.geolocation.getCurrentPosition(this.onSuccess, this.onError, options);
                } else {
                    //浏览器不支持geolocation
                    alert('您的浏览器不支持地理位置定位');
                }
            },
            onSuccess(position) {
                this[types.SET_POSITION]({
                    longitude: position.coords.longitude,
                    latitude: position.coords.latitude
                });
                this[types.HAS_POSITION](true);
            },
            onError(error) {
                this[types.HAS_POSITION](false);
                switch (error.code) {
                    case 1:
                        console.log("位置服务被拒绝");
                        break;
                    case 2:
                        console.log("暂时获取不到位置信息");
                        break;
                    case 3:
                        console.log("获取信息超时");
                        break;
                    case 4:
                        console.log("未知错误");
                        break;
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
                padding 0 4px
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
