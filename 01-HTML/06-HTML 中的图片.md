# 06-HTML 中的图片

> 如果图像对内容有意义, 则应使用 HTML 图像. 如果图片纯粹是装饰, 则应使用 CSS 背景图片.

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