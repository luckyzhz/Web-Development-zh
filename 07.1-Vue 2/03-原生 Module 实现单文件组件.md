# 03-原生 Module 实现单文件组件

> 利用 JavaScript 内建的模块功能, 不用打包工具也能实现原始的 Vue 单文件组件功能.

---

## JavaScript 模块概览

- 必须把文件放在服务器上才能使用 JavaScript 模块.
- HTML 引入模块时要声明 `<script type="module">`.
- 模块要先 `export`, 然后才能被 `import`.
- 最简单的模式:
  - 在模块文件里: `export { object1, object2, object3 };`.
  - 在使用模块的文件里: `import { object1, object2, object3 } from "./modules.js";`.
- 可以用 `export default` 设置默认导出量 (不需要用大括号 `{}` 包裹):
    ```js
    // 一个模块里只能有**一个量**作为 `default`
    export default function () {
        // 这里把一个匿名函数作为默认导出
    }
    ```
    ```js
    // 注意不要用 `{}` 包裹导入的默认量
    import nameYouLike from "./modules.js";
    // 上面这种简化写法相当于:
    import { default as nameYouLike } from "./modules.js";
    ```
- 可以用 Module 对象实现命名空间, 避免潜在的命名冲突:
    ```js
    import * as Module1 from "./modules.js";

    Module1.function1();
    Module1.function2();
    ```
- 可以用 `import()` 函数动态载入模块 (**不要求声明** `<script type="module">`), 返回一个模块对象的 Promise:
    ```js
    import("./modules.js").then((module) => {
        // Do something with the module.
        module.function1();
    });
    ```
- 模块文件内部的最顶层可以使用 `await` 关键字, 这样模块就像一个大型异步函数:
  - 假设有一个定义了颜色的 `colors.json` 文件:
    ```json
    {
        "yellow": "#F4D03F",
        "green": "#52BE80",
        "blue": "#5499C7",
        "red": "#CD6155",
        "orange": "#F39C12"
    }
    ```
  - 获取颜色配置的模块 `getColors.js`:
    ```js
    // fetch 请求颜色配置文件 `colors.json`
    const colors = fetch("../data/colors.json").then((response) => response.json());

    // 在 Promise 对象前用关键字 `await`,
    // 这样其他文件会等待 `colors.json` 下载并完成解析后再使用本模块导出的 `colors` 对象
    export default await colors;
    ```

> ⚠️ 模块的详细介绍可参考 [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).

---

## 实例 TodoList

[TodoList 预览](/_assets/_codes/todo-list-primitive/ ':ignore'). [TodoList 源码](https://github.com/luckyzhz/Web-Development-zh/tree/main/_assets/_codes/todo-list-primitive/). 本例实现的功能有:

- 新增 todo (即待办事项)
- 编辑已有 todo (会自动聚焦输入框)
- 取消或保存对 todo 的编辑
- 删除已有 todo
- 记录 todo 的完成状态, 给出计数.

组件 `TodoListItem.js` 是 `TodoList.js` 的依赖. `main.js` 汇总需要用到的组件, 并创建 Vue 根实例. 文件结构:

```sh
todo-list-primitive/
├── components/
│   ├── TodoListItem.js
│   └── TodoList.js
├── index.html
├── main.css
└── main.js
```

### index.html

- 因为在 `main.js` 里以模块的方式引入了 Vue, 所以 `index.html` 里不需要直接引入 Vue.
- 模块的引入需要声明 `type="module"`. 不需要 `defer` 属性, 因为模块都以 defer 方式加载.
- `<div id="app"></div>` 用于挂载 Vue 根实例. 渲染时, 会被**替换**为 Vue 根实例的模板.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>todo-list-primitive</title>
        <!-- 样式 -->
        <link rel="stylesheet" href="./main.css" />
        <!-- 模块的引入需要声明 `type="module"`. 不需要 `defer`, 因为模块都以 defer 方式加载 -->
        <script src="./main.js" type="module"></script>
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
```

### main.js

- 以 JavaScript 模块的形式引入 Vue. 在生产环境中, 应把 `vue.esm.browser.js` 替换为 `vue.esm.browser.min.js`.
- 只需引入直接用到的组件, 不用管组件的依赖.
- 在模板里使用组件之前需要先在 `components` 字段注册组件.
- 模板只能有一个根元素.

```js
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
```

### TodoList.js

#### template

- 用 `v-model` 让 `<input>` 元素的值和 `data` 里的某个变量**双向绑定**.
- 用 `v-if`, `v-else-if`, `v-else` 实现条件渲染.
- 有些元素限制了子元素的类型 (如 `<ul>` 里只能放 `<li>`), 这时可以用 `is` 属性设置实际的组件.
  - 还可以用 `:is=变量名` (这是 `v-bind:is=变量名` 的简写) 把 `is` 属性绑定到变量名, 实现动态组件.
- 用 `v-for` 实现循环渲染.
- 监听事件 `v-on:事件="方法名"` 可以简写为 `@事件="方法名"`.

```html
<div>
    <!-- 新增 todo 的输入框 -->
    <!-- 用 `v-model` 让其值和 `data` 里的 `newTodoText` 双向绑定 -->
    <!-- 当敲击 Enter 键时, 会触发 `addTodo` 方法 -->
    <input
        type="text"
        v-model="newTodoText"
        @keyup.enter="addTodo"
        placeholder="New todo (type Enter to add)"
    />
    <!-- 对列表完成状态的总结使用了计算属性 `listSummary`, 注意不要写成 `listSummary()` -->
    <h4>{{ listSummary }}</h4>
    <!-- 用 `v-if` 和 `v-else` 切换显示的内容. -->
    <!-- `todos` 非空时就展示其内容. -->
    <!-- 因为 `<ul>` 元素里只能放置 `<li>` 元素, 所以这里设置了 `is="todo-list-item"`,
         以声明这里的 `<li>` 实际是 `todo-list-item` 组件 -->
    <!-- 用 `v-for` 循环渲染多个 `todo-list-item`. -->
    <!-- 如果 `todo-list-item` 发出了 `delete` 事件, 就触发 `deleteTodo` 方法 -->
    <ul v-if="todos.length">
        <li
            is="todo-list-item"
            v-for="todo in this.todos"
            :key="todo.id"
            :todo="todo"
            @delete="deleteTodo"
        ></li>
    </ul>
    <!-- `todos` 为空时就提醒用户添加 todo -->
    <p v-else>Nothing left in the list. Add a new todo in the input above.</p>
</div>
```

#### data

- 注意 `data` 字段需要用一个函数来返回一个对象. 因为只有函数能限制作用域, 而组件很可能被多次使用, 要让这些组件的 `data` 互相独立.

```js
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
            { id: nextTodoId++, finished: false, text: "Fall in love" },
        ],
    };
},
```

#### methods

- 在 `methods` 里如果要用到 `props`, `data`, `computed` 里的量, 需要加 `this.` 前缀.

```js
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
```

#### computed

- 在 `computed` 里如果要用到 `props`, `data`, `computed` 里的量, 需要加 `this.` 前缀.
- 计算属性也是函数, 不过调用的时候不需要括号 `()`. 实质就是 JavaScript 中的 getter.

```js
// 计算属性也是函数, 不过调用的时候不需要括号 `()`. 即 JavaScript 中的 getter
computed: {
    listSummary: function () {
        const numberFinishedTodos = this.todos.filter(
            (todo) => todo.finished
        ).length;
        return `${numberFinishedTodos} out of ${this.todos.length} items completed`;
    },
},
```

### TodoListItem.js

#### template

- 把 `<label>` 的 `for` 属性绑定到 `<input>` 的 `id` 属性, 以扩大交互区域.
- 用 `$emit('事件名', 传出值)` 发出自定义事件. `传出值` 会作为事件处理器的参数.
- 可以设置元素的 `ref` 属性, 以便在方法里用 `this.$refs.ref值` 索引这个元素, 然后直接操作该元素.

```html
<li>
    <div v-if="!editing">
        <div>
            <input type="checkbox" v-model="todo.finished" :id="todo.id" />
            <label :for="todo.id"> {{ todo.text }} </label>
        </div>
        <div>
            <button type="button" @click="toEditing">Edit</button>
            <!-- 用 `$emit('事件名', 传出值)` 发出自定义事件 -->
            <button type="button" @click="$emit('delete', todo.id)">
                Delete
            </button>
        </div>
    </div>
    <!-- 编辑模式下显示输入框和相应按钮 -->
    <div v-else>
        <!-- 设置元素的 `ref` 属性, 以便在方法里用 `this.$refs.ref值` 索引这个元素, 然后直接操作该元素 -->
        <input type="text" :value="todo.text" ref="inputField" />
        <div>
            <button type="button" @click="saveText">Save</button>
            <button type="button" @click="editing = !editing">Cancel</button>
        </div>
    </div>
</li>
```

#### props

- 可以对组件的自定义属性设置一系列约束 (用一个对象表示), 例如数据类型, 是否必填等.

```js
props: {
    // 设置自定义属性 `todo` 的类型为 Object, 以及要求必填
    todo: {
        type: Object,
        required: true,
    },
},
```

#### methods

- 可以用 `this.$refs.元素的ref值` 索引到元素后, 直接操作该元素.
- 如果要操作的元素在当前渲染周期还没挂载到 DOM, 可以等到下一个渲染周期 `this.$nextTick()`.

```js
methods: {
    toEditing: function () {
        this.editing = true;
        // 触发 `toEditing` 时, `<input>` 还没加载到 DOM,
        // 所以需要等到下一个渲染周期 `nextTick` 再操作 `<input>`
        this.$nextTick(() => {
            this.$refs.inputField.focus();
        });
    },
    // 用 `this.$refs.ref值` 索引到元素后, 直接操作该元素
    saveText: function () {
        const editedText = this.$refs.inputField.value.trim();
        if (editedText) {
            this.todo.text = editedText;
            this.editing = false;
        }
    },
},
```



---

?> {docsify-updated}