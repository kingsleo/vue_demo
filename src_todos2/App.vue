<template>
  <div class="todo-container">
    <div class="todo-wrap">
<!--      <TodoHeader @addTodoItem="addTodoItem"/>&lt;!&ndash; 给TodoHeader数据对象绑定addTodoItem的事件监听 &ndash;&gt;-->
      <TodoHeader ref="header"/>
      <TodoList :todos="todos"/>
      <TodoFooter>
        <input type="checkbox" @click="selectAllTodos" v-model="isAllCheck" slot="checkAll"/>
        <span slot="count">已完成{{completeSize}} / 全部{{todos.length}}</span>
        <button class="btn btn-danger" @click="deleteCompleteItem" v-show="completeSize" slot="delete">清除已完成任务</button>
      </TodoFooter>
    </div>
  </div>
</template>

<script>
    import PubSub from 'pubsub-js'
    import TodoHeader from './components/TodoHeader'
    import TodoList from './components/TodoList'
    import TodoFooter from './components/TodoFooter'
    import storageUtil from './util/storageUtil'
    export default {
        name: 'App.vue',
        data() {
            return {
                // 从LocalStorage读取数据
                todos: storageUtil.readTodos()
            }
        },
        computed: {
            completeSize() {
                return this.todos.reduce((preTotal, todo) => preTotal + (todo.complete ? 1 : 0), 0)
            },
            isAllCheck: {
                get() {
                    return this.completeSize === this.todos.length && this.completeSize > 0
                },
                set(value) { // value是当前check的最新值
                    this.selectAllTodos(value)
                }
            }
        },
        components: {
            TodoHeader,
            TodoList,
            TodoFooter
        },
        methods: {
            addTodoItem(todo) {
                this.todos.unshift(todo)
            },
            deleteTodoItem(index) {
                this.todos.splice(index, 1)
            },
            deleteCompleteItem() {
               this.todos = this.todos.filter(todo => !todo.complete)
            },
            selectAllTodos(check) {
                // eslint-disable-next-line no-return-assign
                this.todos.forEach(todo => todo.complete = check)
            }
        },
        watch: {
            todos: {
                deep: true, // 深度监视
                // handler: function (value) {
                //     // 将todos最新的json数据保存到LocalStorage
                //     storageUtil.saveTodos(value)
                // }
                handler: storageUtil.saveTodos
            }
        },
        mounted() { // 执行异步代码
            // 给TodoHeader数据对象绑定addTodoItem的事件监听
            this.$refs.header.$on('addTodoItem', this.addTodoItem)
            // 订阅消息
            PubSub.subscribe('deleteTodoItem', (msg, index) => {
                this.deleteTodoItem(index)
            })
        }
    }
</script>

<style scoped>
  /*app*/
  .todo-container {
    width: 600px;
    margin: 0 auto;
  }
  .todo-container .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
</style>
