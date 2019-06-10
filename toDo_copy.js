const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".toDoList");

const toDosLS = `toDos`;
let toDos = [];

const saveToDos = () => {
  // save
  localStorage.setItem(toDosLS, JSON.stringify(toDos));
};

const deleteToDo = event => {
  // delete
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
  // write to do
  const li = document.createElement(`li`);
  const span = document.createElement(`span`);
  const delBtn = document.createElement(`button`);
  const newId = toDos.length + 1;

  span.innerHTML = text;
  delBtn.innerHTML = `x`;
  delBtn.addEventListener(`click`, deleteToDo);

  li.id = newId;
  li.appendChild(span);
  li.appendChild(delBtn);
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
  toDoForm.addEventListener(`submit`, handleSubmit);
};

init();
