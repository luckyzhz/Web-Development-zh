# 01-添加 JavaScript

> 学习如何向网页中添加 JavaScript, 及其加载策略.

---

## 内部 JavaScript

用 `<script>` 元素可直接在 HTML 文件内书写 JavaScript 代码.

```html
<script>
    // JavaScript 代码
</script>
```

例如:

```html
<script>
    document.addEventListener("DOMContentLoaded", () => {
        function createParagraph() {
            const para = document.createElement("p");
            para.textContent = "You clicked the button!";
            document.body.appendChild(para);
        }

        const buttons = document.querySelectorAll("button");

        for (const button of buttons) {
            button.addEventListener("click", createParagraph);
        }
    });
</script>
```

---

## 外部 JavaScript

可用 `<script>` 元素的 `src` 属性引入外部 `.js` 文件:

```html
<script src="script.js"></script>
```

---

## JavaScript 加载策略

属性 `async` 和 `defer` 决定如何加载**外部** JavaScript.

不同加载策略的区别如图所示:

![](../_assets/_images/async-defer.jpg ':size=1000')

- `async` 和 `defer` 都指示浏览器**另起线程去下载脚本**, 因此下载脚本时不会阻塞页面其他部分的加载.
- 带有 `async` 属性的脚本在**下载完成后会立即执行**, 执行时会**阻塞**页面, 且不保证任何特定的执行顺序.
- 带有 `defer` 属性的脚本会**在页面所有内容都加载完成后**, 再**按顺序执行**.
- 如果脚本**没有依赖**, 希望尽快执行, 就使用 `async`.
- 如果脚本**依赖**于其他脚本或 DOM, 就使用 `defer`, 且按照期望的脚本执行顺序放置对应的 `<script>` 元素.



---

?> {docsify-updated}