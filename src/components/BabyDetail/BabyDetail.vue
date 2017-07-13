<template>
    <div class="con">
        <div class="logo-con">
            <img :src="infos.photos">
            <span>{{infos.name}}</span>
        </div>

        <div class="detail">
            <div class="info">
                <div class="title">简介：</div>
                <div class="content" v-html="infos.profile"></div>
                <div class="worktime">
                    <span class="text">工作时间：</span>
                    <div class="con">
                        <div v-for="day in infos.workDay" style="display: inline-block">{{day}}</div>
                    </div>
                </div>

                <div class="tit">证件：</div>
                <div class="tit-con">
                    <img v-for="(img, idx) in imageList" :src="img.imagePath" :key="idx">
                </div>
            </div>
        </div>

        <jump-back @jumpBack="$router.go(-1)"></jump-back>
    </div>
</template>
<script>
    import JumpBack from '../../components/JumpBack/JumpBack.vue'
    import {baseURL} from '../../api/config'

    export default {
        created() {
            this.$http.get(`${baseURL}/wechat/nurseryTeacher/${this.$route.params.id}`).then(res => {
                if (res.body.code == 200) {
                    console.log(res.body.data);
                    let {name, photos, profile, workDays, imageList} = res.body.data;
                    // TODO: imageList
                    this.infos = {
                        name, photos, profile, imageList,
                        workDay: workDays.split('，')
                    };
                }
            })
        },
        data () {
            return {
                infos: {
                    imageList: []
                }
            }
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
