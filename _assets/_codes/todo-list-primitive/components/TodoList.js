import TodoListItem from "./TodoListItem.js";

let nextTodoId = 1;

export default {
    components: {
        TodoListItem,
    },
    data: function () {
        return {
            newTodoText: "",
            todos: [
                { id: nextTodoId++, finished: false, text: "Learn Vue" },
                {
                    id: nextTodoId++,
                    finished: false,
                    text: "Learn about primitive single-file components",
                },
                { id: nextTodoId++, finished: false, text: "Fall in love" },
            ],
        };
    },
    methods: {
        deleteTodo: function (idToDelete) {
            this.todos = this.todos.filter((todo) => {
                return todo.id !== idToDelete;
            });
        },
        addTodo: function () {
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
    template: `
        <div>
            <input
                type="text"
                v-model="newTodoText"
                @keyup.enter="addTodo"
                placeholder="New todo (type Enter to add)"
            />
            <ul v-if="todos.length">
                <li
                    is="todo-list-item"
                    v-for="todo in this.todos"
                    :key="todo.id"
                    :todo="todo"
                    @delete="deleteTodo"
                ></li>
            </ul>
            <p v-else>Nothing left in the list. Add a new todo in the input above.</p>
        </div>
        `,
};
