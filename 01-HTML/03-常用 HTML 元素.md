# 03-常用 HTML 元素

> 介绍一些基础的 HTML 元素.

---

## 标题和段落

有 6 级标题 (heading), 从大到小依次是: `h1`, `h2`, `h3`, `h4`, `h5`, 和 `h6`.

元素 `<h1>` 表示主标题 (main heading); `<h2>` 表示次标题 (subheading); `<h3>` 表示次次标题 (sub-subheading); 依此类推.

元素 `<p>` 用来包裹段落 (paragraph).

例如:

```html
<h1>故事标题</h1>

<p>段落.</p>

<p>另一个段落.</p>
```

最佳实践:
- 每个页面只有一个 `<h1>`: 这是顶级标题, 所有其他标题都应位于其下.
- 按照正确顺序使用标题: 例如不要跳过 `<h2>` 就去使用 `<h3>`.
- 一个页面中, 一般不应使用超过 3 级标题: 如果使用的标题层次过多, 建议将内容分散到多个页面上.

---

## 列表 (list)

列表包括无序列表 (unordered list) 和有序列表 (ordered list). 在一个列表的项 (list item) 里嵌入其他列表也是可以的.

### 无序列表

```html
<ul>
    <li>牛奶</li>
    <li>鸡蛋</li>
    <li>面包</li>
</ul>
```

### 有序列表

```html
<ol>
    <li>走到路的尽头</li>
    <li>右转</li>
    <li>直行穿过前两个交通环岛</li>
</ol>
```

---

## 强调和重点

### 强调 (emphasis)

```html
<!-- 例如表示讽刺 -->
<p>I am <em>glad</em> you weren't <em>late</em>.</p>
```

### 重点 (strong importance)

```html
<p>This liquid is <strong>highly toxic</strong>.</p>
```

---

## 超链接 (hyperlink)

### 使用 title 属性添加辅助信息

当鼠标悬浮在元素上时, title 文本会出现在鼠标旁边.

```html
<p>
    我创建了一个链接去往
    <a
      href="https://developer.mozilla.org"
      title="了解 Mozilla 使命和贡献方式的最佳途径">
      Mozilla 主页</a>.
</p>
```

### 文档片段

可以链接到 HTML 文档的特定部分, 即文档片段 (document fragment). 要做到这一点, 首先要为被链接的元素指定一个 `id` 属性. 通常情况下, 链接到一个特定的标题是合理的, 看起来像下面这样:

```html
<h2 id="Mailing_address">邮件地址</h2>
```

然后, 要链接到这个特定的 `id`, 就需要在 URL 末尾附上 `#id`. 例如:

```html
<p>
    想要给我们写信吗? 我们的
    <a href="contacts.html#Mailing_address">邮件地址</a>.
</p>
```

甚至可以用文档片段引用到当前文档的特定部分, 只要 `#` 前面的 URL 留空即可:

```html
<p>
    <a href="#Mailing_address">公司邮件地址</a> 在页面底部.
</p>
```

### 链接到下载时, 使用 download 属性

在链接到需要下载而不是在浏览器中打开的资源时, 可以使用 `download` 属性提供默认的保存文件名. 下面是一个下载 Windows 版本火狐浏览器的示例:

```html
<a
  href="https://download.mozilla.org/?product=firefox-latest-ssl&os=win64&lang=en-US"
  download="firefox-latest-64bit-installer.exe">
  下载最新版 Firefox 浏览器 (x64)
</a>
```

### Email 链接

如果想点击链接时开启新的邮件发送, 可以使用 `<a>` 元素和 `mailto:` URL 协议:

```html
<a href="mailto:nowhere@mozilla.org">向 nowhere 发邮件</a>
```

实际上, email 地址是可选项. 如果省略了 email 地址, 那么就变成了 `href="mailto:"`. 这时如果点击, 就会开启新的邮件发送, 但是没有默认的目标 email 地址. 这种特意留空的 `mailto:` 经常用于分享按钮.

#### 指定 email 详细信息

除了 email 地址, 你还可以提供其他信息. 实际上, 任何标准邮件头部字段都可以添加到 `mailto:` URL 中. 最常用的有主题 (subject), 抄送 (cc), 主体 (body, 用于为新邮件指定简短的内容). 每个字段通过查询项 (query term) 指定.

下面是一个包含  cc, bcc, subject 和 body 的实例:

```html
<a
  href="mailto:nowhere@mozilla.org?cc=name2@rapidtables.com&bcc=name3@rapidtables.com&subject=The%20subject%20of%20the%20email&body=The%20body%20of%20the%20email">
  发送带有 cc, bcc, subject 和 body 的邮件
</a>
```

> ⚠️: 每个字段的值必须使用 URL 编码, 即使用 [百分号转义](https://zh.wikipedia.org/wiki/百分号编码) 的非打印字符, 如制表符, 换行符, 分页符和空格. 同时注意使用 `?` 来分隔主 URL 与参数值, 以及使用 `&` 来分隔各个参数.

---

?> {docsify-updated}