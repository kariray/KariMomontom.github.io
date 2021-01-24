const getName = document.querySelector(".getName"),
    input = getName.querySelector("input"),
    answer = document.querySelector(".answerDiv"),
    question = document.querySelector(".question");

const USER_LS = "currentUser";
// SHOWING_CN = "showing";

const HIDDEN = "hidden";

function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
    event.preventDafault;
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    //getName.classList.add(SHOWING_CN);
    getName.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    getName.classList.add(HIDDEN);
    question.classList.add(HIDDEN);
    //answer.classList.add(SHOWING_CN);
    answer.classList.remove(HIDDEN);
    answer.innerHTML = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}
init();

