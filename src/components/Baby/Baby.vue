<template>
    <div class="list-con">
        <router-link :to="`/babydetail/${list.id}`" v-for="list in lists" :key="list.id" class="list-item">
            <div class="img-con"><img :src="list.photos"></div>
            <div class="list-item-content">
                <span class="sale-name">{{ list.name }}</span>
                <p class="comment" v-html="list.profile"></p>
                <div class="star-con">
                    工作时间：<span class="work-time">{{list.workDays}}</span>
                </div>
            </div>
        </router-link>

        <!--查看全部-->
        <div class="view-more" v-show="this.lists.length > 1">
            <span v-if="!isShow" @click="slideDown">查看全部 &nbsp; <i class="mintui mintui-back icon-down"></i></span>
            <span v-if="isShow" @click="slideUp">收起 &nbsp; <i class="mintui mintui-back icon-up"></i></span>
        </div>
    </div>
</template>
<script>
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button";
    import {baseURL} from '../../api/config'

    export default {
        created() {
            this.getTeacherList('some')
        },
        data () {
            return {
                isShow: false,
                lists: []
            }
        },
        components: {MtButton},
        methods: {
            slideDown() {
                this.isShow = !this.isShow
                this.getTeacherList('all')
            },
            slideUp() {
                this.isShow = !this.isShow
                this.getTeacherList('some')
            },
            getTeacherList(flag = 'all') {
                let storeId = this.$route.params.id;
                this.$http.get(`${baseURL}/wechat/nurseryTeacher?limit=10&page=1&offset=0&storeId=${storeId}`).then(res => {
                    let result = res.body;
                    console.log(result);
                    if (result.code == 200) {
                        let arr = []
                        result.data.items.forEach((item, idx) => {
                            let {
                                name,
                                photos,
                                profile,
                                workDays,
                                id
                            } = item;

                            let obj = {
                                name,
                                photos,
                                profile,
                                workDays,
                                id
                            }

                            if (flag === 'some') {
                                if (idx >= 2) return
                            }
                            arr.push(obj)
                            this.lists = arr

                        })
                    }
                }).catch()
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
            .img-con
                display inline-block
                width 20vw
                height 20vw
                img
                    width 100%
                    height 100%
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
                    overflow hidden
                    .work-time
                        color #333
                        overflow hidden
                        text-overflow ellipsis
                        display -webkit-box
                        -webkit-line-clamp 2
                        -webkit-box-orient vertical
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
