// 以模块的方式引入 Vue
import Vue from "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.esm.browser.js";
// 只需引入直接用到的组件, 不用管组件的依赖
import TodoList from "./components/TodoList.js";

new Vue({
    el: "#app", // 用 CSS 选择器指定挂载的元素
    components: { TodoList }, // 注册需要用到的组件
    // 模板必须只有一个根元素, 所以这里用一个 `<div>` 包裹
    template: `
        <div class="todo-list">
            <h3>用 JavaScript 原生 Module 实现 Vue 单文件组件</h3>
            <todo-list></todo-list>
        </div>
        `,
});
