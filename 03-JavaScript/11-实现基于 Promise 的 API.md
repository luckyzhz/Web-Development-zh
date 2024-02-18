# 11-实现基于 Promise 的 API

> 通过实例理解如何实现基于 Promise 的 API, 并使用他.

---

通常, 当实现一个基于 Promise 的 API 时, 会包裹一个异步操作. 该操作可能使用事件 (event), 普通回调 (callback), 或者消息传递模型 (message-passing model). 一个 Promise 对象将被用于合理地处理那个异步操作的成功或失败.

## 实现 alarm() API

本例中, 我们将实现一个基于 Promise 的闹钟 API, 称为 `alarm()`. 他接受的参数有, 要唤醒的人名, 以及等待唤醒的毫秒数延迟.

### Promise() 构造器

我们的 `alarm()` 函数会返回一个 Promise. 当计时器到期时, 该 Promise 会被 fulfilled, 并传递一个 "Wake up!" 消息给 `then()` 中的处理器. 如果调用时提供了负值延迟, 则该 Promise 会被 rejected.

关键组件是 `Promise()` 构造器. `Promise()` 构造器接受一个函数 (该函数被称为 `executor`) 作为参数. 当创建一个新的 Promise 时, 需要具体实现 `executor`.

`executor` 接受两个参数，它们都是函数，通常分别被称为 `resolve` 和 `reject`.

在 `executor` 的实现里, 会调用底层异步函数. 如果异步函数成功, 就调用 `resolve`; 如果异步函数失败, 就调用 `reject`. 如果 `executor` 里抛出了错误, 则 `reject` 会被自动调用. 可以将任何类型的**单个参数**传递给 `resolve` 和 `reject`.

所以可以像这样实现 `alarm()`:

```js
function alarm(person, delay) {
    return new Promise((resolve, reject) => {
        if (delay < 0) {
            throw new Error("Alarm delay must not be negative");
        }
        setTimeout(() => {
            resolve(`Wake up, ${person}!`);
        }, delay);
    });
}
```

---

## 使用 alarm() API

可以调用 `alarm()`, 然后在返回的 Promise 上调用 `then()` 和 `catch()` 以分别为 Promise 的 fulfilled 和 rejected 状态设置处理器.

```js
const name = document.querySelector("#name");
const delay = document.querySelector("#delay");
const button = document.querySelector("#set-alarm");
const output = document.querySelector("#output");

function alarm(person, delay) {
    return new Promise((resolve, reject) => {
        if (delay < 0) {
            throw new Error("Alarm delay must not be negative");
        }
        setTimeout(() => {
            resolve(`Wake up, ${person}!`);
        }, delay);
    });
}

button.addEventListener("click", () => {
    alarm(name.value, delay.value)
        .then((message) => (output.textContent = message))
        .catch((error) => (output.textContent = `Couldn't set alarm: ${error}`));
});
```

---

## 在 alarm() API 上使用 async 和 await

`alarm()` 返回一个 Promise, 可以像处理其他任何 Promise 一样处理它: Promise 链式调用, `Promise.all()`, 以及 `async` / `await`.

```js
const name = document.querySelector("#name");
const delay = document.querySelector("#delay");
const button = document.querySelector("#set-alarm");
const output = document.querySelector("#output");

function alarm(person, delay) {
    return new Promise((resolve, reject) => {
        if (delay < 0) {
            throw new Error("Alarm delay must not be negative");
        }
        setTimeout(() => {
            resolve(`Wake up, ${person}!`);
        }, delay);
    });
}

button.addEventListener("click", async () => {
    try {
        const message = await alarm(name.value, delay.value);
        output.textContent = message;
    } catch (error) {
        output.textContent = `Couldn't set alarm: ${error}`;
    }
});
```



---

?> {docsify-updated}