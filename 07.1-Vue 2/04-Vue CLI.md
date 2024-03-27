# 04-Vue CLI

> 将[上一篇文章](/07.1-Vue%202/03-原生%20Module%20实现单文件组件.md)中的例子 [TodoList](_assets/_codes/todo-list-primitive/ ':ignore') 改用 Vue 脚手架实现, 这样模板和 Vue 相关语法才有高亮和提示, 也能实现真正的单文件组件 (文件名以 `.vue` 结尾).

---

- 源码: [TodoList-CLI 源码](https://github.com/luckyzhz/Web-Development-zh/tree/main/_assets/_codes/todo-list)
- 预览: [TodoList-CLI 预览](_assets/_codes/todo-list/dist/ ':ignore')

## 安装

1. 安装包管理器 [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
2. 全局安装 [Vue CLI](https://cli.vuejs.org/zh/):
    ```sh
    # 全局安装 Vue CLI
    npm install -g @vue/cli
    # 查看版本
    vue --version
    ```
3. 升级:
    ```sh
    # 升级 Vue CLI
    npm update -g @vue/cli
    # 升级项目中的 Vue CLI 相关模块
    cd 项目目录
    vue upgrade
    ```

---

## 创建项目

用命令 `vue create 项目名` 创建新项目:

```sh
# 会自动在当前目录下创建项目文件夹
vue create todo-list
```

然后 Vue CLI 会提示选择一个预设文件 (preset), 这里我们选择 `Default ([Vue 2] babel, eslint)`:

```sh
Vue CLI v5.0.8
? Please pick a preset:
  Default ([Vue 3] babel, eslint)
❯ Default ([Vue 2] babel, eslint)
  Manually select features
```

成功创建项目后, Vue CLI 提示可以进入项目文件夹并运行该项目:

```sh
# 🎉  Successfully created project todo-list.
# 👉  Get started with the following commands:
cd todo-list
npm run serve
```

> ⚠️ 在生产环境中通常需要选 `Manually select features` 来手动指定需要的特性. 手动选择特性后可选择是否要保存为 preset, 以便将来使用相同的特性. 用户自定义的 preset 保存在家目录下的一个 JSON 文件 `~/.vuerc`. 如果想修改已保存的 preset 选项, 可编辑这个文件.

> ⚠️ 还可通过 `vue ui` 命令以图形化界面创建和管理项目.

---

## 编辑源码

### 目录结构

通常我们只需在 `src` 文件夹下编辑源码.

```sh
# src 默认的目录结构
src/
├── App.vue
├── assets/
│   └── logo.png
├── components/
│   └── HelloWorld.vue
└── main.js
```

### 单文件组件

组件会放在目录 `src/components/` 下, 以 `.vue` 作为文件扩展名. 组件的文件结构分为三部分, `<template>`, `<script>`, `<style>`:

```vue
<template>
    <!-- 模板 -->
</template>

<script>
export default {
    // vue 选项对象
}
</script>

<!-- 添加 "scoped" 属性以限制 CSS 只应用于本组件.
     如果不添加 "scoped" 则把 CSS 应用给全局 -->
<style scoped>
/* CSS 样式 */
</style>
```

总的来说, 只需把之前用 JavaScript 原生 Module 实现的 [TodoList 源码](https://github.com/luckyzhz/Web-Development-zh/tree/main/_assets/_codes/todo-list-primitive/) 拆分进以 `.vue` 为扩展名的单文件组件即可:

- `components/TodoListItem.js` -> `components/TodoListItem.vue`
- `components/TodoList.js` -> `components/TodoList.vue`
- `main.js` -> `App.vue`

**注意点**:

- 导入依赖的组件时注意文件扩展名不再是 `.js`, 而是 `.vue`. 例如:
    ```js
    import TodoListItem from "./TodoListItem.vue";
    ```
- 把原来 Vue 选项对象中的 `template` 字段单独放到 `<template>` 元素里, 这样就有语法高亮提示了.
- 为了保持单向数据流, Vue 通常不允许直接修改 `props` 选项中的字段 (`props` 用于父传子), 所以这里给组件 `TodoListItem.vue` 的 `data` 选项增加了一个字段 `todo_data`. 然后把原来用到的 `todo` 改为 `todo_data`:
    ```js
    props: {
        // 设置自定义属性 `todo` 的类型为 Object, 以及要求必填
        todo: {
            type: Object,
            required: true,
        },
    },
    data: function () {
        return {
            todo_data: this.todo, // 新增的 `todo_data` 用于指向 props 的字段
            editing: false,
        };
    },
    methods: {
        // 用 `this.$refs.ref值` 索引到元素后, 直接操作该元素
        saveText: function () {
            const editedText = this.$refs.inputField.value.trim();
            if (editedText) {
                // 不直接操作 `props` 中的 `todo`, 改为操作 `data` 中的 `todo_data`
                this.todo_data.text = editedText;
                this.editing = false;
            }
        },
    }
    ```
  双向绑定中的 `v-model="todo.finished"` 也要改为 `v-model="todo_data.finished"`.
- 可以给 `<style>` 元素添加 `scoped` 属性以限制添加的 CSS 只应用于本组件.
- 在文件 `App.vue` 中汇总构建出整个 App.
- 由 `main.js` 负责引入 `vue` 模块, 并将 App 挂载到 `index.html`.

### 试运行与构建

编辑好源码后就可以试运行, 然后打开浏览器查看 App 的运行效果了:

```sh
# 切换到项目文件夹
cd todo-list
# 试运行
npm run serve
```

在构建用于生产环境的版本之前, 先修改项目根目录下的 `vue.config.js` 文件的一个字段为 `publicPath: './'` , 以启用相对路径打包. 这样所有资源都会被链接为相对路径, 打出来的包可以被部署在服务器的任意路径:

```js
const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
    transpileDependencies: true,
    publicPath: "./",
});
```

> ⚠️ [`publicPath`](https://cli.vuejs.org/zh/config/#publicpath) 应避免用相对路径的情况: 使用基于 HTML5 `history.pushState` 的路由时; 使用 `pages` 选项构建多页面应用时.

然后就可在项目文件夹下执行构建命令了:

```sh
# 在项目文件夹下执行
npm run build
```

运行构建命令后, 项目文件夹下多了一个 `dist` (distribution) 文件夹. 只需将其中的所有文件复制到服务器就可供公众访问了.



---

?> {docsify-updated}