# 10-HTML 表格

> 介绍一些平时不太注意的 HTML 表格特性.

---

## 用 `<col>` 为表格列添加样式

元素 `<col>` 在容器 `<colgroup>` 里指定, 紧接在 `<table>` 标签之下.

```html
<table style="text-align: center;">
    <colgroup>
        <col style="background-color: gray">
        <col span="2" style="background-color: yellow">
    </colgroup>
    <tr>
        <th>Activity 1</th>
        <th>Activity 2</th>
        <th>Activity 3</th>
    </tr>
    <tr>
        <td rowspan="2">Homework</td>
        <td colspan="2">Swimming</td>
    </tr>
    <tr>
        <td>Basketball</td>
        <td>Football</td>
    </tr>
</table>
```

上例会被渲染成这样:

![](../_assets/_images/styling%20tables%20with%20col.svg ':size=300')

---

## 用 `<caption>` 为表格添加标题

用 `<caption>` 元素为表格指定标题, 紧接在 `<table>` 标签之下.

```html
<table>
    <caption>
        侏罗纪时期的恐龙
    </caption>

    …
</table>
```

---

## 用 `<thead>`, `<tfoot>`, 和 `<tbody>` 结构化表格

用元素 `<thead>`, `<tfoot>`, 和 `<tbody>` 标记表格的 header, footer, 和 body. 这些元素往往作为钩子, 以应用 CSS 到表格.

例如, 如果是一个长表格, 可以让表头和表脚在每个打印页面上重复显示, 也可以让表格主体在单页上显示, 并通过上下滚动来查看内容.

> ⚠️: 元素 `<tbody>` 总是包含在每个表格中. 如果你没有指定, 那他就是隐含的. 要检查这一点, 可以打开一个没有 `<tbody>` 的表格, 然后在浏览器开发者工具中查看其 HTML 代码. 你会看到, 浏览器自动为表格加上了 `<tbody>` 标签.

---

## 嵌套表格

只要包含完整的结构, 包括 `<table>` 元素, 就可以将一个表格嵌套在另一个表格中.



---

?> {docsify-updated}