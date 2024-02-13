# 10-使用 Promise

> 理解在 JavaScript 如何使用 Promise.

---

JavaScript 异步编程的基础是 `Promise`.

使用基于 promise 的 API, 异步函数能启动操作 (该操作可能耗时较长) 并返回一个 `Promise` 对象. 可以将处理器附加到这个 `Promise` 对象. 当操作成功或失败时, 这些处理器将被执行.

> ⚠️ 打开一个浏览器标签页并访问 <https://example.org>. 本文的代码需要在该选项卡的控制台中进行测试.

## 使用 fetch() API

现代的基于 promise 的 `fetch()` API 用于替代 `XMLHttpRequest`.

```js
const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

console.log(fetchPromise);

fetchPromise.then((response) => {
    console.log(`Received response: ${response.status}`);
});

console.log("Started request…");
```

完整的输出结果应该类似这样:

```
Promise { <state>: "pending" }
Started request…
Received response: 200
```

注意 `Started request…` 在收到响应之前就输出了. 与同步函数不同, 当请求还在进行时, `fetch()` 就已经返回了, 这使得程序可以继续处理其他其他操作. 最终显示 `200` (OK) [状态码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status), 意味着请求成功.

---

## 链式 promise

使用 `fetch()` API, 一旦获得一个 `Response` 对象, 就需要调用另一个函数来获取响应数据. 在下例中, 我们想要获取响应数据作为 JSON, 所以会调用 `Response` 对象的 `json()` 方法. 结果就是, 该 `json()` 方法也变成异步的. 因此, 这是一个需要调用连续两个异步函数的例子.

```js
const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise.then((response) => {
    const jsonPromise = response.json();
    jsonPromise.then((data) => {
        console.log(data[0].name);
    });
});
```

Promise 的优雅之处在于 `then()` 本身返回一个 `Promise` 对象, 该 `Promise` 对象用传入的函数的结果来完成. 这意味着上面的代码可以这样重构:

```js
const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise
    .then((response) => response.json())
    .then((data) => {
        console.log(data[0].name);
    });
```

没有在第一个 `then()` 的处理器里调用第二个 `then()`, 而是返回 `json()` 返回的 promise, 并在该 promise 上继续调用 `then()`. 这被称为 promise 链.

还可以在读取数据前, 先判断服务器是否接受并成功处理了我们的请求:

```js
const fetchPromise = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log(data[0].name);
    });
```

---

## 捕获错误

如果嵌套回调 (callback), 就需要在每个嵌套级别处理错误 (error), 这会使错误处理变得非常困难.

为了支持错误处理, `Promise` 对象提供了一个 `catch()` 方法. 当异步操作失败时, 传入 `catch()` 的处理器会被调用.

如果添加 `catch()` 到 promise 链的末尾, 那么他将在之前的任何异步函数失败时被调用. 所以可以将操作实现为几个连续的异步函数调用, 并在一个单独的地方处理所有错误.

```js
const fetchPromise = fetch(
    "bad-scheme://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);

fetchPromise
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log(data[0].name);
    })
    .catch((error) => {
        console.error(`Could not get products: ${error}`);
    });
```

---

## Promise 术语

promise 状态:

- **pending**: 已创建 promise, 但其关联的异步函数还不确定是成功还是失败.
- **fulfilled**: 异步函数已成功. 接下来, `then()` 中的处理器会被调用.
- **rejected**: 异步函数已失败. 接下来, `catch()` 中的处理器会被调用.

有时会使用术语 **settled** 来涵盖状态 fulfilled 和 rejected.

如果一个 promise 处于 settled 状态, 或者已被锁定以跟随另一个 promise, 那么我们说他处于 **resolved** 状态.

---

## 组合多个 promise

有时, 我们可能需要几个 promise 都 fulfilled, 但他们之间不互相依赖. 在这种情况下, 最高效的方法是一起启动这些 promise, 然后在全部 fulfilled 后得到通知. 此时, 我们可以使用 `Promise.all()` 方法. 他接受一个 promise 数组, 并返回单个 promise.

`Promise.all()` 返回的 promise 的特点:

- 只有当数组中**所有** promise 都 fulfilled, 返回的 promise 才是 fulfilled. 接下来, `then()` 的处理器会被调用, 且传入的参数是一个响应数组, 其顺序和传入 `all()` 的 promise 对应.
- 当数组中**任何一个** promise 处于 rejected, 返回的 promise 就是 rejected. 接下来, `catch()` 的处理器会被调用以处理那个被 rejected 的 promise 抛出的错误.

```js
const fetchPromise1 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);
const fetchPromise2 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
);
const fetchPromise3 = fetch(
    "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
);

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3])
    .then((responses) => {
        for (const response of responses) {
            console.log(`${response.url}: ${response.status}`);
        }
    })
    .catch((error) => {
        console.error(`Failed to fetch: ${error}`);
    });
```

有时, 我们可能只需要一组 promise 中的任何一个 fulfilled, 而不关心具体是哪一个. 在这种情况下, 可以使用 `Promise.any()`.

```js
const fetchPromise1 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
);
const fetchPromise2 = fetch(
    "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found",
);
const fetchPromise3 = fetch(
    "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json",
);

Promise.any([fetchPromise1, fetchPromise2, fetchPromise3])
    .then((response) => {
        console.log(`${response.url}: ${response.status}`);
    })
    .catch((error) => {
        console.error(`Failed to fetch: ${error}`);
    });
```

---

## async 和 await

关键字 `async` 提供了一种更简单的方式来处理基于 promise 的异步代码. 在函数声明前面添加关键字 `async`, 该函数就变成了一个异步函数.

```js
async function myFunction() {
    // 这是一个异步函数
}
```

在 `async` 函数**内部**, 可以在返回 promise 的函数前使用关键字 `await`. 这会使得代码在添加 `await` 的那个点**等待**, 直到 promise 处于 **settled** (涵盖 fulfilled 和 rejected) 状态. 那时, fulfilled 值作为返回值, 或者抛出 rejected 值.

这可以使异步函数看起来像同步函数.

```js
async function fetchProducts() {
    try {
        // 这一行之后, 函数会等待 `fetch()` 被 settled.
        // `fetch()` 会返回一个响应或者抛出一个错误.
        const response = await fetch(
            "https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json",
        );
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        // 这一行之后, 函数会等待 `response.json()` 被 settled.
        // `response.json()` 会返回一个 JSON 对象或者抛出一个错误.
        const data = await response.json();
        console.log(data[0].name);
        // `async` 函数总是返回一个 promise.
        // 返回值 `data` 将是由 `fetchProducts()` 返回的 Promise 对象 fulfilled 后的值.
        return data;
    } catch (error) {
        console.error(`Could not get products: ${error}`);
    }
}

fetchProducts();
```

上例中, 调用 `await fetch()` 后得到的不是一个 `Promise` 对象, 而是一个完全完成的 `Response` 对象, 就好像 `fetch()` 是一个同步函数.

注意 `async` 总是返回一个 promise, 所以不能这样写代码:

```js
const dataPromise = fetchProducts();
console.log(dataPromise[0].name); // `dataPromise` 是一个 Promise 对象, 而非 JSON 对象
```

应该要这样写:

```js
const dataPromise = fetchProducts();
dataPromise.then((data) => console.log(data[0].name));
```

另外, 除非在 [JavaScript 模块](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Modules) 里, 否则只能在 `async` 函数**内部**使用关键字 `await`.

通常会更倾向于使用 `async` 函数, 而不是 promise 链, 因为这样的代码更符合直觉.



---

?> {docsify-updated}