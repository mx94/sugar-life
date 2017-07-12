<template>
    <div>
        <home-header></home-header>
        <div class="main">
            <type-show></type-show>
            <neighborhood></neighborhood>
            <sale-list :hasPos="hasPos" type="distance" :gps="psitions" :page="page" @noData="noData"></sale-list>
            <load-more :hasMore="hasMore" @needData="needData"></load-more>
        </div>
        <d-tooltip></d-tooltip>
    </div>
</template>
<script>
    import HomeHeader from '../../components/HomeHeader/HomeHeader.vue'
    import TypeShow from '../../components/TypeShow/TypeShow.vue'
    import Neighborhood from '../../components/Neighborhood/Neighborhood.vue'
    import SaleList from '../../components/SaleList/SaleList.vue'
    import LoadMore from '../../components/LoadMore/LoadMore.vue'
    import DTooltip from '../../components/DTooltip/DTooltip.vue'
    import {baseURL} from '../../api/config'
    import {mapState, mapActions, mapGetters} from 'vuex';
    import * as types from '../../store/types';
    import {getCookie} from '../../common/js/utils'

    export default {
        created() {
            alert(location.search)
        },
        computed: {
            ...mapState(['hasPos']),
            ...mapGetters(['ctName', 'hasPsition', 'psitions'])
        },
        data () {
            return {
                hasMore: true,
                page: 1,
            }
        },
        components: {
            HomeHeader,
            TypeShow,
            Neighborhood,
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
    .main
        padding 0 15px
</style>
