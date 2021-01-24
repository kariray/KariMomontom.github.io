const clockContainer = document.querySelector(".js-clock"),
    hourMinute = clockContainer.querySelector(".HM"),
    second = clockContainer.querySelector(".S");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    hourMinute.innerText = `${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes}`;
    second.innerText = `${seconds < 10 ? `0${seconds}` : seconds}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}
init();