# 08-使用 JSON

> 理解如何使用存储在 JSON (JavaScript Object Notation) 里的数据, 以及如何创建 JSON 字符串.

---

## JSON 简介

JSON 是一种和 JavaScript **对象字面量**格式很相似的**字符串**. JSON 可以存储在独立的扩展名为 `.json` 的文本文件中, 其 MIME 类型为 `application/json`.

这是一个 JSON 示例:

```json
{
    "squadName": "Super hero squad",
    "active": true,
    "members": [
        {
            "name": "Molecule Man",
            "age": 29,
            "powers": [
                "Radiation resistance",
                "Turning tiny",
                "Radiation blast"
            ]
        },
        {
            "name": "Madame Uppercut",
            "age": 39,
            "powers": [
                "Million tonne punch",
                "Damage resistance",
                "Superhuman reflexes"
            ]
        },
        {
            "name": "Eternal Flame",
            "age": 1000000,
            "powers": [
                "Immortality",
                "Heat Immunity",
                "Inferno"
            ]
        }
    ]
}
```

- JSON 是纯粹的具有特定数据格式的字符串, 只含**属性** (property), 不含方法 (method).
- JSON 使用**双引号**包裹**字符串**和**属性名**.
- JSON 内部的数据类型也是有效的 JSON 格式, 不用限定为数组或对象. 例如, 单个**字符串**或**数字**, 也是有效的 JSON.

> ⚠️ 把字符串转换为对象, 称为反序列化 (deserialization); 把对象转换为可以在网络传输的字符串, 称为序列化 (serialization).

---

## JSON 使用实例

JSON 将被加载到脚本中, 并通过一些 DOM 操作被展示. 最终效果如下图:

![](../_assets/_images/json-superheroes.png ':size=600')

<!-- tabs:start -->

#### **HTML**

```html
<!DOCTYPE html>
<html lang="en-us">

<head>
    <meta charset="utf-8">
    <title>Our superheroes</title>

    <link href="https://fonts.googleapis.com/css?family=Faster+One" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <header></header>

    <section></section>

    <script></script>
</body>

</html>
```

#### **style.css**

```css
/* || general styles */

html {
    font-family: 'helvetica neue', helvetica, arial, sans-serif;
}

body {
    width: 800px;
    margin: 0 auto;
}

h1,
h2 {
    font-family: 'Faster One', cursive;
}

/* header styles */

h1 {
    font-size: 4rem;
    text-align: center;
}

header p {
    font-size: 1.3rem;
    font-weight: bold;
    text-align: center;
}

/* section styles */

section article {
    width: 33%;
    float: left;
}

h2 {
    font-size: 2.5rem;
    letter-spacing: -5px;
    margin-bottom: 10px;
}
```

<!-- tabs:end -->

### 顶层函数 (top-level function)

总的逻辑就是获取 JSON 文件, 然后展示其中的数据.

```js
async function populate() {
    const requestURL =
        "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const superHeroes = await response.json();

    // 这两个函数的具体实现在后面
    populateHeader(superHeroes);
    populateHeroes(superHeroes);
}
```

1. 声明变量 `requestURL` 来储存 JSON 文件所在的 URL.
2. 用该 URL 初始化一个新的 `Request` 对象.
3. 使用函数 `fetch()` 进行网络请求, 并返回一个 `Response` 对象.
4. 使用 `Response` 对象的 `json()` 方法把响应里的 JSON 数据反序列化为对象.

### 填充 header

```js
function populateHeader(obj) {
    const header = document.querySelector("header");
    const myH1 = document.createElement("h1");
    myH1.textContent = obj.squadName;
    header.appendChild(myH1);

    const myPara = document.createElement("p");
    myPara.textContent = `Hometown: ${obj.homeTown} // Formed: ${obj.formed}`;
    header.appendChild(myPara);
}
```

### 创建英雄信息卡片

```js
function populateHeroes(obj) {
    const section = document.querySelector("section");
    const heroes = obj.members;

    for (const hero of heroes) {
        const myArticle = document.createElement("article");
        const myH2 = document.createElement("h2");
        const myPara1 = document.createElement("p");
        const myPara2 = document.createElement("p");
        const myPara3 = document.createElement("p");
        const myList = document.createElement("ul");

        myH2.textContent = hero.name;
        myPara1.textContent = `Secret identity: ${hero.secretIdentity}`;
        myPara2.textContent = `Age: ${hero.age}`;
        myPara3.textContent = "Superpowers:";

        const superPowers = hero.powers;
        for (const power of superPowers) {
            const listItem = document.createElement("li");
            listItem.textContent = power;
            myList.appendChild(listItem);
        }

        myArticle.appendChild(myH2);
        myArticle.appendChild(myPara1);
        myArticle.appendChild(myPara2);
        myArticle.appendChild(myPara3);
        myArticle.appendChild(myList);

        section.appendChild(myArticle);
    }
}
```

### 调用顶层函数

```js
populate();
```

---

## 对象和文本间的转换

上例是比较简单的, 因为我们通过方法 `response.json()` 直接把网络响应转换为对象.

如果我们收到的是原始的 JSON 字符串, 就需要自己将其转换为对象 (反序列化). 如果我们想通过网络发送一个对象, 就需要在发送前先将其转换为 JSON 字符串 (序列化).

浏览器内建的 `JSON` 对象有以下两个方法:

- `parse()`: 把 JSON 字符串反序列化为对象.
- `stringify()`: 把对象序列化为 JSON 字符串.

所以上面实例中的顶层函数也可以这样重构:

- 通过调用响应的 `text()` 方法, 获得其中的文本.
- 使用方法 `parse()` 把文本转换为对象.

```js
async function populate() {
    const requestURL =
        "https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json";
    const request = new Request(requestURL);

    const response = await fetch(request);
    const superHeroesText = await response.text();
    const superHeroes = JSON.parse(superHeroesText);

    populateHeader(superHeroes);
    populateHeroes(superHeroes);
}
```

`stringify()` 则是相反的操作. 例如:

```js
// 创建一个对象
let myObj = { name: "Chris", age: 38 };
// 把对象序列化为 JSON 字符串
let myString = JSON.stringify(myObj);
```



---

?> {docsify-updated}