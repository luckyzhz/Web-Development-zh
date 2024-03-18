<template>
    <div>
        <input type="text" v-model="newTodoText" @keyup.enter="addTodo" placeholder="New todo (type Enter to add)" />
        <h4>{{ listSummary }}</h4>
        <ul v-if="todos.length">
            <li is="todo-list-item" v-for="todo in this.todos" :key="todo.id" :todo="todo" @delete="deleteTodo"></li>
        </ul>
        <p v-else>Nothing left in the list. Add a new todo in the input above.</p>
    </div>
</template>

<script>
// 导入需要的依赖. 注意文件扩展名是 `.vue`
import TodoListItem from "./TodoListItem.vue";

// 用全局变量作为 id, 避免 id 重复
let nextTodoId = 1;

export default {
    components: {
        TodoListItem, // 注册需要用到的组件
    },
    // 注意 `data` 字段需要用一个函数来返回一个对象.
    // 因为只有函数能限制作用域, 而组件很可能被多次使用, 要让这些组件的 `data` 互相独立
    data: function () {
        return {
            newTodoText: "",
            todos: [
                { id: nextTodoId++, finished: false, text: "Learn Vue" },
                {
                    id: nextTodoId++,
                    finished: true,
                    text: "Learn about primitive single-file components",
                },
                { id: nextTodoId++, finished: false, text: "Fall in love Vue" },
            ],
        };
    },
    // 在 methods 里如果要用到 `props`, `data`, `computed` 里的量, 需要加 `this.` 前缀
    methods: {
        deleteTodo: function (idToDelete) {
            this.todos = this.todos.filter((todo) => {
                return todo.id !== idToDelete;
            });
        },
        addTodo: function () {
            // 新增的 todo 非空才真正添加
            const trimmedText = this.newTodoText.trim();
            if (trimmedText) {
                const newTodo = {
                    id: nextTodoId++,
                    finished: false,
                    text: trimmedText,
                };
                this.todos.push(newTodo);
                this.newTodoText = "";
            }
        },
    },
    // 计算属性也是函数, 不过调用的时候不需要括号 `()`, 即 JavaScript 中的 getter
    computed: {
        listSummary: function () {
            const numberFinishedTodos = this.todos.filter(
                (todo) => todo.finished
            ).length;
            return `${numberFinishedTodos} out of ${this.todos.length} items completed`;
        },
    },
}
</script>

<!-- 添加 "scoped" 属性以限制 CSS 只应用于本组件 -->
<style scoped>
input[type="text"] {
    width: 100%;
    font-size: 1rem;
    line-height: 2;
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
}
</style>
