<template>
    <div class="has-more" ref="more">
        <div v-show="hasMore">加载更多</div>
        <div v-show="!hasMore">我是有底线的</div>
    </div>
</template>
<script>
    export default {
        mounted() {
            window.addEventListener('scroll', this.scrolling);
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.scrolling);
        },
        props: {
            hasMore: {
                type: Boolean,
                default: true
            },
            isLoading: {
                type: Boolean,
                defalt: true
            }
        },
        data () {
            return {
                isLogined: false,
                $timer: null
            }
        },
        components: {},
        methods: {
            scrolling() {
                clearTimeout(this.$timer);
                this.$timer = setTimeout(() => {
                    if (this.isLoading) {
                        return;
                    }

                    let screen = window.screen.height;
                    let top = this.$refs.more.getBoundingClientRect().top;
                    if (top < screen) {
                        this.$emit('needData')
                    }
                }, 50);
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
