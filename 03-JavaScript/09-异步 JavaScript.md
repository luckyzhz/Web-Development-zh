# 09-异步 JavaScript

> 熟悉异步 (asynchronous) JavaScript, 其与同步 (synchronous) JavaScript 的不同, 以及为什么需要他.

---

异步编程使程序可以启动一个可能运行比较久的任务, 同时在该任务运行期间, 仍能响应其他事件 (而不是得等待任务完成才能响应). 一旦任务完成, 程序就会得到结果.

浏览器提供了许多有用的函数, 有些可能需要运行比较长的时间, 因此他们得是异步的. 例如:

- `fetch()`: 进行 HTTP 请求.
- `getUserMedia()`: 访问用户的摄像头或麦克风.
- `showOpenFilePicker()`: 让用户选择文件.

---

## 事件处理器

事件处理器 (event handler) 是异步编程的一种形式. 你提供一个函数 (即事件处理器), 该函数不会被立即调用, 而是在事件发生时调用.

例如我们可以创建一个新的 `XMLHttpRequest` 对象, 并监听其 `loadend` 事件:

```html
<button id="xhr">Click to start request</button>
<button id="reload">Reload</button>

<pre readonly class="event-log"></pre>
```

```js
const log = document.querySelector(".event-log");

document.querySelector("#xhr").addEventListener("click", () => {
    log.textContent = "";

    const xhr = new XMLHttpRequest();

    // `loadend` 事件不会马上发生
    xhr.addEventListener("loadend", () => {
        log.textContent = `${log.textContent}Finished with status: ${xhr.status}`;
    });

    xhr.open(
        "GET",
        "https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json",
    );
    xhr.send();

    // 这一句会在上面的 `loadend` 事件处理器被调用之前发生
    log.textContent = `${log.textContent}Started XHR request\n`;
});

document.querySelector("#reload").addEventListener("click", () => {
    log.textContent = "";
    document.location.reload();
});
```

---

## 回调

回调 (callback) 是**被传入另一个函数**的函数. 并且我们期望回调会在适当时被调用. 事件处理器就是一种特殊类型的回调.

然而, 回调的嵌套会使代码变得难以理解. 因此, 大多数现代异步 API 不使用回调. JavaScript 异步编程的基础是 `Promise`.



---

?> {docsify-updated}