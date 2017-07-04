<template>
    <div>
        <!--轮播图-->
        <div v-if="recommends.length" class="slider-wrapper">
            <slider>
                <div v-for="item in recommends">
                    <img :src="item.picUrl"/>
                </div>
            </slider>
        </div>
        <!--选项卡-->
        <div class="tab">
            <router-link to="/detail/service" replace>服务</router-link>
            <router-link to="/detail/baby" replace>育婴师</router-link>
        </div>
        <router-view></router-view>
        <!--门店设施-->
        <seller-config></seller-config>
        <!--地理位置-->
        <div class="map">
            <div class="title">地理位置</div>
            <div class="map-img"></div>
            <div class="address">
                <i class="icon-address"></i>
                <span class="text">地址：<span>上海市浦东新区碧波路888号</span></span>
                <a href="tel:10086#mp.weixin.qq.com"></a>
            </div>
        </div>
        <!--用户评论-->
        <user-comment></user-comment>
        <!--后退按钮-->
        <jump-back @jumpBack="jumpBack"></jump-back>
    </div>
</template>
<script>
    import Slider from '../../components/slider/slider.vue'
    import {getRecommend} from '../../api/recommends.js'
    import {ERR_OK} from '../../api/config.js'
    import SellerConfig from '../../components/SellerConfig/SellerConfig.vue'
    import UserComment from '../../components/UserComment/UserComment.vue'
    import JumpBack from '../../components/JumpBack/JumpBack.vue'

    export default {
        created() {
            this._getRecommend()
        },
        data () {
            return {
                recommends: []
            }
        },
        components: {
            Slider,
            SellerConfig,
            UserComment,
            JumpBack
        },
        methods: {
            jumpBack() {
                this.$router.go(-1)
            },
            _getRecommend() {
                getRecommend().then(res => {
                    if (res.code === ERR_OK) {
                        this.recommends = res.data.slider
                        console.log(this.recommends)
                    }
                })
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .slider-wrapper
        position: relative

    .tab
        display: flex
        align-items center
        justify-content space-around
        padding 12px 0
        background-color #fff
        border-bottom 1px solid #d8d8d8
        a
            width 100%
            text-align center
            color: #999
            font-size 14px
            border-right 1px solid #d8d8d8
            &:last-child
                border-right none
            &.router-link-active
                color #6389cd

    .map
        background-color #fff
        margin-top 10px
        .title
            padding-left 15px
            color #333
            font-size 14px
            height 40px
            line-height 40px
            border-bottom 1px solid #f0f0f0
        .map-img
            height 92px
            background-color lightgray
        .address
            position: relative
            height 41px
            line-height 41px
            font-size 12px
            color #999
            .icon-address
                position absolute
                left 15px
                top 10px
                display inline-block
                width 22px
                height 22px
                background-image url("./icon_site@3x.png")
                background-repeat no-repeat
                background-size 22px 22px
            .text
                position: absolute
                left 40px
            a
                display inline-block
                position: absolute
                right 15px
                top 10px
                width 22px
                height 22px
                background-image url("./icon_CustomerServiceTelephone@3x.png")
                background-repeat no-repeat
                background-size 22px 22px
</style>
