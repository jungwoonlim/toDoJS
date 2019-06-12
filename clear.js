const clearList = document.querySelector(".clearList");

const clearToDosLS = "clearToDos";
let clearToDos = [];

const saveToDo = () => {
  localStorage.setItem(clearToDosLS, JSON.stringify(clearToDos));
};

const clearToDo = text => {
  // Clear to do
  const checkBox = document.createElement("input");
  const li = document.createElement("li");
  const span = document.createElement("span");
  const newId = clearToDos.length + 1;

  li.id = newId;
  checkBox.setAttribute("type", "checkbox");
  console.log(text);
  span.innerHTML = text;

  li.id = newId;
  li.appendChild(checkBox);
  li.appendChild(text);
  clearList.appendChild(li);
  const clearToDoObj = {
    text,
    id: newId
  };
  clearToDos.push(clearToDoObj);
  saveToDos();
};

const loadClearToDos = () => {
  const loadClearToDo = localStorage.getItem(clearToDosLS);
  if (loadClearToDo !== null) {
    const parseToDos = JSON.parse(loadClearToDo);
    parseToDos.forEach(toDo => {
      clearToDo();
    });
  }
};

const clearInit = () => {
  loadClearToDos();
};
