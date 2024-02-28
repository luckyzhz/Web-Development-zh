// 关键元素的引用 (指针)
const list = document.querySelector('.note-display ul');
const form = document.querySelector('.new-note form');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const submitBtn = document.querySelector('new-note form button');

// 指向数据库的全局变量
let db;

// 发起打开数据库 (名为 `notes_db`) 的请求 (异步). 如果数据库还不存在, 就由后面的 `upgradeneeded` 事件处理器创建其中的表结构.
// 一开始的数据库版本号是 `1`, 如果需要升级数据库 (如更改表结构), 就得增大版本号后再运行这行代码, 也会触发 `upgradeneeded ` 事件.
const openRequest = window.indexedDB.open('notes_db', 1);

// 打开数据库的请求失败时的处理器 (这里仅是输出错误日志)
openRequest.addEventListener('error', () => console.error('Database failed to open'));

// 打开数据库的请求成功时的处理器
openRequest.addEventListener('success', () => {
    console.log('Database opened successfully');

    // 数据库对象在请求的 `result` 属性里
    db = openRequest.result;

    // 展示数据库里已有的数据. 这样网页刚打开时会显示之前的便签.
    displayData();
});

// 如果请求的数据库不存在, 或者请求更高版本的数据库, 就会触发 `upgradeneeded` 事件.
// `upgradeneeded` 事件在 `success` 事件之前发生.
openRequest.addEventListener('upgradeneeded', e => {
    // 指向数据库对象的指针 (`e.target` 其实就是 `openRequest`)
    db = e.target.result;

    // ObjectStore 对象类似于关系型数据库里的表.
    // 这里指定表名为 'notes_os', 主键 (keyPath) 为自增的 id 字段.
    const objectStore = db.createObjectStore('notes_os', { keyPath: 'id', autoIncrement: true });

    // createIndex(indexName, keyPath, options) 创建表中的字段 (列)
    objectStore.createIndex('title', 'title', { unique: false });
    objectStore.createIndex('body', 'body', { unique: false });

    console.log('Database setup complete');
});

// 提交表单时会添加数据到数据库
form.addEventListener('submit', addData);

// 数据库表新增条目
function addData(e) {
    // 阻止表单的默认提交行为, 以避免页面刷新
    e.preventDefault();

    // 创建要添加到数据库表的对象.
    // 因为 `id` 字段是自增的, 所以可省略 `id` 属性.
    const newItem = { title: titleInput.value, body: bodyInput.value };

    // 针对表 `notes_os` 开启读写事务, 准备添加数据
    const transaction = db.transaction(['notes_os'], 'readwrite');

    // 取得事务里需要进行操作的表 `notes_os`
    const objectStore = transaction.objectStore('notes_os');

    // 发起一个添加新项到表的请求
    const addRequest = objectStore.add(newItem);
    // 成功添加数据后的处理器
    addRequest.addEventListener('success', () => {
        // 清空表单并聚焦输入框, 以便输入下一条便签
        titleInput.value = '';
        bodyInput.value = '';
        titleInput.focus();
    });

    // 读写事务完成后的处理器
    transaction.addEventListener('complete', () => {
        console.log('Transaction completed: database modification finished.');
        // 展示最新的数据
        displayData();
    });

    transaction.addEventListener('error', () => console.log('Transaction not opened due to error'));
}

// 展示数据
function displayData() {
    // 展示数据前先清空现有的列表
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }

    // 取得事务里需要进行操作的表 `notes_os`
    const objectStore = db.transaction('notes_os').objectStore('notes_os');
    // 针对表发起打开 cursor (用于迭代表里的数据项) 的请求, 并添加事件处理器
    objectStore.openCursor().addEventListener('success', e => {
        // cursor 对象在请求的 result 属性里
        const cursor = e.target.result;

        // 只要还有数据项需要迭代, 这部分代码就会被重复运行
        if (cursor) {
            // 创建要添加到页面的元素
            const listItem = document.createElement('li');
            const h3 = document.createElement('h3');
            const para = document.createElement('p');

            listItem.appendChild(h3);
            listItem.appendChild(para);
            list.appendChild(listItem);

            // 把数据放入上面创建的元素
            h3.textContent = cursor.value.title;
            para.textContent = cursor.value.body;

            // 给列表项设置 `data-note-id` 属性, 以便将来可以删除该项
            listItem.setAttribute('data-note-id', cursor.value.id);

            // 列表项的删除按钮
            const deleteBtn = document.createElement('button');
            listItem.appendChild(deleteBtn);
            deleteBtn.textContent = 'Delete';

            // 按钮的点击事件处理器
            deleteBtn.addEventListener('click', deleteItem);

            // 游标移动到下一项并触发 success 事件. 如果下一项没有数据, 则 cursor 值变为 null
            cursor.continue();
        } else {
            // 如果列表为空, 则提示用户没有便签
            if (!list.firstChild) {
                const listItem = document.createElement('li');
                listItem.textContent = 'No notes stored.'
                list.appendChild(listItem);
            }
            console.log('Notes all displayed');
        }
    });

    // 聚焦输入框, 以便输入下一条便签
    titleInput.focus();
}

// 数据库表删除条目
function deleteItem(e) {
    // 获取要删除项的 `id` (之前新增列表项时放到了属性 `data-note-id` 里), 并将其转换为数字 (IDB 键值是类型敏感的)
    const noteId = Number(e.target.parentNode.getAttribute('data-note-id'));

    // 取得事务里需要进行操作的表 `notes_os`, 然后请求删除 `noteId` 对应的条目
    const transaction = db.transaction(['notes_os'], 'readwrite');
    const objectStore = transaction.objectStore('notes_os');
    const deleteRequest = objectStore.delete(noteId);

    // 事务完成后 (这里是成功删除条目) 的处理器
    transaction.addEventListener('complete', () => {
        // 删除列表项
        e.target.parentNode.remove();
        console.log(`Note ${noteId} deleted.`);

        // 如果列表为空, 则提示用户没有便签
        if (!list.firstChild) {
            const listItem = document.createElement('li');
            listItem.textContent = 'No notes stored.';
            list.appendChild(listItem);
        }
    });
}