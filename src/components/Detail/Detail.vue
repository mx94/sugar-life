<template>
    <div>
        <!--轮播图-->
        <div v-if="info.imageList" class="slider-wrapper">
            <slider :storeName="info.storeName">
                <div v-for="image in info.imageList">
                    <img :src="image.imagePath"/>
                </div>
            </slider>
        </div>
        <!--选项卡-->
        <div class="tab">
            <router-link :to="`/detail/${this.$route.params.id}/service`" replace>服务</router-link>
            <router-link :to="`/detail/${this.$route.params.id}/baby`" replace>育婴师</router-link>
        </div>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <!--门店设施-->
        <seller-config :facilities="facilities"></seller-config>
        <!--地理位置-->
        <div class="map">
            <div class="title">地理位置</div>
            <div class="map-img">
                <el-amap vid="amap" :zoom="zoom" :center="center">
                    <el-amap-marker :key="idx" v-for="(marker, idx) in markers" :animation="marker.animation" :position="marker.position"
                                    :events="marker.events" :visible="marker.visible"
                                    :draggable="marker.draggable"></el-amap-marker>
                </el-amap>
            </div>
            <div class="address">
                <i class="icon-address"></i>
                <span class="text">地址：<span>{{info.storeAddress}}</span></span>
                <a :href="`tel:${info.telephone}#mp.weixin.qq.com`"></a>
            </div>
        </div>
        <!--用户评论-->
        <user-comment :storeId="info.id" :page="page"></user-comment>
        <!--后退按钮-->
        <jump-back @jumpBack="jumpBack"></jump-back>
    </div>
</template>
<script>
    import Slider from '../../components/slider/slider.vue'
    import SellerConfig from '../../components/SellerConfig/SellerConfig.vue'
    import UserComment from '../../components/UserComment/UserComment.vue'
    import JumpBack from '../../components/JumpBack/JumpBack.vue'
    import {baseURL} from '../../api/config'

    export default {
        created() {
            this._getRecommend()
        },
        data () {
            return {
                page: 0,
                info: {},
                zoom: 14,
                center: [121.5273285, 31.21515044],
                markers: [
                    {
                        position: [121.5273285, 31.21515044],
                        events: {
                            click: (e) => {
                                console.log(e);
                            }
                        },
                        visible: true,
                        draggable: false,
                        animation: 'AMAP_ANIMATION_NONE'
                    }
                ],
                facilities: ''
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
                this.$http.get(`${baseURL}/wechat/store/${this.$route.params.id}`).then(res => {
                    if (res.body.code == 200) {
                        let {
                            businessEndTime,
                            businessStartTime,
                            cityName,
                            facilities,
                            gpsLat,
                            gpsLong,
                            id,
                            imageList,
                            storeAddress,
                            storeName,
                            telephone
                        } = res.body.data;
                        this.info = {
                            businessEndTime,
                            businessStartTime,
                            cityName,
                            facilities,
                            gpsLat,
                            gpsLong,
                            id,
                            imageList,
                            storeAddress,
                            storeName,
                            telephone
                        }
                        this.center = [gpsLat, gpsLong]
                        this.markers[0].position = [gpsLat, gpsLong]
                        this.facilities = facilities
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
