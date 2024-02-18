# 12-Worker 简介

> Worker 使你能另起线程执行任务, 从而避免阻塞主线程.

---

有 3 种类型的 Worker:

- **Dedicated Worker**
- **Shared Worker**
- **Service Worker**

本文会用一个实例介绍 Dedicated Worker, 然后简要介绍另外两种 Worker.

> ⚠️ Worker 不能访问 DOM (如 window, document, 页面元素等).

> ⚠️ 要运行本文中的代码, 必须先运行一个本地 web server, 因为 `file://` URL 不被允许加载 Worker.

## Dedicated Worker

我们将在 Worker 中运行一个低效的质数生成器 (可能需要几秒才能完成生成), 而我们的主线程仍然可以接受用户的输入.

为了做这个实验, 我们需要三个文件:

- `index.html`
- `main.js`
- `generate.js`

### index.html

注意, 只有 `main.js` 被引入 (通过 `<script>` 元素).

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prime numbers</title>

    <!-- 主线程代码和 Worker 代码分别在独立的文件中. -->
    <!-- 只有主线程的代码被引入. -->
    <script src="main.js" defer></script>
</head>

<body>
    <label for="quota">Number of primes:</label>
    <input type="text" id="quota" name="quota" value="1000000">

    <button id="generate">Generate primes</button>
    <button id="reload">Reload</button>

    <textarea id="user-input" rows="5" cols="62">
        Try typing in here immediately after pressing "Generate primes"
    </textarea>

    <div id="output"></div>
</body>

</html>
```

### main.js

1. 用 `Worker()` 构造器创建一个新 Worker. 传入的参数是一个指向 Worker 脚本的 URL. 一旦 Worker 被创建, 对应的 Worker 脚本就会开始执行.
2. 为 "Generate primes" 按钮添加 `click` 事件的处理器. 当点击该按钮时, 就通过 `worker.postMessage()` 发送消息给 Worker. 该方法接受一个参数, 本例中我们传入的是一个 JSON 对象.
3. 给 Worker 添加一个 `message` 事件的处理器. 这样 Worker 就可以告诉我们他何时完成, 并传递结果数据给我们.
4. 为 "Reload" 按钮实现 `click` 事件的处理器.

```js
// 创建一个新 Worker, 传入的脚本是 "generate.js".
// 一旦 Worker 被创建, 对应的 Worker 脚本就会开始执行.
const worker = new Worker("./generate.js");

// 当点击 "Generate primes" 按钮, 就发送一条消息给 worker.
// 消息中的 `command` 属性值是 "generate"; 属性 `quota` 指明要生成的质数个数.
document.querySelector("#generate").addEventListener("click", () => {
    const quota = document.querySelector("#quota").value;
    worker.postMessage({
        command: "generate",
        quota,
    });
});

// 当 worker 发回消息给主线程时, 更新 output 框.
// 生成的质数个数从消息 (message) 中获取.
worker.addEventListener("message", (message) => {
    document.querySelector("#output").textContent
        = `Finished generating ${message.data} primes!`;
});

// 重载按钮
document.querySelector("#reload").addEventListener("click", () => {
    document.querySelector("#user-input").value =
        'Try typing in here immediately after pressing "Generate primes"';
    document.location.reload();
});
```

### generate.js

1. Worker 通过全局函数 `addEventListener()` 监听来自主线程的消息. 在 `message` 事件处理器内部, 事件的 `data` 属性包含了从主线程传递过来的参数的副本.
2. 当完成任务时, 通过全局函数 `postMessage()` 向主线程发送消息.

```js
// 监听来自主线程的消息.
// 如果消息的 `command` 属性值是 "generate", 就调用 `generatePrimes()`.
addEventListener("message", (message) => {
    if (message.data.command === "generate") {
        let primesLength = generatePrimes(message.data.quota);
        // 当质数生成完成时, 就发回一条消息 (含有生成的质数的个数) 给主线程.
        postMessage(primesLength);
    }
});

// 低效地生成质数
function generatePrimes(quota) {
    function isPrime(n) {
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    }

    const primes = [];
    const min = 1000
    const max = 1000000;

    while (primes.length < quota) {
        const candidate =
            Math.floor(Math.random() * (max - min + 1) + min);
        if (isPrime(candidate)) {
            primes.push(candidate);
        }
    }

    return primes.length;
}
```

---

## 其他类型的 Worker

上例中的 Worker 被称为 **Dedicated Worker**. 这意味着它被**单个**脚本实例使用.

其他类型的 Worker:
- **Shared Worker**: 可以被运行在不同窗口中的**多个**不同脚本共享.
- **Service Worker**: 表现得像代理服务器, 缓存资源, 以便于 Web 应用可以在用户离线时工作. 他们是 [渐进式 Web 应用 (PWA)](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps) 的关键组件.



---

?> {docsify-updated}