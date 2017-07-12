<template>
    <div class="comment">
        <div class="title">用户评论</div>
        <div class="comment-con">
            <div class="list-item" v-for="comment in comments" :key="comment.id">
                <img :src="comment.src">
                <span class="username">{{ comment.username }}</span>
                <div class="content">
                    <p>{{ comment.content }}</p>
                    <p>所选服务 <span>{{ comment.service }}</span></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {baseURL} from '../../api/config'

    export default {
        props: ['page'],
        created() {
            this.$http.get(`${baseURL}/wechat/comments?limit=10&page=1&offset=0&businessId=${this.page}`).then(res => {
                if (res.body.code == 200) {
                    res.body.data.forEach(item => {
                        let {userId, nickName, comments, servicename, userPhoto} = item;
                        this.comments.push({userId, nickName, comments, servicename, userPhoto})
                    })
                }
            })
        },
        data () {
            return {
                comments: [
                    {
                        id: 0,
                        src: 'http://avatar.csdn.net/C/B/D/1_u010014658.jpg',
                        username: '小宝妈妈',
                        content: '这里环境真的不错，1号育婴师很nice,1号育婴师很nice1号育婴师很nice1号育婴师很nice1号育婴师很nice1号育婴师很nice1号育婴师很nice',
                        service: '游泳'
                    },
                    {
                        id: 2,
                        src: 'http://avatar.csdn.net/C/B/D/1_u010014658.jpg',
                        username: '小宝爸爸',
                        content: '这里环境真的不错，1号育婴师很nice,1号育婴师很nice1号育婴师很nice1号育婴师很nice1号育婴师很nice1号育婴师很nice1号育婴师很nice',
                        service: '跑步'
                    }
                ]
            }
        },
        components: {},
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .comment
        background-color #fff
        margin 10px 0
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
            min-height: 130px;
            border-bottom 1px solid #f0f0f0
            img
                position: absolute
                left 0
                top 10px
                width 30px
                height 30px
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
                p:first-child
                    display: -webkit-box;
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
