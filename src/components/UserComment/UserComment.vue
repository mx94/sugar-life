<template>
    <div class="comment">
        <div class="title">用户评论</div>
        <div class="comment-con">
            <div class="list-item" v-for="comment in commentss" :key="comment.userId">
                <img :src="comment.userPhoto">
                <span class="username">{{ comment.nickName }}</span>
                <div class="content">
                    <p>{{ comment.comments }}</p>
                    <p>所选服务 <span>{{ comment.servicename }}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {baseURL} from '../../api/config'

    export default {
        props: ['page', 'storeId'],
        watch: {
            page(newPage) {
                this.updateList(newPage)
            }
        },
        created() {
            this.updateList(this.page)
        },
        data () {
            return {
                commentss: []
            }
        },
        components: {},
        methods: {
            updateList(page) {
                this.$http.get(`${baseURL}/wechat/store/comments?limit=10&page=${page}&businessId=${this.storeId}`).then(res => {
                    if (res.body.code == 200) {
                        if (!res.body.data.items.length) {
                            this.$emit('noData')
                            return
                        }

                        res.body.data.items.forEach(item => {
                            let {userId, nickName, comments, servicename, userPhoto} = item;
                            this.commentss.push({userId, nickName, comments, servicename, userPhoto});
                        })
                    }
                })
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .comment
        background-color #fff
        margin 10px 0 0
        .title
            padding-left 15px
            color #333
            font-size 14px
            height 40px
            line-height 40px
            border-bottom 1px solid #f0f0f0
        .comment-con
            padding 0 15px
            background-color #fff
        .list-item
            position: relative
            padding-bottom 10px
            min-height: 105px;
            border-bottom 1px solid #f0f0f0
            img
                position: absolute
                left 0
                top 10px
                width 30px
                height 30px
                border-radius 50%
            .username
                position: absolute
                left 40px
                top 18px
                font-size 12px
                color #6389cd
            .content
                position: absolute
                left 40px
                top 40px
                border 1px solid rgba(99, 135, 205, .3)
                border-radius 3px
                background-color rgba(99, 135, 205, .1)
                padding 10px
                width calc(100% - 40px)
                box-sizing border-box
                p:first-child
                    display -webkit-box
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    color #8b9da9
                    font-size 12px
                    line-height 1.4
                p:last-child
                    margin-top 10px
                    font-size 12px
                    color #cbcbcb
                    span
                        padding-left 15px
                        color #ff8b8a
                &::after
                    content ''
                    position: absolute
                    top -10px
                    left 15px
                    width 0
                    height 0
                    border 5px solid transparent
                    border-bottom-color rgba(99, 135, 205, .3)
</style>
