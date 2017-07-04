<template>
    <div>
        <mt-header title="门店列表" class="header">
            <router-link to="/" slot="left">
                <mt-button icon="back"></mt-button>
            </router-link>
        </mt-header>
        <sale-list :hasPos="hasPos"></sale-list>
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
        data () {
            return {
                hasPos: false,
                hasMore: true
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
