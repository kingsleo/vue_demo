<template>
  <div>
    <ul>
      <li v-for="(message, index) in messages" :key="index">
        <router-link :to="`/home/message/detail/${message.id}`">{{message.title}}</router-link>
        <button @click="pushShow(message.id)">push查看</button>
        <button @click="replaceShow(message.id)">replace查看</button>
      </li>
    </ul>
    <button @click="$router.back()">回退</button>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: 'Message',
        data() {
            return {
                messages: []
            }
        },
        mounted() {
            setTimeout(() => {
                this.messages = [
                    {
                        id: 1,
                        title: 'message01'
                    },
                    {
                        id: 2,
                        title: 'message02'
                    },
                    {
                        id: 3,
                        title: 'message03'
                    }
                ]
            }, 1000)
        },
        methods: {
            pushShow(id) {
                this.$router.push(`/home/message/detail/${id}`)
            },
            replaceShow(id) {
                this.$router.replace(`/home/message/detail/${id}`)
            }
        }
    }
</script>

<style scoped>

</style>
