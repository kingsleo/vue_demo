<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <TodoHeader :addTodoItem="addTodoItem"/>
      <TodoList :todos="todos" :deleteTodoItem="deleteTodoItem"/>
      <TodoFooter :todos="todos" :deleteCompleteItem="deleteCompleteItem" :selectAllTodos="selectAllTodos"/>
    </div>
  </div>
</template>

<script>
    import TodoHeader from './components/TodoHeader'
    import TodoList from './components/TodoList'
    import TodoFooter from './components/TodoFooter'
    export default {
        name: 'App.vue',
        data() {
            return {
                // 从LocalStorage读取数据
                todos: JSON.parse(window.localStorage.getItem('todos_key') || '[]')
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
                handler: function (value) {
                    // 将todos最新的json数据保存到LocalStorage
                    window.localStorage.setItem('todos_key', JSON.stringify(value))
                }
            }
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
