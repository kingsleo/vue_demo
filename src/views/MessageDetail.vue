<template>
  <ul>
    <p>ID: {{$route.params.id}}</p>
    <li>id: {{messageDetail.id}}</li>
    <li>title: {{messageDetail.title}}</li>
    <li>content: {{messageDetail.content}}</li>
  </ul>
</template>

<script>
    export default {
        name: 'MessageDetail',
        data() {
            return {
                messageDetail: {}
            }
        },
        mounted() {
            setTimeout(() => {
                const allMessageDetails = [
                    {
                        id: 1,
                        title: 'title01',
                        content: 'content01'
                    },
                    {
                        id: 2,
                        title: 'title02',
                        content: 'content02'
                    },
                    {
                        id: 3,
                        title: 'title03',
                        content: 'content03'
                    },
                    {
                        id: 4,
                        title: 'title04',
                        content: 'content04'
                    }
                ]
                this.allMessageDetails = allMessageDetails
                const id = this.$route.params.id * 1
                this.messageDetail = allMessageDetails.find(detail => detail.id === id)
            }, 1000)
        },
        watch: {
            $route: function () { // 改变当前路由组件参数数据时自动调用
                console.log('$route()')
                const id = this.$route.params.id
                console.log(id)
                this.messageDetail = this.allMessageDetails.find(detail => detail.id === id * 1)
            }
        }
    }
</script>

<style scoped>

</style>
