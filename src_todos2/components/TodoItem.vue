<template>
  <li @mouseenter="handelShow(true)" @mouseleave="handelShow(false)" :style="{background: bgColor}">
    <label>
      <input type="checkbox" v-model="todo.complete"/>
      <span>{{todo.title}}</span>
    </label>
    <button class="btn btn-danger" style="display: block" @click="deleteItem">删除</button>
  </li>
</template>

<script>
    import PubSub from 'pubsub-js'
    export default {
        name: 'TodoItem',
        props: {
            todo: Object,
            index: Number
        },
        data() {
            return {
                bgColor: 'white',
                isShow: true
            }
        },
        methods: {
            handelShow(isEnter) {
               if (isEnter) {
                   this.bgColor = '#aaaaaa'
                   this.isShow = true
               } else {
                   this.bgColor = 'white'
                   this.isShow = false
               }
            },
            deleteItem() {
                const {todo, index} = this
                if (window.confirm(`是否删除${todo.title}?`)) {
                    // deleteTodoItem(index)
                    // 发布消息
                    PubSub.publish('deleteTodoItem', index)
                }
            }
        }
    }
</script>

<style scoped>
  /*item*/
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    display: none;
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
</style>
