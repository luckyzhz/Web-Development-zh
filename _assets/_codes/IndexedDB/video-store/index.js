// 常量
const section = document.querySelector('section');
const videos = [
    { 'name': 'crystal' },
    { 'name': 'elf' },
    { 'name': 'frog' },
    { 'name': 'monster' },
    { 'name': 'pig' },
    { 'name': 'rabbit' }
];
// 用于指向数据库对象的全局变量
let db;

// 数据库成功打开后的初始化函数
function init() {
    // 遍历视频名字
    for (const video of videos) {
        // 打开要操作的表 `videos_os`
        const objectStore = db.transaction('videos_os').objectStore('videos_os');
        // 用视频名字发起获取条目的请求
        const request = objectStore.get(video.name);
        // 请求的 `success` 处理器
        request.addEventListener('success', () => {
            // 如果请求的结果不是 `undefined` 就是说明之前存储过该视频
            if (request.result) {
                // 获取视频并展示
                console.log('taking videos from IDB');
                displayVideo(request.result.mp4, request.result.webm, request.result.name);
            } else {
                // 如果 IDB 数据库里没有, 就从网络获取视频
                fetchVideoFromNetwork(video);
            }
        });
    }
}

// 从网络获取视频
function fetchVideoFromNetwork(video) {
    console.log('fetching videos from network');
    // 用 `fetch()` api 获取数据, 最终响应结果作为 Binary Large Object (BLOB) 返回
    const mp4Blob = fetch(`../../../_videos/${video.name}.mp4`).then(response => response.blob());
    const webmBlob = fetch(`../../../_videos/${video.name}.webm`).then(response => response.blob());

    // `Promise.all()` 要求数组中的 Promise 对象都 fulfilled 才进行下一步
    Promise.all([mp4Blob, webmBlob]).then(values => {
        // 展示从网络获取到的视频
        displayVideo(values[0], values[1], video.name);
        // 存储视频到 IDB 数据库
        storeVideo(values[0], values[1], video.name);
    });
}

// 存储视频到 IDB 数据库
function storeVideo(mp4Blob, webmBlob, name) {
    // 打开要操作的表 `videos_os`
    const objectStore = db.transaction(['videos_os'], 'readwrite').objectStore('videos_os');
    // 创建要保存到数据库的对象
    const record = {
        mp4: mp4Blob,
        webm: webmBlob,
        name: name
    }

    // 发起添加数据的请求
    const request = objectStore.add(record);

    request.addEventListener('success', () => console.log('Record addition attempt finished'));
    request.addEventListener('error', () => console.error(request.error));
}

// 展示视频
function displayVideo(mp4Blob, webmBlob, title) {
    // 用 blob 创建对象 url
    const mp4URL = URL.createObjectURL(mp4Blob);
    const webmURL = URL.createObjectURL(webmBlob);

    // 创建要嵌入到页面的元素
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    h2.textContent = title;
    const video = document.createElement('video');
    video.controls = true;
    const source1 = document.createElement('source');
    source1.src = mp4URL;
    source1.type = 'video/mp4';
    const source2 = document.createElement('source');
    source2.src = webmURL;
    source2.type = 'video/webm';

    // 把上面创建的元素嵌入到页面
    section.appendChild(article);
    article.appendChild(h2);
    article.appendChild(video);
    video.appendChild(source1);
    video.appendChild(source2);
}

// 发起打开数据库的请求 (异步). 如果数据库还不存在, 就由后面的 `upgradeneeded` 事件处理器创建其中的表结构.
// 一开始的数据库版本号是 `1`, 如果需要升级数据库 (如更改表结构), 就得增大版本号后再运行这行代码, 也会触发 `upgradeneeded ` 事件.
const request = window.indexedDB.open('videos_db', 1);

// 如果没有成功打开数据库, 就在控制台输出错误信息
request.addEventListener('error', () => console.error('Database failed to open'));

// 成功打开数据库后的事件处理器
request.addEventListener('success', () => {
    console.log('Database opened successfully');

    // 把数据库对象存储到全局变量
    db = request.result;
    init();
});

// 设置数据库表 (如果之前没有创建过)
request.addEventListener('upgradeneeded', e => {
    // 获取数据库对象
    const db = e.target.result;

    // 创建表 `videos_os`, 主键为 `name`
    const objectStore = db.createObjectStore('videos_os', { keyPath: 'name' });

    // 给表添加两个字段
    objectStore.createIndex('mp4', 'mp4', { unique: false });
    objectStore.createIndex('webm', 'webm', { unique: false });

    console.log('Database setup complete');
});