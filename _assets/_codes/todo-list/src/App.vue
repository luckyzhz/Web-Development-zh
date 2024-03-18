<template>
    <div class="todo-list">
        <h3>用 JavaScript 原生 Module 实现 Vue 单文件组件</h3>
        <todo-list></todo-list>
    </div>
</template>

<script>
// 只需引入直接用到的组件, 不用管组件的依赖
import TodoList from "./components/TodoList.vue";

export default {
    name: 'App',
    components: { // 注册需要用到的组件
        TodoList
    },
}
</script>

<style>
*,
*::before,
*::after {
    box-sizing: border-box;
    line-height: 1.5;
}

.todo-list {
    width: 30rem;
    padding: 1rem;
    margin: auto;
    border-radius: 0.5rem;
    box-shadow: 0 0 4px 2px gray;
}
</style>
