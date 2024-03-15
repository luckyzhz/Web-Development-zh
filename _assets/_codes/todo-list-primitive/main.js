import Vue from "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.esm.browser.js";
import TodoList from "./components/TodoList.js";

new Vue({
    el: "#app",
    components: { TodoList },
    template: `
        <div class="todo-list">
            <h3>用 JavaScript 原生 Module 实现 Vue 单文件组件</h3>
            <todo-list></todo-list>
        </div>
        `,
});
