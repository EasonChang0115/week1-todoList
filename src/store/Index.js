import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const state = {
    todos: []
}

const getters = {
    //----------------購物車-------------------
    getProducts (state) {
        return state.products
    },
    getCart (state) {
        return state.cart
    },
    getCartTotal (state) {
        let total = 0
        state.cart.forEach((item) => {
        total += item.price
        })
        return total
    },
    //----------------待辦事項----------------
    getTodo (state) {
        return state.todos.filter((item) => {
            return !item.done
        })
    },
    getDone (state) {
        return state.todos.filter((item) => {
            return item.done
        })
    } 
}

const actions = {
    //-------------------待辦事項--------------------------
    getTodos ({ commit }) {
         axios.get('http://localhost:3000/todos')
        .then(function (response) {
          console.log('[actions] getTodo',response.data)
          commit('GET_TODOS',response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    addTodo ({ commit }, newTodo) {
        console.log('[actions] addTodo',newTodo)
        commit('ADD_TODO',newTodo)
    },
    toggleTodo ({ commit }, key) {
        console.log('[actions] toggleTodo',key)
        commit('TOGGLE_TODO',key)
    },
    deleteTodo ({ commit }, key) {
        console.log('[actions] deleteTodo',key)
        commit('DELETE_TODO',key)
    },
    updateTodo ({ commit }, obj) {
        console.log('[actions] updateTodo',obj)
        commit('UPDATE_TODO',obj)
    }
}

const mutations = {
    //-----------------------待辦事項----------------------------
    'GET_TODOS' (state, Todos) {
        state.todos = Todos
    },
    'ADD_TODO' (state, newTodo) {
        let todoid = Math.random().toString(36).substring(7)
        state.todos.push({
            id: todoid,
            content: newTodo,
            done: false
        })
        axios.post('http://localhost:3000/todos',{
            id: todoid,
            content: newTodo,
            done: false
        }).then(function (response) {
            console.log("insert success")
        }).catch(function (error) {
            console.log(error)
        });
    },
    'TOGGLE_TODO' (state, id) {
         for (var i in state.todos) {
            var item = state.todos[i]
            if (item.id === id) {
                item.done = !item.done
                axios.patch('http://localhost:3000/todos/'+id,{done: item.done})
                .then(function (response) {
                    console.log("toggle success")
                }).catch(function (error) {
                    console.log(error)
                });
                break
            }
         }
    },
    'DELETE_TODO' (state, id) {
        for (var i in state.todos) {
            var item = state.todos[i]
            if (item.id === id) {
                state.todos.splice(i, 1)
                axios.delete('http://localhost:3000/todos/'+id)
                .then(function (response) {
                    console.log("delete success")
                }).catch(function (error) {
                    console.log(error)
                });
            }
        }
    },
    'UPDATE_TODO' (state, obj) {
       for (var i in state.todos) {
            var item = state.todos[i]
            if (item.id === obj.id) {
                item.content = obj.change
                axios.patch('http://localhost:3000/todos/'+obj.id,{content: item.content})
                .then(function (response) {
                    console.log("change success")
                }).catch(function (error) {
                    console.log(error)
                });
                break
            }
        }
    }
}


export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
