<template>
    <div>
        <!--轮播图-->
        <div v-if="info.imageList" class="slider-wrapper">
            <slider>
                <div v-for="image in info.imageList">
                    <img :src="image.imagePath"/>
                </div>
            </slider>
        </div>

        <div class="serv-con">
            <div class="title">
                <span class="dot"></span>
            </div>
            <div class="content">
                <p></p>
            </div>
        </div>

        <div class="pay-con">
            <span>￥888</span>
            <mt-button type="primary" size="small" class="btn-pay" @click="$router.push('/pay')">购买</mt-button>
        </div>
        <jump-back @jumpBack="$router.go(-1)"></jump-back>
    </div>
</template>
<script>
    import MtButton from "../../../node_modules/mint-ui/packages/button/src/button";
    import JumpBack from '../../components/JumpBack/JumpBack.vue'
    import Slider from '../../components/slider/slider.vue'
    import {baseURL} from '../../api/config'

    export default {
        created() {
            this.$http.get(`${baseURL}/wechat/storeService/${this.$route.params.id}`).then(res => {
                if (res.body.code == 200) {
                    let result = res.body;
                    console.log(result);
                }
            }).catch()
        },
        data () {
            return {
                info: []
            }
        },
        components: {
            MtButton,
            JumpBack
        },
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .pay-con
        position: fixed
        bottom 0
        width 100%
        height 65px
        line-height 65px
        display flex
        justify-content space-between
        align-items center
        background-color #fff
        box-shadow: -4px 2px 13px 0px rgba(180, 180, 180, .5)
        span
            margin-left 15px
            color #ff6743
            font-size 18px
        .btn-pay
            background-color #6389cd
            border-radius 100px
            margin-right 15px
            width 150px
    .serv-con
        padding 0 15px
        background-color #fff
        .title
            width 100%
            height 48px
            line-height 48px
            color #6389cd
            font-size 16px
            border-bottom 1px solid #f0f0f0
            .dot
                display inline-block
                width 10px
                height 10px
                border-radius 50%
                background-color #6389cd
        .content
            font-size 14px
            color #666
            line-height 1.4
</style>
