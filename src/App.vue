<template>
    <router-view></router-view>
</template>
<script>
    import {baseURL} from './api/config'

    export default {
        created() {
            this.code = this.getCode();
            this.$http.get(`${baseURL}/wechat/getOpenId?code=${this.code}`).then(res => {
                console.log(res.body)
                if (res.body.code == 200) {
                    alert(res.body)
                    localStorage.setItem('openId', res.body.data.openId);
                    alert(localStorage.getItem('openId'))
                }
            })
        },
        data () {
            return {
                obj: null,
                code: ''
            }
        },
        components: {},
        methods: {
            getCode() {
                this.obj = {};
                var reg = /([^?=&]+)=([^?=&]+)/g;
                window.location.search.replace(reg, function() {
                    this.obj[arguments[1]] = arguments[2];
                });
                return this.obj.code
            }
        }
    }
</script>
<style scoped lang="stylus">

</style>
