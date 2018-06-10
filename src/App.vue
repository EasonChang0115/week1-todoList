<template>
  <div id="app">
    <Todo/>
  </div>
</template>

<script>
import Todo from './components/Todo'

export default {
  name: 'App',
  components: {
    Todo
  }
}
</script>

<style lang="sass">
@import "~bootstrap/scss/bootstrap";
.text-center
  text-align: center
.nav-item
  font-weight: bold
  font-size: 15px
  transition: .3s
  height: 100%
  &:hover
    color: rgba(black,0.3)
</style>
