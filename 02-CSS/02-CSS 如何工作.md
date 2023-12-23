# 02-CSS 如何工作

> 浏览器如何解析 CSS 和 HTML 的基础知识.

---

## CSS 究竟如何工作?

浏览器在显示文档时, 必须将文档内容与样式信息结合起来. 处理文档的过程分为以下几个阶段:

1. 浏览器加载 HTML (例如从网上获取).
2. 把 HTML 转化为一个 **DOM** (Document Object Model). DOM 表示计算机内存中的文档.
3. 浏览器会获取 HTML 文档链接的大部分资源, 如图片, 视频, CSS, JavaScript.
4. 浏览器会解析获取到的 CSS, 把不同的规则按照其选择器 (如 element, class, ID) 分类到不同的 "桶" 中. 基于选择器, 浏览器会计算出 DOM 中的哪个节点要应用什么规则, 并为其添加样式 (这个中间步骤称为渲染树).
5. 应用规则后, 渲染树将以其应有的结构呈现.
6. 网页呈现在屏幕上 (此阶段称为绘制).

![Rendering process overview](../_assets/_images/rendering.svg ':size=600')

## 关于 DOM

DOM 具有树状结构. 标记语言中的每个**元素**, **属性**和**文本**都会成为树状结构中的一个 [DOM 节点 (node)](https://developer.mozilla.org/zh-CN/docs/Glossary/Node/DOM). 节点由他们与其他节点的关系定义. 有些元素是子节点的父节点, 而子节点又有兄弟节点.

了解 DOM 可以帮助您设计, 调试和维护 CSS, 因为 DOM 是 CSS 与文档内容的交汇处. 当你使用浏览器开发者工具时, 你会浏览 DOM 并选择节点, 以查看他们应用了哪些规则.

## 一个真实的 DOM 案例

以下面的 HTML 代码为例:

```html
<p>
    Let's use:
    <span>Cascading</span>
    <span>Style</span>
    <span>Sheets</span>
</p>
```

在这个 DOM 中, 元素 `<p>` 对应的节点是父节点. 其孩子有 1 个文本节点和 3 个 `<span>` 元素对应的节点. `SPAN` 节点也是其文本节点的父节点:

```
P
├─ "Let's use:"
├─ SPAN
|  └─ "Cascading"
├─ SPAN
|  └─ "Style"
└─ SPAN
    └─ "Sheets"
```



---

?> {docsify-updated}