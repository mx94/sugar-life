<template>
    <div>
        <router-link :to="`/detail/${list.id}/service`" v-for="list in lists" :key="list.id">
            <div class="list-item">
                <div class="img-con"><img :src="list.logo"></div>
                <div class="list-item-content">
                    <span class="sale-name">{{ list.storeName }}</span>
                    <div class="star-con">
                        <div class="star">
                            <star :count="list.starRating"></star>
                        </div>
                        <div class="distance" v-show="hasPos && !isOtherCity">距离:<span>{{ list.distance }}m</span>
                        </div>
                        <div class="distance cityname" v-show="isOtherCity && type == 'serviceType'">{{list.cityName}}</div>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script>
    import Star from '../../components/Star/Star.vue'
    import Toast from '../../../node_modules/mint-ui/packages/toast'
    import {baseURL} from '../../api/config'
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters(['ctName', 'otherCityName', 'isOtherCity', 'psitions'])
        },
        watch: {
            page(newPage, oldPage) {
                this._getData(newPage)
            },
            hasPos(val) {
                this.flag = val
            },
            ctName(newVal, oldVal) {
                this._getData(this.page)
            }
        },
        created() {
            this._getData(this.page)
        },
        props: ['hasPos', 'type', 'allStoreType', 'gps', 'serviceTypeId', 'page'],
        data () {
            return {
                lists: [],
                flag: true
            }
        },
        components: {
            Star
        },
        methods: {
            _getData(page) {
                // 已经通过定位获取经纬度
                if (this.gps) {
                    let gpsLong = this.gps.longitude;
                    let gpsLat = this.gps.latitude;

                    // 获取附近商户列表
                    if (this.type === 'distance') {
                        if (this.isOtherCity) {
                            // 选择的城市不是当前定位的城市
                            this.updateList(`${baseURL}/wechat/store?page=${page}&cityName=${this.otherCityName}`)
                        } else {
                            // 选择的城市就是当前城市
                            this.updateList(`${baseURL}/wechat/store/nearBy?gpsLat=${gpsLat}&gpsLong=${gpsLong}&page=${page}&cityName=${this.ctName}`)
                        }
                    }

                    // 获取指定服务类型并且是附近的商户列表
                    if (this.type === 'serviceType') {
                        if (this.serviceTypeId === '4396') {
                            if (this.isOtherCity) {
                                this.updateList(`${baseURL}/app/store/findAllStore?cityName=${this.otherCityName}&limit=10&page=${page}&gpsLat=${gpsLat}&gpsLong=${gpsLong}`);
                            } else {
                                this.updateList(`${baseURL}/app/store/findAllStore?cityName=${this.ctName}&limit=10&page=${page}&gpsLat=${gpsLat}&gpsLong=${gpsLong}`);
                            }
                        } else {
                            if (this.isOtherCity) {
                                this.updateList(`${baseURL}/app/store/findStoreByServiceType?gpsLat=${gpsLat}&gpsLong=${gpsLong}&page=${page}&serviceTypeId=${this.serviceTypeId}&cityName=${this.otherCityName}`)
                            } else {
                                this.updateList(`${baseURL}/app/store/findStoreByServiceType?gpsLat=${gpsLat}&gpsLong=${gpsLong}&page=${page}&serviceTypeId=${this.serviceTypeId}&cityName=${this.ctName}`)
                            }
                        }
                    }
                }
            },
            getList(api, cb) {
                this.$http.get(api).then(cb).catch(e => {
                    if (e.status == '404') {
                        Toast({
                            message: '获取列表失败',
                            position: 'bottom',
                            duration: 2000,
                            className: 'toast-class'
                        })
                        this.$emit('noData')
                    }
                })
            },
            updateList(api) {
                this.getList(api, res => {
                    let result = res.body;
                    if (result.code == '200') {
                        if (!result.data.items.length) {
                            this.$emit('noData')
                            return
                        }
                        result.data.items.forEach(item => {
                            let {id, logo, storeName, starRating, distance, profile, cityName} = item;
                            this.lists.push({id, logo, storeName, starRating, distance, profile, cityName});
                        })
                    } else {
                        Toast({
                            message: result.message,
                            position: 'bottom',
                            duration: 800,
                            className: 'toast-class'
                        })
                        this.$emit('noData')
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
        .img-con
            display inline-block
            width 20vw
            height 20vw
            img
                width 100%
                height 100%
                border-radius 50%
                border none
                background-color aliceblue
        .list-item-content
            padding-left: 10px;
            position: relative;
            width calc(100% - 20vw)
            height 98%
            display flex
            flex-direction column
            .sale-name
                flex 1
                font-size $font-size-medium-x
                color $color-text-theme
                @media only screen and (max-width: 330px)
                    font-size 14px
            .star-con
                flex 1
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
                    top 50%
                    right 0
                    display flex
                    justify-content flex-end
                    font-size $font-size-small
                    color $color-text-d
                    align-items center
                    transform translateY(-50%)
                    span
                        font-size $font-size-medium-x
                        color $color-text-d
                    &.cityname
                        font-size 14px
            .comment
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                width 170px
                font-size $font-size-small
                color $color-text-l

    .toast-class
        font-size 12px
</style>
