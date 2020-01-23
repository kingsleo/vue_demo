<template>
  <div>
    <header class="site-header jumbotron">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <h1>请发表对React的评论</h1>
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <Add :addComment="addComment"/>
      <List :comments="comments" :deleteComment="deleteComment"/>
    </div>
  </div>
</template>

<script>
    import Add from './components/Add'
    import List from './components/List'
    export default {
        data() {
            return {
                comments: [ // 数据在哪个组件，更新添加的数据方法就应该在哪个组件里面
                    {
                        'name': 'bob',
                        'content': 'hehe'
                    },
                    {
                        'name': 'tom',
                        'content': 'haha'
                    },
                    {
                        'name': 'lili',
                        'content': 'heihei'
                    }
                ]
            }
        },
        methods: {
            // 添加评论
            addComment(comment) {
                this.comments.unshift(comment)
            },
            // 删除指定下标的评论
            deleteComment(index) {
                this.comments.splice(index, 1)
            }
        },
        components: {Add, List}
    }
</script>

<style scoped>

</style>
