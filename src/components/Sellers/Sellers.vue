<template>
    <div>
        <mt-header title="门店列表" class="header">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <sale-list :hasPos="hasPos" :serviceTypeId="serviceTypeId" :gps="gps" :type="serviceType"></sale-list>
        <load-more :hasMore="hasMore"></load-more>
    </div>
</template>
<script>
    import { Header } from 'mint-ui';
    import MtHeader from "../../../node_modules/mint-ui/packages/header/src/header";
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button";
    import SaleList from '../../components/SaleList/SaleList.vue'
    import LoadMore from '../../components/LoadMore/LoadMore.vue'

    export default {
        created() {
            this.serviceTypeId = this.$route.params.serviceTypeId;
            if (localStorage.getItem('gps')) {
                this.hasPos = true;
                this.serviceType = 'serviceType';
                this.gps = JSON.parse(localStorage.getItem('gps'));
            } else {
                // 以下三条是电脑上获取不到GPS时模拟测试用的
                this.hasPos = true;
                this.serviceType = 'serviceType';
                this.gps = {
                    latitude: 12,
                    longitude: 13
                }
            }
        },
        data () {
            return {
                hasPos: false,
                hasMore: true,
                serviceType: '',
                serviceTypeId: '',
                gps: ''
            }
        },
        components: {
            MtButton,
            MtHeader,
            SaleList,
            LoadMore
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable.styl"

    .header
        background-color $color-theme
        height 49px
</style>
