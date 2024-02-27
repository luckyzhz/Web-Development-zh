const media = document.querySelector("video");
const controls = document.querySelector(".controls");

// 按钮
const play = document.querySelector(".play");
const stop = document.querySelector(".stop");
const rwd = document.querySelector(".rwd");
const fwd = document.querySelector(".fwd");

// 进度条
const timerWrapper = document.querySelector(".timer");
const timer = document.querySelector(".timer span");
const timerBar = document.querySelector(".timer div");

// 正常加载 JavaScript, 于是可以移除默认控件, 显示自定义控件
media.removeAttribute("controls");
controls.style.visibility = "visible";

// 监听按钮与视频的播放状态
play.addEventListener("click", playPauseMedia);
stop.addEventListener("click", stopMedia);
rwd.addEventListener("click", mediaBackward);
fwd.addEventListener("click", mediaForward);
media.addEventListener("timeupdate", setTime);
media.addEventListener("ended", stopMedia);

function playPauseMedia() {
    // 清除倒带或快进
    rwd.classList.remove("active");
    fwd.classList.remove("active");
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
    // 播放状态取反, 并更改图标
    if (media.paused) {
        play.setAttribute("data-icon", "u");
        media.play();
    } else {
        play.setAttribute("data-icon", "P");
        media.pause();
    }
}

function stopMedia() {
    // 清除倒带或快进
    rwd.classList.remove("active");
    fwd.classList.remove("active");
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
    // 重置视频为初始状态
    media.pause();
    media.currentTime = 0;
    play.setAttribute("data-icon", "P");
}

let intervalFwd;
let intervalRwd;

function mediaBackward() {
    // 清除快进
    clearInterval(intervalFwd);
    fwd.classList.remove("active");
    // 倒带状态取反
    if (rwd.classList.contains("active")) {
        rwd.classList.remove("active");
        clearInterval(intervalRwd);
        media.play();
    } else {
        rwd.classList.add("active");
        media.pause();
        intervalRwd = setInterval(windBackward, 200);
    }
}

function mediaForward() {
    // 清除倒带
    clearInterval(intervalRwd);
    rwd.classList.remove("active");
    // 快进状态取反
    if (fwd.classList.contains("active")) {
        fwd.classList.remove("active");
        clearInterval(intervalFwd);
        media.play();
    } else {
        fwd.classList.add("active");
        media.pause();
        intervalFwd = setInterval(windForward, 200);
    }
}

// 后退一步
function windBackward() {
    if (media.currentTime <= 3) {
        rwd.classList.remove("active");
        clearInterval(intervalRwd);
        stopMedia();
    } else {
        media.currentTime -= 3;
    }
}

// 前进一步
function windForward() {
    if (media.currentTime >= media.duration - 3) {
        fwd.classList.remove("active");
        clearInterval(intervalFwd);
        stopMedia();
    } else {
        media.currentTime += 3;
    }
}

// media.currentTime 以秒为单位
function setTime() {
    const minutes = Math.floor(media.currentTime / 60);
    const seconds = Math.floor(media.currentTime - minutes * 60);
    // 确保分钟和秒钟都是两位数
    const minuteValue = minutes.toString().padStart(2, "0");
    const secondValue = seconds.toString().padStart(2, "0");
    // 显示当前播放时间
    const mediaTime = `${minuteValue}:${secondValue}`;
    timer.textContent = mediaTime;
    // 显示进度条
    const barLength =
        timerWrapper.clientWidth * (media.currentTime / media.duration);
    timerBar.style.width = `${barLength}px`;
}