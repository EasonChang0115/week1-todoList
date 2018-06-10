<template>
  <div class="container">
    <h1>我的待辦事項清單</h1>
    <hr>
    <div class="row">
      <div class="input-group col-md-12">
        <input
          type="text"
          class="form-control"
          placeholder="add Todo.."
          v-model="newTodo"
          @keyup.enter="actionAddTodo" />
    
        <button class="btn btn-success" type="button" @click="actionAddTodo">
        <span class="fa fa-plus" aria-hidden="true"></span>
        </button>
        
      </div>
    </div>
    <!-- 左右兩個欄位分別存放 todo / done -->
    <div class="row">
      <div class="col-md-6">
        <h2>Todo List:</h2>
        <hr>
        <todoItem v-for="(item, index) in todoList" :item="item" :key="index" />
      </div>
      <div class="col-md-6">
        <h2>Done List:</h2>
        <hr>
        <ul >
          <li class="list_box" v-for="(item, index) in doneList">
            <label>
              <input 
                type="checkbox"
                :checked="item.done"
                @change="toggleTodo( item.id )" />
                <div class="text">{{ item.content }}</div>
            </label>
            <button class="btn btn-xs btn-danger" @click="deleteTodo( item.key )">
                <span class="fa fa-trash-o" aria-hidden="true"></span>
            </button>
          </li>
        </ul>
      </div>
    </div><!-- end row -->
  </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'
import todoItem from './Todo_item'

export default {
  components: {
    todoItem
  },
  data () {
    return {
      newTodo: ''
    }
  },
  computed: mapGetters({
    todoList: 'getTodo',
    doneList: 'getDone'
  }),
  methods: {
    ...mapActions([
      'toggleTodo',
      'deleteTodo',
      'getTodos'
    ]),
    actionAddTodo () {
      this.$store.dispatch('addTodo', this.newTodo)
      this.newTodo = ''
    }
  },
  mounted () {
      this.getTodos()
  }
}
</script>

<style lang="sass">
h1
  font-size: 25px
  font-weight: bold
  margin: 15px 0px
h2
  margin: 15px 0px
hr
  margin: 0
ul,li
  list-style-type: none
  margin: 0
  padding: 0

.list_box
  width: 100%
  font-size: 20px
  font-family: 微軟正黑體
  box-shadow: 0px 0px 2px rgba(black,0.6)
  display: flex
  margin: 10px 0px
  align-items: center
  label
    width: calc(100% - 50px)
    display: flex
    align-items: center
    margin: 0px
    input
      height: 20px
      width: 20px
      margin-left: 10px
    .text
      width: calc(100% - 30px)
      height: 100%
  button
      height: 35px
      width: 40px
      margin-right: 10px
      display: flex
      justify-content: center
</style>