# 10-CSS 中的值与单位

> 了解 CSS 属性中使用的不同类型的值 (value) 和单位 (unit).

---

## CSS 中的值

值类型 (value type) 用尖括号 (`<>`) 包裹, 如 `<color>` 或 `<length>`. CSS 中的每个值类型定义了一个可用值的集合.

例如, 当值类型 `<color>` 作为某个属性的可用值, 就意味着可以使用任何有效的颜色 (如这个参考页面 [`<color>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value) 所列) 作为该属性的值.

---

## 数字和长度

### 数字

| 数据类型 | 描述 |
| :--- | :--- |
| `<integer>` | 整数, 如 `1024` 或 `-55`. |
| `<number>` | 可能带小数的数字, 如 `0.255`, `128`, 或 `-1.2`. |
| `<dimension>` | `<number>` 附加上单位, 如 `45deg`, `5s`, 或 `10px`. `<dimension>` 是一个总括类别, 包括 `<length>`, `<angle>`, `<time>`, 和 `<resolution>` 等类型. |
| `<percentage>` | 百分比是相对值，如 `50%`. |

### 长度

CSS 中 `<length>` 分为两类, 绝对长度和相对长度, 如 `10px` 或 `30em`.

#### 绝对长度单位

| Unit | Name | 相当于 |
| --- | --- | --- |
| `cm` | Centimeter         | 1cm = 37.8px        |
| `mm` | Millimeter         | 1mm = 1cm 的 1/10   |
| `Q`  | Quarter-millimeter | 1Q = 1cm 的 1/40    |
| `in` | Inch               | 1in = 2.54cm = 96px |
| `pc` | Pica               | 1pc = 1in 的 1/6    |
| `pt` | Point              | 1pt = 1in 的 1/72   |
| `px` | Pixel              | 1px = 1in 的 1/96   |

#### 相对长度单位

一些常用的相对长度单位:

| Unit | 相对于 |
| --- | --- |
| `em`         | 在排版属性中, 如 `font-size`, 指父元素的字体大小.<br>在其他属性中, 如 `width`, 指元素本身的字体大小. |
| `ex`         | 元素字体里字符 "x" 的高度. |
| `ch`         | 元素字体里字符 "0" 的宽度. |
| `rem`        | 根元素的字体大小. |
| `lh`         | 元素的行高. |
| `rlh`        | 根元素的行高. |
| `vw`         | 视口宽度的 1%. |
| `vh`         | 视口高度的 1%. |
| `vmin`       | 视口宽高里较小一边的 1%. |
| `vmax`       | 视口宽高里较大一边的 1%. |

---

## 颜色

可用以下方式定义 `<color>`:

- 关键字:
  - `color: greenyellow;`, `background-color: antiquewhite;`
- 十六进制 RGB 值 (可选的 alpha 分量表示不透明度):
  - `color: #02798b;`, `background-color: #128a7d;`
  - `background: #128a7d5e;`
- RGB 值 (可选的 alpha 分量表示不透明度):
  - `color: rgb(31 120 50);`
  - `background: rgb(30% 20% 50%);`
  - `color: rgb(255 122 127 / 80%);`
  - `background: rgb(255 122 127 / 0.1);`
- HSL 值 (色相 hue, 饱和度 saturation, 亮度 lightness. 可选的 alpha 分量表示不透明度):
  - `color: hsl(50 80% 40%);`
  - `background: hsl(150deg 30% 60%);`
  - `color: hsl(0.3turn 60% 45% / .7);`
  - `background: hsl(0 80% 50% / 25%);`

> ⚠️ 颜色的不透明度和元素的 `opacity` 属性有关键区别. 属性 `opacity` 设置的是整个元素和他里面所有东西的不透明度.

---

## 图片

`<image>` 可以是 `url()` 函数提供的真实图片, 也可以是渐变 (gradient).

```css
.image {
    background-image: url(star.png);
}

.gradient {
    background-image: linear-gradient(90deg, rgb(119, 0, 255, 1) 39%, rgb(0, 212, 255, 1) 100%);
}
```

---

## 位置

`<position>` 表示一组 2D 坐标, 用于定位项目, 如背景图片的定位 (`background-position`). 可用以下方式表示位置:

- 关键字:
  - `top`, `left`, `bottom`, `right`, `center`
  - 把项目对齐到 2D 盒子的边界.
- `<length>`
  - x 和 y 坐标. 左上角的坐标是 (0, 0).

```css
.box {
    height: 300px;
    width: 400px;
    background-image: url(star.png);
    background-repeat: no-repeat;
    background-position: right 40px;
}
```

---

## 函数

类似其他语言, CSS 也有 [function](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Functions). 像 `<color>` 中的 `rgb()` 和 `hsl()` 都是函数.

`calc()` 是常用的一个 [math function](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions#math_functions), 可用于加减乘除.

 ```css
 .wrapper {
    width: 400px;
}

.box {
    width: calc(20% + 100px);
}
```

还有许多其他数学函数, 如 `min()`, `max()`, 和 `clamp()`, 分别用于取最小值, 最大值和中间值.

还有许多三角函数, 如 `sin()`, `cos()`, 和 `tan()`.



---

?> {docsify-updated}