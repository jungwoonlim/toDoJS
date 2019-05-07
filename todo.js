const toDoForm = document.querySelector(`.js-toDoForm`);
const toDoInput = toDoForm.querySelector(`input`);
const toDoList = document.querySelector(`.js-toDoList`);

const toDosLS = `toDos`;

function filterFn(toDo) {
  return toDo.id === 1;
}

let toDos = [];

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

function paintToDo(text) {
  const li = document.createElement(`li`);
  const delBtn = document.createElement(`button`);
  const span = document.createElement(`span`);

  const newId = toDos.length + 1;

  delBtn.innerHTML = `❌`;
  delBtn.addEventListener(`click`, deleteToDo);
  span.innerHTML = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(toDosLS);
  if (loadedToDos !== null) {
    const parseToDos = JSON.parse(loadedToDos);
    parseToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener(`submit`, handleSubmit);
}
init();
