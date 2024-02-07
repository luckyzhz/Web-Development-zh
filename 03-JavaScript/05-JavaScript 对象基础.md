# 05-JavaScript 对象基础

> 理解在 JavaScript 中使用对象 (object) 的基础知识: 创建对象, 访问和修改对象属性 (property) 以及使用构造函数 (constructor).

---

## 对象字面量 (literal)

可以直接在大括号 (`{}`) 里书写键值对来创建对象:

```js
const person = {
    name: ["Bob", "Smith"],
    age: 32,
    bio: function () {
        console.log(`${this.name[0]} ${this.name[1]} is ${this.age} years old.`);
    },
    introduceSelf: function () {
        console.log(`Hi! I'm ${this.name[0]}.`);
    },
};
```

---

## 访问对象成员 (member)

### 点

```js
person.age;     // 32
person.bio();   // Bob Smith is 32 years old.
```

### 方括号

```js
person["age"];  // 32
person["name"]; // [ "Bob", "Smith" ]
```

这看起来跟访问数组项类似, 只不过对象是把字符串映射到值, 而数组是把数字映射到值. 所以, 对象有时也被称为关联数组 (associative array).

某些情况下, 必须使用方括号访问对象成员. 例如当对象的**属性名保存在变量中**.

```js
const person = {
    name: ["Bob", "Smith"],
    age: 32,
};

function logProperty(propertyName) {
    // 因为属性名保存在变量中, 所以必须使用方括号来访问
    console.log(person[propertyName]);
}

logProperty("name");    // ["Bob", "Smith"]
logProperty("age");     // 32
```

---

## 设置对象成员

不但可以更新对象已有的成员, 而且可以创建新成员.

```js
// 更新成员
person.age = 45;

// 新增成员
person["eyes"] = "hazel";
person.farewell = function () {
    console.log("Bye everybody!");
};
```

---

## 构造函数 (constructor)

可以用构造函数来简化创建多个同类对象.

```js
function Person(name) {
    // 关键字 this
    this.name = name;
    this.introduceSelf = function () {
        console.log(`Hi! I'm ${this.name}.`);
    };
}

// 关键字 new
const salva = new Person("Salva");
salva.introduceSelf();      // "Hi! I'm Salva."

const frankie = new Person("Frankie");
frankie.introduceSelf();    // "Hi! I'm Frankie."
```



---

?> {docsify-updated}