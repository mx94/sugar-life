<template>
    <div>
        <router-link :to="`/detail/service?id=${list.id}`" v-for="list in lists" :key="list.id">
            <div class="list-item">
                <img :src="list.src">
                <div class="list-item-content">
                    <span class="sale-name">{{ list.saleName }}</span>
                    <div class="star-con">
                        <div class="star">星级：++++ {{ list.star }}星</div>
                        <div class="distance" v-show="hasPos">距离：<span>{{ list.distance }}m</span></div>
                    </div>
                    <p class="comment">{{ list.comment }}</p>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script>
    export default {
        props: ['hasPos'],
        data () {
            return {
                lists: [
                    {
                        id: 0,
                        src: 'http://avatar.csdn.net/C/B/D/1_u010014658.jpg',
                        saleName: '店铺名称',
                        star: 4,
                        distance: 200,
                        comment: '这是一个小孩游泳馆，体验特别的有用瞬间，你值得拥有'
                    },
                    {
                        id: 1,
                        src: 'http://avatar.csdn.net/C/B/D/1_u010014658.jpg',
                        saleName: '店铺名称',
                        star: 4,
                        distance: 200,
                        comment: '这是一个小孩游泳馆，体验特别的有用瞬间，你值得拥有'
                    },
                    {
                        id: 2,
                        src: 'http://avatar.csdn.net/C/B/D/1_u010014658.jpg',
                        saleName: '店铺名称',
                        star: 4,
                        distance: 200,
                        comment: '这是一个小孩游泳馆，体验特别的有用瞬间，你值得拥有'
                    },
                    {
                        id: 3,
                        src: 'http://avatar.csdn.net/C/B/D/1_u010014658.jpg',
                        saleName: '店铺名称',
                        star: 4,
                        distance: 200,
                        comment: '这是一个小孩游泳馆，体验特别的有用瞬间，你值得拥有'
                    }
                ]
            }
        },
        components: {},
        methods: {}
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
            width 75px
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
                    flex 1
                    font-size $font-size-small
                    color $color-text-d
                .distance
                    display flex
                    flex 1
                    justify-content flex-end
                    font-size $font-size-small
                    color $color-text-d
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
