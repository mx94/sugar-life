<template>
    <div class="nearby">
        <div class="title">
            <span v-if="hasPos" class="title-nearby">附近门店</span>
            <span v-if="!hasPos" class="title-non">请开启定位获取更精确定位服务</span>
        </div>
    </div>
</template>
<script>
    import {getCookie} from '../../common/js/utils'
    import {mapState, mapActions, mapGetters} from 'vuex';
    import * as types from '../../store/types';

    export default {
        computed: {
            ...mapState(['hasPos'])
        },
        data () {
            return {
            }
        },
        components: {},
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable.styl"

    .nearby
        background-color #fff
        margin-top 10px
        .title
            height 36px
            border-bottom 1px solid #ededed
            text-align center
            line-height 36px
            .title-nearby
                color $color-text-d
                font-size $font-size-medium
            .title-non
                color: #f74544
                font-size $font-size-small
</style>
