<template>
    <div>
        <mt-header title="门店列表" class="header">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <sale-list :hasPos="hasPos" :serviceTypeId="serviceTypeId" :gps="positions" :type="serviceType"></sale-list>
        <load-more :hasMore="hasMore"></load-more>
        <d-tooltip></d-tooltip>
    </div>
</template>
<script>
    import {Header} from 'mint-ui';
    import MtHeader from "../../../node_modules/mint-ui/packages/header/src/header";
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button";
    import SaleList from '../../components/SaleList/SaleList.vue'
    import LoadMore from '../../components/LoadMore/LoadMore.vue'
    import DTooltip from '../../components/DTooltip/DTooltip.vue'
    import {mapState, mapActions, mapGetters} from 'vuex';
    import * as types from '../../store/types';

    export default {
        computed: {
            ...mapState(['positions', 'hasPos'])
        },
        created() {
            this.serviceTypeId = this.$route.params.serviceTypeId;
            if (this.hasPos) {
                this.serviceType = 'serviceType';
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
                hasMore: true,
                serviceType: '',
                serviceTypeId: '',
            }
        },
        components: {
            MtButton,
            MtHeader,
            SaleList,
            LoadMore,
            DTooltip
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable.styl"

    .header
        background-color $color-theme
        height 49px
</style>
