<template>
    <div>
        星级：<i :class="['iconfont', 'font', arr[idx]]" v-for="(item, idx) in arr"></i> {{ count }}星
    </div>
</template>
<script>
    export default {
        created() {
            this.buildStar()
        },
        props: {
            count: {
                type: Number,
                default: 5
            }
        },
        data () {
            return {
                arr: []
            }
        },
        components: {},
        methods: {
            buildStar() {
                for (let i = 1; i <= 5; i++) {
                    if (i <= Math.floor(this.count)) {
                        this.arr.push('icon-collection_fill')
                    } else {
                        this.arr.push('icon-collection')
                    }
                }
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .font
        color #ff6743
</style>
