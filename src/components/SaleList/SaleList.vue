<template>
    <div>
        <router-link :to="`/detail/${list.id}/service`" v-for="list in lists" :key="list.id">
            <div class="list-item">
                <img :src="list.logo">
                <div class="list-item-content">
                    <span class="sale-name">{{ list.storeName }}</span>
                    <div class="star-con">
                        <div class="star">
                            <star :count="list.starRating"></star>
                        </div>
                        <div class="distance" v-show="hasPos">距离:<span>{{ list.distance }}m</span></div>
                    </div>
                    <p class="comment">{{ list.profile }}</p>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script>
    import Star from '../../components/Star/Star.vue'
    import {baseURL} from '../../api/config'

    export default {
        created() {
            // 已经通过定位获取经纬度
            if (this.gps) {
                let gpsLong = this.gps.longitude;
                let gpsLat = this.gps.latitude;

                // 获取附近商户列表
                if (this.type === 'distance') {
                    this.updateList(`${baseURL}/wechat/store/nearBy?gpsLat=${gpsLat}&gpsLong=${gpsLong}`)
                }

                // 获取指定服务类型并且是附近的商户列表
                if (this.type === 'serviceType') {
                    this.updateList(`${baseURL}/wechat/store/findStoreByServiceType?gpsLat=${gpsLat}&gpsLong=${gpsLong}&limit=10&offset=0&page=0&serviceTypeId=${this.serviceTypeId}`)
                }
            } else {

            }
        },
        props: ['hasPos', 'type', 'gps', 'serviceTypeId'],
        data () {
            return {
                lists: []
            }
        },
        components: {
            Star
        },
        methods: {
            getList(api, cb) {
                this.$http.get(api).then(cb).catch(e => { console.log(e) })
            },
            updateList(api) {
                this.getList(api, res => {
                    let result = res.body;
                    if (result.code == '200') {
                        result.data.items.forEach(item => {
                            let {id, logo, storeName, starRating, distance, profile} = item;
                            let obj = {id, logo, storeName, starRating, distance, profile};
                            this.lists.push(obj);
                        })
                    }
                })
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable.styl"

    .list-item
        display flex
        box-sizing border-box
        padding 15px
        border-bottom 1px solid #ededed
        height 105px
        background-color #fff
        align-items center
        img
            width 75px !important
            height 75px
            border-radius 50%
            border none
            background-color aliceblue
        .list-item-content
            padding-left: 10px;
            position: relative;
            width 100%
            height 98%
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-box-pack justify
            .sale-name
                font-size $font-size-medium-x
                color $color-text-theme
            .star-con
                display flex
                align-items center
                .star
                    display flex
                    align-items center
                    flex 1
                    font-size $font-size-small
                    color $color-text-d
                .distance
                    position: absolute
                    top 0
                    right 0
                    display flex
                    justify-content flex-end
                    font-size $font-size-small
                    color $color-text-d
                    align-items center
                    span
                        font-size $font-size-medium-x
                        color $color-text-d
            .comment
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                width 170px
                font-size $font-size-small
                color $color-text-l
</style>
