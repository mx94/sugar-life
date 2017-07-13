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
            <div class="map-img" v-if="this.myMapInfo">
                <el-amap vid="amap" :zoom="myMapInfo.zoom" :center="myMapInfo.center">
                    <el-amap-marker :key="idx" v-for="(marker, idx) in myMapInfo.markers" :animation="marker.animation" :position="marker.position"
                                    :events="marker.events" :visible="marker.visible"
                                    :draggable="marker.draggable"></el-amap-marker>
                </el-amap>
            </div>
            <div class="address">
                <i class="icon-address"></i>
                <span class="text">地址：<span>{{info.storeAddress}}</span></span>
                <a :href="`tel:${info.telephone}`"></a>
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
        watch: {
            mapInfo(newVal) {
                console.log(newVal)
                this.myMapInfo = newVal
            }
        },
        created() {
            this._getRecommend()
        },
        data () {
            return {
                page: 0,
                info: {},
                facilities: '',
                mapInfo: {},
                myMapInfo: null
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
                        };
                        this.mapInfo = {
                            zoom: 14,
                            center: [gpsLong, gpsLat],
                            markers: [
                                {
                                    position: [gpsLong, gpsLat],
                                    events: {
                                        click: (e) => {
                                            console.log(e);
                                        },
                                    },
                                    visible: true,
                                    draggable: false,
                                    animation: 'AMAP_ANIMATION_NONE'
                                }
                            ]
                        };
                        this.facilities = facilities;
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
