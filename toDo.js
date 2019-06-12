const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".toDoList");

const toDosLS = "toDos";
let toDos = [];

const saveToDos = () => {
  localStorage.setItem(toDosLS, JSON.stringify(toDos));
};

const deleteToDos = event => {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  const cleanToDos = toDos.filter(toDo => {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
};

const checkToDos = event => {
  const checkBox = event.target;
  const li = checkBox.parentNode;
  // console.log(li.childNodes[1]);
  const span = li.childNodes[1];
  clearToDo(span);
  // clearInit();
};

const paintToDo = text => {
  const checkBox = document.createElement("input");
  const li = document.createElement("li");
  const span = document.createElement("span");
  const newId = toDos.length + 1;

  checkBox.setAttribute("type", "checkbox");
  checkBox.addEventListener("click", checkToDos);
  span.innerHTML = text;
  // delBtn.innerHTML = "❌";
  // delBtn.addEventListener("click", deleteToDos);

  li.id = newId;
  li.appendChild(checkBox);
  li.appendChild(span);
  // li.appendChild(delBtn);
  toDoList.appendChild(li);

  const toDoObj = {
    text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
};

const loadToDos = () => {
  const loadToDo = localStorage.getItem(toDosLS);
  if (loadToDo !== null) {
    const parseToDos = JSON.parse(loadToDo);
    parseToDos.forEach(toDo => {
      paintToDo(toDo.text);
    });
  }
};

const handleSubmit = event => {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
};

const init = () => {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
};
init();
