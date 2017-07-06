<template>
    <div style="padding-top: 10px">
        <div class="rows">
            <router-link v-for="(item, index) in items" :to="`/sellers/${item.id}`" class="link" tag="div" :key="index">
                <div class="image"><img :src="item.serviceTypeLogo"></div>
                <div class="text">{{ item.serviceTypeName }}</div>
            </router-link>
        </div>
    </div>
</template>
<script>
    import {baseURL} from '../../api/config'

    export default {
        created() {
            this.$http.get(baseURL + '/wechat/storeService/serviceTypeList').then(res => {
                if (res.body.code == '200') {
                    res.body.data.forEach(item => {
                        let obj = {};
                        let {id, serviceTypeLogo, serviceTypeName} = item;
                        obj.id = id;
                        obj.serviceTypeLogo = serviceTypeLogo;
                        obj.serviceTypeName = serviceTypeName;
                        this.items.push(obj)
                    })
                }
            }).catch()
        },
        data () {
            return {
                items: []
            }
        },
        components: {},
        methods: {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable.styl"
    @import "~common/stylus/mixin.styl"

    .rows
        display flex
        width 100%
        align-items center
        justify-content flex-start
        flex-wrap: wrap
        background-color #fff
        .link
            box-sizing border-box
            display flex
            align-items center
            justify-content center
            flex-direction column
            width 33.3%
            height 88px
            border-bottom 1px solid #ededed
            border-right 1px solid #ededed
            background-color #fff
            &:last-child
                border-right 1px solid #ededed
            .image
                display flex
                flex 2
                align-items center
                img
                    width 35px
                    height 35px
            .text
                flex 1
                font-size $font-size-medium
                color $color-text
</style>
