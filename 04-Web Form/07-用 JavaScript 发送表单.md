# 07-用 JavaScript 发送表单

> 用 JavaScript 发送表单可以避免传统方法提交表单后整个页面的重载.

---

在 JavaScript 中通常使用 `fetch()` API 来发送数据给服务器, 或者从服务器获得数据.

## 发送 JSON

`fetch()` API 可以接受一个参数对象, 在里面指定发送方法 (`method`), 请求头 (`headers`), 请求体 (`body`).

```js
// 定义要发送的数据
const data = {
    name: "John Doe",
    age: 30
};

// 使用 fetch 发送数据
fetch('https://example.com/api/data', { // 替换为你的目标URL
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
    .then(response => response.json()) // 解析JSON响应
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
```

---

## 手动构建 FormData 对象

有时服务器要求数据必须是表单格式, 这时就不能使用 JSON, 而得用 `FormData` 对象了.

用 `append()` 方法填充键值对到 `FormData` 对象. 填充的数据可以是字符串 (string), 也可以是二进制数据 (blob).

```js
/**
 * 发送数据到服务器的函数
 * @param {string} url - 服务器的URL地址
 * @param {Object} dataObject - 包含要发送数据的对象
 */
function sendData(url, dataObject) {
    // 创建一个 FormData 对象
    const formData = new FormData();

    // 遍历数据对象, 将数据添加到 FormData 对象中
    for (const key in dataObject) {
        // 只有 dataObject 自己的属性被添加到 FormData 中, 而从原型继承的属性不会被包括在内
        if (dataObject.hasOwnProperty(key)) {
            formData.append(key, dataObject[key]);
        }
    }

    // 在使用 `fetch()` 发送 FormData 时, 不应手动设置 `Content-Type` 头部.
    // 浏览器会自动处理, 确保请求包括适当的 `boundary` 字符串, 用于分隔 `multipart/form-data` 请求体中的各部分.
    fetch(url, {
        method: 'POST',
        body: formData,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// 假设有一个文件输入和一些文本数据
const fileInput = document.querySelector('input[type="file"]');
const userData = {
    username: 'JohnDoe',
    profilePicture: fileInput.files[0], // 假设 fileInput 是一个文件选择器
};

// 调用函数, 发送数据
sendData('https://example.com/upload', userData);
```

> ⚠️ 在使用 `fetch()` 发送 FormData 时, 不应手动设置 `Content-Type` 头部. 浏览器会自动处理, 确保请求包括适当的 `boundary` 字符串, 用于分隔 `multipart/form-data` 请求体中的各部分.

---

## 关联 FormData 对象和 form 元素

假设有一个收集用户姓名和头像的表单:

```html
<form id="userinfo">
    <div>
        <label for="username">Enter your name:</label>
        <input type="text" id="username" name="username" value="Dominic">
    </div>

    <div>
        <label for="avatar">Select an avatar</label>
        <input type="file" id="avatar" name="avatar" required>
    </div>

    <input type="submit" value="Submit">
</form>
```

创建 `FormData` 对象时可以传入 `<form>` 元素, 从而不用手动构建数据.

```js
const form = document.querySelector("#userinfo");

async function sendData(formElement) {
    // 关联 FormData 对象和 form 元素
    const formData = new FormData(formElement);

    try {
        const response = await fetch("https://example.org/post", {
            method: "POST",
            body: formData,
        });
        console.log(await response.json());
    } catch (e) {
        console.error(e);
    }
}

// 阻止表单的提交 (以避免页面重载), 改用 sendData() 发送表单
form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendData(event.target);
});
```



---

?> {docsify-updated}