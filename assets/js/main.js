const inputNewTask = document.querySelector('.input-new-task');
const btnAddTask = document.querySelector('.btn-add-task');
const tasks = document.querySelector('.tasks');

addSavedTasks();

function createEl(element, text) {
  const el = document.createElement(element);
  let textNode;
  if (text) {
    textNode = document.createTextNode(text);
    el.appendChild(textNode);
  }
  return el;
}

inputNewTask.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) {
    if (!inputNewTask.value) return;
    createTask(inputNewTask.value);
  }
})

function clearInput() {
  inputNewTask.value = '';
  inputNewTask.focus();
}

function createTask(inputText) {
  const li = createEl('li', inputText);
  const button = createEl('img', 'Erase');
  button.setAttribute('class', 'erase-task');
  button.setAttribute('title', 'click to erase task');
  button.setAttribute('src', './assets/img/delete.svg');
  li.appendChild(button);
  tasks.appendChild(li);
  clearInput();
  saveTasks();
}

btnAddTask.addEventListener('click', () => {
  if (!inputNewTask.value) return;
  createTask(inputNewTask.value);
})

document.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('erase-task')) {
    el.parentElement.remove();
    saveTasks();
  }
})

function saveTasks() {
  const liTasks = tasks.querySelectorAll('li');
  const tasksList = [];

  for (let task of liTasks) {
    let taskText = task.innerText;
    taskText = taskText.replace('Erase', '');
    tasksList.push(taskText);
  }

  let tasksJSON = JSON.stringify(tasksList);
  localStorage.setItem('tasks', tasksJSON);
}

function addSavedTasks() {
  const tasks = localStorage.getItem('tasks');
  const tasksArray = JSON.parse(tasks);

  for (let task of tasksArray) {
    createTask(task);
  }
}