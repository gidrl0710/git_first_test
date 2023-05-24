<template>
  <div class="inputBox shadow">
    <input type="text" v-model="newTodoItem" placeholder="Type what u have to do" v-on:keyup.enter="addTodo">
    <!-- <button v-on:click="addTodo">추가</button> -->
    <span class="addContainer" v-on:click="addTodo">
      <i class="addBtn fa fa-plus"></i> <!-- fa fa-plus "+"아이콘 추가 -->
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodoItem : '' // input의 값이 입력되면 newTodoItem의 값도 같이 갱신
    }
  },
  methods: {
    addTodo() {
      //console.log(this.newTodoItem);
      if(this.newTodoItem != ''){ // 1. input박스 값이 있을시에만 저장
        var value = this.newTodoItem && this.newTodoItem.trim();
        //localStorage.setItem(value,value); // setItem(키,값)로컬스토리지에 데이터를 추가하는 API
        this.$emit('addTodo',value); // App.vue에 있는  localStorage.setItem()
        this.clearInput(); // 2. 스토리지에 저장된후 input 박스 입력값 초기화
      }
    },
    clearInput() {
      this.newTodoItem = '';
    }
  }
}
</script>

<style>
  input:focus {
    outline: none;
  }
  .inputBox { 
    background:white;
    height: 50px;
    line-height: 50px; /* text중앙정렬 */
  }
  .inputBox input {
    border-style: none;
    font-size: 0.9rem;
  }
  .addContainer {
    float: right;
    background: linear-gradient(to right, #6478FB, #8763FB);
    display: block;
    width: 3rem;
    border-radius: 0 5px 5px 0;
  }
  .addBtn {
    color: white;
    vertical-align: middle;
  }
</style>