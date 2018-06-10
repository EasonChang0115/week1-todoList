<template>
    <li>
        <div v-if= "!updateMode" class="list_box">
            <label>
                <input type="checkbox" :checked="item.done" @change="toggleTodo( item.id )">
                <div class="text">{{ item.content }}</div>
            </label>
            <button class="btn btn-xs btn-primary" @click="showEditMode">
                <span class="fa fa-pencil" aria-hidden="true"></span>
            </button>
            <button class="btn btn-xs btn-danger" @click="deleteTodo( item.id )">
                <span class="fa fa-trash-o" aria-hidden="true"></span>
            </button>
        </div>

        <div v-if='updateMode' class="list_box">
            <input
            class="edit-input"
            v-focus="updateMode"
            placeholder="edit Todo.."
            :value="item.content"
            @keyup.enter="actionEdit"
            @blur="cancelEdit"
            @keyup.esc="cancelEdit"/>
        </div>
    </li>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    item: Object
  },
  data () {
    return {
      updateMode: false // 修改模式預設值
    }
  },
  /*
    此 directives 是參考作者的 code
    主要功能是切換模式之後 focus input 功能
    value 為 updateMode
    $nextTick 功能是：上個動作完成後，才執行裡面包含的程式。
    之後會寫一篇關於自訂：Vue Directive
  */
  directives: {
    focus (el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  },
  methods: {
    ...mapActions([
      'toggleTodo',
      'deleteTodo',
      'updateTodo'
    ]),
    showEditMode () {
      this.updateMode = true
    },
    actionEdit (e) {
      const userChange = e.target.value.trim()
      console.log('userChange', this.item.id, userChange)
      this.updateTodo({
        id: this.item.id,
        change: userChange
      })
      this.updateMode = false
    },
    cancelEdit (e) {
      e.target.value = this.item.title
      this.updateMode = false
    }
  }
}
</script>

<style>
.edit-input{
    line-height: 1em
}
</style>
