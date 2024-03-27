# 05-Vue Router 3

> [Vue Router](https://v3.router.vuejs.org/zh/) 是 [Vue.js](https://v2.cn.vuejs.org/) 官方的路由管理器. Vue Router 本质就是把路径映射到组件, 从而让构建单页面应用变得易如反掌. 和 Vue 2 兼容的是 Vue Router 3.

---

## 安装

可通过 <https://cdn.jsdelivr.net/npm/vue-router@3/dist/> 查看 Vue Router 所有可用版本.

### 用 `<script>` 引入

```html
<!-- 开发版本 -->
<script src="https://cdn.jsdelivr.net/npm/vue-router@3/dist/vue-router.js"></script>

<!-- 生产版本 -->
<script src="https://cdn.jsdelivr.net/npm/vue-router@3/dist/vue-router.min.js"></script>
```

### 原生 ES 模块引入

```html
<!-- 开发版本 -->
<script type="module">
    import VueRouter from "https://cdn.jsdelivr.net/npm/vue-router@3/dist/vue-router.esm.browser.js";
</script>

<!-- 生产版本 -->
<script type="module">
    import VueRouter from "https://cdn.jsdelivr.net/npm/vue-router@3/dist/vue-router.esm.browser.min.js";
</script>
```

### npm

在用 Vue 构建大型应用时推荐使用 npm 安装, 以便和打包工具 (如 webpack) 配合使用.

```sh
# 在 npm 项目文件夹下执行
npm install vue-router@^3
```

### 脚手架

官方的命令行工具 [Vue CLI](https://cli.vuejs.org/zh/) 可以为单页应用 (SPA) 快速搭建繁杂的脚手架, 提供了开箱即用的构建配置.

```sh
# 全局安装 Vue CLI
npm install -g @vue/cli

# 创建项目 `my-project`
vue create my-project
```

然后 Vue CLI 会提示选择一个预设文件 (preset), 这里我们选择 `Manually select features`, 进去后就能选用 Vue Router 了:

```sh
Vue CLI v5.0.8
? Please pick a preset:
  Default ([Vue 3] babel, eslint)
  Default ([Vue 2] babel, eslint)
❯ Manually select features
```

---

## 核心概念

Vue Router 的核心思想就是定义**路径**到**组件**的映射, 然后设置**渲染出口** (即在哪里渲染和路径对应的组件). 这样就能把浏览器地址栏不同的 URL 对应到不同组件, 并在恰当的位置渲染出这些组件.

可通过这个最简单的 [Hello, Vue Router!](_assets/_codes/hello-vue-router/ ':ignore') 来体会其核心概念:

- HTML 模板方面:
  1. 用 `<router-link>` 组件来生成页面上的导航链接, 传入 `to` 属性指定链接地址. `<router-link>` 默认会被渲染成一个 `<a>` 标签.
  2. 用 `<router-view>` 组件设置路由渲染出口.
- JavaScript 方面:
  0. 如果以模块的方式引入 `Vue` 和 `VueRouter`, 则引入后需要先调用 `Vue.use(VueRouter);`.
  1. 可以直接用 Vue 的选项对象代表 Vue 组件.
  2. 路由数组定义了一系列**路径**和**组件**的映射.
  3. 创建 `VueRouter` 实例最关键的就是要传入路由数组.
  4. 创建和挂载 `Vue` 根实例时, 要传入 `VueRouter` 实例, 从而让整个应用都有路由功能.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hello, Vue Router!</title>
    </head>
    <body>
        <div id="app">
            <h1>Hello, Vue Router!</h1>
            <p>
                <!-- 使用 router-link 组件来导航. -->
                <!-- 通过传入 `to` 属性指定链接. -->
                <!-- `<router-link>` 默认会被渲染成一个 `<a>` 标签 -->
                <router-link to="/foo">Go to Foo</router-link>
                <router-link to="/bar">Go to Bar</router-link>
            </p>
            <!-- 路由出口 -->
            <!-- 路由匹配到的组件将渲染在这里 -->
            <router-view></router-view>
        </div>

        <script type="module">
            // 0. 导入 Vue 和 VueRouter 模块
            import Vue from "https://cdn.jsdelivr.net/npm/vue@2/dist/vue.esm.browser.js";
            import VueRouter from "https://cdn.jsdelivr.net/npm/vue-router@3/dist/vue-router.esm.browser.js";
            // 使用模块化机制编程, 导入 Vue 和 VueRouter, 要调用 `Vue.use(VueRouter)`
            Vue.use(VueRouter);

            // 1. 定义 Vue 组件的选项对象.
            // 也就是说 Foo, Bar 代表了两个 Vue 组件.
            // 这里只是简单定义了 `template` 字段. 组件也可以从其他地方 import 进来
            const Foo = { template: "<div>foo</div>" };
            const Bar = { template: "<div>bar</div>" };

            // 2. 定义路由数组.
            // 每个路由应该映射一个组件
            const routes = [
                { path: "/foo", component: Foo },
                { path: "/bar", component: Bar },
            ];

            // 3. 创建 VueRouter 实例.
            // 传入的选项对象可以有很多字段. 这里只传入最关键的路由数组
            const router = new VueRouter({
                routes, // 这是简写, 相当于 `routes: routes,`
            });

            // 4. 创建和挂载根实例
            // 记得要通过 router 配置参数注入路由, 从而让整个应用都有路由功能
            const app = new Vue({
                router, // 这是简写, 相当于 `router: router,`
            }).$mount("#app");
        </script>
    </body>
</html>
```

> ⚠️ 当 `<router-link>` 对应的路由匹配成功, 将自动添加 `class` 属性值 `router-link-active`. 可进一步查看 [API 文档](https://v3.router.vuejs.org/zh/api/#router-link).



---

?> {docsify-updated}