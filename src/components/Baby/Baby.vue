<template>
    <div class="list-con">
        <router-link to="/babydetail" v-for="list in lists" :key="list.id" class="list-item">
            <img :src="list.src">
            <div class="list-item-content">
                <span class="sale-name">{{ list.saleName }}</span>
                <p class="comment">{{ list.comment }}</p>
                <div class="star-con">
                    工作时间：<span class="work-time">{{list.workTime}}</span>
                </div>
            </div>
        </router-link>

        <!--查看全部-->
        <div class="view-more">
            <span v-if="!isShow" @click="slideDown">查看全部 &nbsp; <i class="mintui mintui-back icon-down"></i></span>
            <span v-if="isShow" @click="slideUp">收起 &nbsp; <i class="mintui mintui-back icon-up"></i></span>
        </div>
    </div>
</template>
<script>
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button";
    export default {
        data () {
            return {
                isShow: false,
                lists: [
                    {
                        id: 0,
                        src: 'http://avatar.csdn.net/C/B/D/1_u010014658.jpg',
                        saleName: '芳姐',
                        comment: '育婴师，最好的育婴师的等待的',
                        workTime: '星期一，星期二，星期三'
                    },
                    {
                        id: 1,
                        src: 'http://avatar.csdn.net/C/B/D/1_u010014658.jpg',
                        saleName: '芳姐',
                        comment: '育婴师，最好的育婴师的等待的',
                        workTime: '星期一，星期二，星期三'
                    }
                ]
            }
        },
        components: {MtButton},
        methods: {
            slideDown() {
                this.isShow = !this.isShow
                this.lists = this.lists.concat(this.lists)
            },
            slideUp() {
                this.isShow = !this.isShow
                this.lists = this.lists.slice(0, 2)
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable.styl"

    .list-con
        background-color #fff
        padding 0 15px
        .list-item
            display flex
            align-items center
            justify-content center
            padding 15px 0
            border-bottom 1px solid #f0f0f0
            img
                width 75px
                height 75px
                border-radius 50%
            .list-item-content
                display flex
                flex-direction column
                flex 2
                display -webkit-box
                -webkit-box-orient vertical
                -webkit-box-pack justify
                line-height 24px
                padding-left 5px
                .sale-name
                    flex 1
                    font-size 14px
                    color #333
                    width 145px
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                .comment
                    flex 1
                    font-size 12px
                    color #999
                    width 170px
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                .star-con
                    flex 1
                    font-size 12px
                    .work-time
                        color #333
                        overflow hidden
                        text-overflow ellipsis
                        white-space nowrap
                        width 125px
            .btn-con
                flex 1
                text-align right
                .btn
                    font-size 12px
                    padding 0 4px
                    width 98%
        .view-more
            text-align center
            height 32px
            line-height 32px
            font-size 12px
            color #999
            .icon-down
                transform: rotate(-90deg);
                display: inline-block;
</style>
