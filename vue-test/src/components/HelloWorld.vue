<template>
  <div class="hello">
    <div>{{msg}}</div>
    <div>{{name}}</div>
    <div @click="meg">{{age}}</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      age: 14
    }
  },
  props: {
    msg: String,
    name: String
  },
  methods:{
    meg(){
      console.log(this.age)
    }
  }
}
</script>