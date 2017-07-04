<template>
    <div class="list-con">
        <div v-for="list in lists" :key="list.id" class="list-item">
            <img :src="list.src">
            <div class="list-item-content">
                <span class="sale-name">{{ list.saleName }}</span>
                <p class="comment">{{ list.comment }}</p>
                <div class="star-con">
                    <span class="price">￥900</span>&nbsp;
                    <span>已售200</span>
                </div>
            </div>
            <div class="btn-con">
                <mt-button type="primary" size="small" class="btn" plain @click="payDetail">购买</mt-button>
            </div>
        </div>

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
                        saleName: '超值婴儿洗澡服务折扣',
                        star: 4,
                        distance: 200,
                        comment: '这是一个小孩游泳馆，体验特别的有用瞬间，你值得拥有'
                    },
                    {
                        id: 1,
                        src: 'http://avatar.csdn.net/C/B/D/1_u010014658.jpg',
                        saleName: '超值婴儿洗澡服务折扣',
                        star: 4,
                        distance: 200,
                        comment: '这是一个小孩游泳馆，体验特别的有用瞬间，你值得拥有'
                    }
                ]
            }
        },
        components: {MtButton},
        methods: {
            payDetail() {
                this.$router.push('/paydetail')
            },
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
                    font-size 16px
                    color #333
                    width 145px
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                .comment
                    flex 1
                    font-size 12px
                    color #666
                    width 170px
                    overflow hidden
                    text-overflow ellipsis
                    white-space nowrap
                .star-con
                    flex 1
                    .price
                        color #ff6743
                        font-size 14px
                    span
                        font-size 12px
                        color #999
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
            .icon-up
                transform: rotate(90deg);
                display: inline-block;
</style>
