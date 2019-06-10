const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".toDoList");

const toDosLS = `toDos`;
let toDos = [];

const saveToDos = () => {
  localStorage.setItem(toDosLS, JSON.stringify(toDos));
};

const deleteToDo = event => {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  const cleanToDos = toDos.filter(toDo => {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
};

const paintToDo = text => {
  // write toDos
  const li = document.createElement(`li`);
  const span = document.createElement(`span`);
  const delBtn = document.createElement(`button`);

  const newId = toDos.length + 1;

  span.innerHTML = text;
  delBtn.innerHTML = `❌`;
  delBtn.addEventListener(`click`, deleteToDo);

  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
};

const loadToDos = () => {
  const loadToDos = localStorage.getItem(toDosLS);
  if (loadToDos !== null) {
    const parseToDos = JSON.parse(loadToDos);
    parseToDos.forEach(toDo => {
      paintToDo(toDo.text);
    });
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const currnetValue = toDoInput.value;
  paintToDo(currnetValue);
  toDoInput.value = "";
};

const init = () => {
  loadToDos();
  document.addEventListener(`submit`, handleSubmit);
};

init();
