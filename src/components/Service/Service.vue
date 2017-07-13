<template>
    <div class="list-con">
        <router-link v-for="(list, idx) in lists" :key="idx" class="list-item" tag="div" :to="`/paydetail/${list.id}`">
            <img :src="list.image">
            <div class="list-item-content">
                <span class="sale-name">{{ list.serviceName }}</span>
                <p class="comment">{{ list.serviceDetail }}</p>
                <div class="star-con">
                    <span class="price">￥{{list.unitPrice}}</span>&nbsp;
                    <span>已售{{list.saleNumber}}</span>
                </div>
            </div>
            <div class="btn-con">
                <mt-button type="primary" size="small" class="btn" plain @click.stop="gotoPay(list.id)">购买
                </mt-button>
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
    import {getCookie} from '../../common/js/utils'

    export default {
        created() {
            this.getServiceList('some')
        },
        data () {
            return {
                isShow: false,
                lists: []
            }
        },
        components: {MtButton},
        methods: {
            gotoPay(id) {
                if (getCookie('token')) {
                    this.$router.push(`/pay/${id}`)
                } else {
                    this.$router.push('/mine')
                }
            },
            slideDown() {
                this.isShow = !this.isShow
                this.getServiceList('all')
            },
            slideUp() {
                this.isShow = !this.isShow
                this.getServiceList('some')
            },
            getServiceList(flag = 'all') {
                let storeId = this.$route.params.id;
                this.$http.get(`${baseURL}/wechat/storeService?page=1&offset=0&storeId=${storeId}`).then(res => {
                    let result = res.body;
                    if (result.code == 200) {
                        let arr = []
                        result.data.items.forEach((item, idx) => {
                            let {
                                id,
                                unitPrice,
                                saleNumber,
                                serviceDetail,
                                imageList,
                                serviceName
                            } = item;

                            let obj = {
                                id,
                                unitPrice,
                                saleNumber,
                                serviceDetail,
                                image: imageList[0].imagePath,
                                serviceName
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
                    border-color #6389cd
                    color #6389cd
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
