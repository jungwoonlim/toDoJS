const form = document.querySelector(`.js-form`);
const input = form.querySelector(`input`);
const greeting = document.querySelector(`.js-greetings`);

const userLS = `currentUser`;
const showingCN = `showing`;

function saveName(text) {
  localStorage.setItem(userLS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currnetValue = input.value;
  paintGreeting(currnetValue);
  saveName(currnetValue);
}

function askForName() {
  form.classList.add(showingCN);
  form.addEventListener(`submit`, handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(showingCN);
  greeting.classList.add(showingCN);
  greeting.innerHTML = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(userLS);
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
