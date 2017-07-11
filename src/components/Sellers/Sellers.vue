<template>
    <div>
        <mt-header title="门店列表" class="header">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <sale-list
            :hasPos="hasPsition"
            :serviceTypeId="serviceTypeId"
            :gps="positions"
            :type="serviceType"
            :allStoreType="allStoreType"
            :page="page"
            :otherCityFlag="isOtherCity"
            @noData="noData"
        ></sale-list>
        <load-more :hasMore="hasMore" @needData="needData"></load-more>
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
            ...mapState(['positions']),
            ...mapGetters(['hasPsition', 'isOtherCity'])
        },
        created() {
            this.serviceTypeId = this.$route.params.serviceTypeId;
            this.serviceType = 'serviceType';
            this.allStoreType = null;
        },
        data () {
            return {
                hasMore: true,
                serviceType: '',
                serviceTypeId: '',
                page: 0
            }
        },
        components: {
            MtButton,
            MtHeader,
            SaleList,
            LoadMore,
            DTooltip
        },
        methods: {
            needData() {
                if (this.hasMore) {
                    this.page++
                }
            },
            noData() {
                this.hasMore = false
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable.styl"

    .header
        background-color $color-theme
        height 49px
</style>
