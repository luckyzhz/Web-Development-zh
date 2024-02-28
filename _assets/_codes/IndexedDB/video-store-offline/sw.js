// 关键字 self 指 service worker 本身.
self.addEventListener('install', e => {
    // `waitUntil()` 使得其内部的所有 promise 都 fulfilled 之后, 浏览器才完成 service worker 的安装
    e.waitUntil(
        // 即要等里面这些 promise 都  fulfilled 之后, 事件 `e` 才完成
        caches.open('video-store').then(function (cache) {
            return cache.addAll([
                // 缓存的资源必须使用从网站根目录开始的绝对路径
                '/_assets/_codes/IndexedDB/video-store-offline/',
                '/_assets/_codes/IndexedDB/video-store-offline/index.html',
                '/_assets/_codes/IndexedDB/video-store-offline/index.js',
                '/_assets/_codes/IndexedDB/video-store-offline/index.css'
            ]);
        })
    );
});

// 更进一步, 可以拦截代理所有 `fetch` 请求
self.addEventListener('fetch', e => {
    console.log(e.request.url);
    e.respondWith(
        // 逻辑运算符返回的是参与运算的某个操作数的值.
        // 如果在缓存里找到, 则逻辑表达式里 response 判定为 true, 直接返回 response, 后面的 fetch(e.request) 被短路, 不执行;
        // 如果找不到, 则 response 的值为 undefined, 于是后面的 fetch(e.request) 要执行, 返回 fetch(e.request) 的返回值
        caches.match(e.request).then(response => response || fetch(e.request))
    );
});