<template>
    <div class="has-more">
        <div @click="loadMore" v-show="hasMore">加载更多</div>
        <div v-show="!hasMore">我是有底线的</div>
    </div>
</template>
<script>
    export default {
        props: ['hasMore'],
        data () {
            return {}
        },
        components: {},
        methods: {
            loadMore() {

            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .has-more {
        line-height: 32px;
        text-align: center;
        border-top: 1px solid #d5d5d5;
        color: #ccc;
    }
</style>
