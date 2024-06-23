const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = loadTasksFromLocalStorage();
let id = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 0;
displayTasks(tasks);

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});

function addTask(text) {
    let task = {
        id: id++,
        text: text,
        isComplete: false
    }

    tasks.push(task);
    addTaskToDOM(task);
    saveTasksToLocalStorage(tasks);
}

function addTaskToDOM(task) {
    const li = document.createElement('li');
    li.innerHTML = task.text + '<div><button class="changeStatus">Изменить статус</button><button class="deleteBtn">Удалить</button></div>';
    li.setAttribute('data-task-id', task.id);
    if (task.isComplete) {
        li.classList.add('completed');
    }
    taskList.appendChild(li);

    const changeStatusBtn = li.querySelector('.changeStatus');
    changeStatusBtn.addEventListener('click', (event) => {
        task.isComplete = !task.isComplete;
        li.classList.toggle('completed');
        saveTasksToLocalStorage(tasks);
    });

    const deleteBtn = li.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', (event) => {
        taskList.removeChild(li);
        tasks = tasks.filter(item => item.id !== task.id);
        saveTasksToLocalStorage(tasks);
    });
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const tasksJSON = localStorage.getItem('tasks');
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}

function displayTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}