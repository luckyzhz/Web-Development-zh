# 06-HTML 中的图片

> 如果图像对内容有意义, 则应使用 HTML 图像. 如果图片纯粹是装饰, 则应使用 CSS 背景图片.

---

## 图片 (image)

插入图片用 `<img>` 标签.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="rNzRgRd" data-editable="true" data-user="luckyzhz" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/luckyzhz/pen/rNzRgRd">
  03-超链接和图片_&lt;img&gt;</a> by luckyzhz (<a href="https://codepen.io/luckyzhz">@luckyzhz</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

- `<img>` 是单标签, 没有结束标签, 同时也是行内标签.
- 属性 `src` 指明图片的来源 (source), 可以用绝对路径或相对路径.
  - 如果图片就在自己的服务器上, 倾向于用相对路径. 一方面有利于自包含, 方便迁移网站; 另一方面, 也能提高资源请求效率.
- 属性 `alt` 定义了当图片无法显示时的替代文本 (alternative text).
  - 图片无法加载的原因很多, 例如网络不佳, 图片路径已经更改等. 坚持写 `alt` 属性是一个好习惯, 因为当用户使用纯文本阅读器或朗读器时, 也能获取最基本的图片信息.

---

## 为图片添加注释

元素 `<figure>` 和 `<figcaption>` 用于为图片提供一个语义化容器, 并清晰地把图片和标题联系起来.

```html
<figure>
    <img
      src="https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML/image-with-title.png"
      alt="恐龙骨架的头部和躯干; 头部较大, 长有锋利的牙齿"
      width="400"
      height="341">

    <figcaption>
        曼彻斯特大学博物馆展出的霸王龙.
    </figcaption>
</figure>
```

figure 不一定是图像. 他是一个独立的内容单元, 以紧凑, 易于理解的方式传达意思. figure 可以是几张图片, 一个代码片段, 音频, 视频, 公式, 表格, 或其他内容.

---

?> {docsify-updated}