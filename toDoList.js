const toDoForm = document.querySelector(".js-toDoListForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

const toDosLS = "toDos";

let toDos = [];

function filter(toDo) {
  return toDo.id === 1;
}

function saveToDos() {
  localStorage.setItem(toDosLS, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function writeToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const checkBox = document.createElement("input");
  const delBtn = document.createElement("button");

  const newId = toDos.length + 1;

  delBtn.innerHTML = `❌`;
  delBtn.addEventListener("click", deleteToDo);
  span.innerHTML = text;
  checkBox.setAttribute("type", "checkbox");

  li.appendChild(checkBox);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoobj = {
    text,
    id: newId
  };
  toDos.push(toDoobj);
  saveToDos();
}

function loadToDoList() {
  const loadedToDos = localStorage.getItem(toDosLS);
  if (loadedToDos !== null) {
    const parseToDos = JSON.parse(loadedToDos);
    parseToDos.forEach(function(toDo) {
      writeToDo(toDo.text);
    });
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  writeToDo(currentValue);
  toDoInput.value = "";
}

function saveToDoList() {
  toDoForm.addEventListener("submit", handleSubmit);
}

function init() {
  loadToDoList();
  saveToDoList();
}
init();
