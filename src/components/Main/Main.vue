<template>
    <div>
        <home-header @hasPos="changePosState"></home-header>
        <div class="main">
            <type-show></type-show>
            <neighborhood :hasPos="hasPos"></neighborhood>
            <sale-list :hasPos="hasPos" type="distance" :gps="obj"></sale-list>
            <load-more :hasMore="hasMore"></load-more>
        </div>
    </div>
</template>
<script>
    import HomeHeader from '../../components/HomeHeader/HomeHeader.vue'
    import TypeShow from '../../components/TypeShow/TypeShow.vue'
    import Neighborhood from '../../components/Neighborhood/Neighborhood.vue'
    import SaleList from '../../components/SaleList/SaleList.vue'
    import LoadMore from '../../components/LoadMore/LoadMore.vue'
    import {baseURL} from '../../api/config'

    export default {
        created() {
        },
        data () {
            return {
                hasPos: false,
                hasMore: true,
                obj: {}
            }
        },
        components: {
            HomeHeader,
            TypeShow,
            Neighborhood,
            SaleList,
            LoadMore
        },
        methods: {
            changePosState(obj) {
                this.hasPos = true;
                this.obj = obj;
                localStorage.setItem('gps', JSON.stringify(obj));
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .main
        padding 0 15px
</style>
