# 11-在 CSS 中调整大小

> 了解在 CSS 中调整大小的方式.

---

## min- 和 max- 尺寸

除了给与固定尺寸, 还可以为元素设置最小 (minimum) 或最大 (maximum) 尺寸.

例如可以用属性 `min-height` 设置元素的最小高度.

```css
.box {
    border: 5px solid darkblue;
    width: 200px;
    min-height: 150px;
}
```

经常为图片设置 `max-width: 100%;`. 这样, 当容器小于图片固有尺寸时, 图片会缩小以适应容器; 当容器大于图片固有尺寸时, 图片会以固有尺寸呈现, 避免了放大导致像素化.

```css
img {
    max-width: 100%;
}
```

如果想在展示其他内容之前先展示一个满屏封面, 可以为封面元素设置 `height: 100vh;`.



---

?> {docsify-updated}