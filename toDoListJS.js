/*Global variable*/
const getWhatToDo = document.querySelector(".getWhatToDo"),
    toDoInput = getWhatToDo.querySelector("input"),
    doingList = document.querySelector(".doingList"),
    finishedList = document.querySelector(".finishedList");

const DOING_LS = "doing",
    FINISHED_LS = "finished";

let doArr = [];
let finArr = [];
/**********************************************/

/*save LocalStorage*/
function saveDoing() {
    localStorage.setItem(DOING_LS, JSON.stringify(doArr));
}

function saveFinished() {
    localStorage.setItem(FINISHED_LS, JSON.stringify(finArr));
}
/**********************************************/

/*Doing*/
function paintDoing(text, id) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const finBtn = document.createElement("button");
    const span = document.createElement("span");

    span.innerText = text;
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteDoing);
    finBtn.innerHTML = "✅";
    finBtn.addEventListener("click", giveToFin);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(finBtn);
    li.id = id;
    doingList.appendChild(li);
    const doObj = {
        id: id,
        text: text
    };
    doArr.push(doObj);
    saveDoing();
}

function giveToFin(event) {
    const btn = event.target;
    const getLi = btn.parentNode;
    const id = getLi.id;
    const text = getLi.querySelector("span").innerText;
    paintFinished(text, id);
    doingList.removeChild(getLi);

    refreshPenLS(getLi);
}

function refreshPenLS(parentNode) {
    const cleanDoing = doArr.filter(function (x) {
        return parseInt(x.id) !== parseInt(parentNode.id);
    });
    doArr = cleanDoing;
    saveDoing();
}

function deleteDoing(event) {
    const btn = event.target;
    const li = btn.parentNode;
    doingList.removeChild(li);

    const cleanDoing = doArr.filter(function (doing) {
        return parseInt(doing.id) !== parseInt(li.id);
    });
    doArr = cleanDoing;
    saveDoing();
}
/**********************************************/

/*Finished */
function paintFinished(text, id) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const penBtn = document.createElement("button");
    const span = document.createElement("span");

    span.innerText = text;
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteFinished);
    penBtn.innerHTML = "❗";
    penBtn.addEventListener("click", giveToDoing);
    li.appendChild(span);
    li.appendChild(delBtn);
    li.appendChild(penBtn);
    li.id = id;
    finishedList.appendChild(li);

    const finObj = {
        id: id,
        text: text
    };
    finArr.push(finObj);
    saveFinished();
}

function deleteFinished(event) {
    const btn = event.target;
    const li = btn.parentNode;
    finishedList.removeChild(li);
    const cleanFinished = finArr.filter(function (fin) {
        return parseInt(fin.id) !== parseInt(li.id);
    });
    finArr = cleanFinished;
    saveFinished();
}

function giveToDoing(event) {
    const btn = event.target;
    const getLi = btn.parentNode;
    const id = getLi.id;
    const text = getLi.querySelector("span").innerText;
    paintDoing(text, id);
    finishedList.removeChild(getLi);

    refreshFinLS(getLi);
}

function refreshFinLS(parentNode) {
    const cleanFinished = finArr.filter(function (x) {
        return parseInt(x.id) !== parseInt(parentNode.id);
    });
    finArr = cleanFinished;
    saveFinished();
}
/**********************************************/


/*Submit Event */
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    const newId = Date.now();
    paintDoing(currentValue, newId);
    toDoInput.value = "";
}
/**********************************************/

/*load Funcsions*/
function loadFinished() {
    const loadFinished = localStorage.getItem(FINISHED_LS);
    if (loadFinished !== null) {
        const parsedFinished = JSON.parse(loadFinished);
        parsedFinished.forEach(function (fin) {
            paintFinished(fin.text, fin.id);
        });
    }
}

function loadDoing() {
    const loadDoing = localStorage.getItem(DOING_LS);
    if (loadDoing !== null) {
        const parsedDoing = JSON.parse(loadDoing);
        parsedDoing.forEach(function (doing) {
            paintDoing(doing.text, doing.id);
        });
    }
}
/**********************************************/

/*init */
function init() {
    loadDoing();
    loadFinished();
    getWhatToDo.addEventListener("submit", handleSubmit);
}
init();
  /**********************************************/