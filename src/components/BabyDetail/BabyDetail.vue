<template>
    <div class="con">
        <div class="logo-con">
            <img src="http://avatar.csdn.net/C/B/D/1_u010014658.jpg">
            <span>李晓</span>
        </div>

        <div class="detail">
            <div class="info">
                <div class="title">简介：</div>
                <div class="content">
                    我爱我妻母婴护理中心，就是希望中国的妈妈们不要再因坐不好月子而担心，而留下月子病，而且对月嫂进行严格的身份认证和资格认证，消费者根据自己的需要订制服务。“郑州我爱我妻”真正的解决中国妈妈所有和月子相关的问题，让能够轻松、健康、愉快的渡过人生中最重要的一个月。
                </div>
                <div class="worktime">
                    <span class="text">工作时间：</span>
                    <div class="con">
                        <div>星期一</div>
                        <div>星期二</div>
                        <div>星期三</div>
                        <div>星期一</div>
                        <div>星期二</div>
                        <div>星期三</div>
                    </div>
                </div>

                <div class="tit">证件：</div>
                <div class="tit-con">
                    <img src="http://gjb4.95081.com/dataFile/gjbv40/person/photo/201410/05/VFWGAXSP_180.jpg">
                </div>
            </div>
        </div>

        <jump-back @jumpBack="$router.go(-1)"></jump-back>
    </div>
</template>
<script>
    import JumpBack from '../../components/JumpBack/JumpBack.vue'

    export default {
        data () {
            return {}
        },
        components: {
            JumpBack
        },
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .con
        position: relative
        .logo-con
            width 100vw
            height 64vw
            background-color #6389cd
            img
                width 21.33vw
                height 21.33vw
                border-radius 50%
                position: absolute
                top 16vw
                left 50%
                transform translateX(-50%)
            span
                width 21.33vw
                height 10vw
                line-height 10vw
                position: absolute
                top 40vw
                left 50%
                transform translateX(-50%)
                text-align center
                color #fff
        .detail
            box-sizing border-box
            width 100%
            padding 0 15px
            position: absolute
            top 50vw
            .info
                padding 0 30px 30px
                background-color #fff
                border-radius 10px
                .title
                    height 14vw
                    line-height 14vw
                    border-bottom 1px solid #f0f0f0
                    font-size 16px
                    color #999
                .content
                    font-size 12px
                    color #666
                    padding 15px 0
                    line-height 1.5
                    border-bottom 1px solid #f0f0f0
                .worktime
                    border-bottom 1px solid #f0f0f0
                    padding-bottom 20px
                    .text
                        height 14vw
                        line-height 14vw
                        font-size 16px
                        color #999
                    .con
                        width 100%
                        display flex
                        flex-wrap wrap
                        div
                            width 33%
                            height 35px
                            line-height 35px
                            text-align center
                            color #333
                .tit
                    height 14vw
                    line-height 14vw
                    font-size 16px
                    color #999
                .tit-con
                    width 100%
                    img
                        width 100%
                        height auto
</style>
