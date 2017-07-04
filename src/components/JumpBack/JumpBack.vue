<template>
    <div class="back-btn" @click="jumpback"></div>
</template>
<script>
    export default {
        data () {
            return {}
        },
        components: {},
        methods: {
            jumpback() {
                this.$emit('jumpBack')
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    .back-btn
        width 30px
        height 30px
        background-image url("icon_return_round@3x.png")
        background-repeat no-repeat
        background-size 30px 30px
        position absolute
        left 10px
        top 10px
</style>
