const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        addTask(taskText);
        taskInput.value = '';
    }
});

let tasks = [];
let id = 0;

function addTask(text) {

    let task = {
        id: id++,
        text: text,
        isComplete: false
    }
    console.log(id)

    tasks.push(task);

    const li = document.createElement('li');
    li.innerHTML = text + '<div><button class="changeStatus">Изменить статус</button><button class="deleteBtn">Удалить</button></div>';
    taskList.appendChild(li);

    const changeStatusBtn = li.querySelector('.changeStatus');
    changeStatusBtn.addEventListener('click', (event) => {
        if (task.isComplete) {
            li.classList.remove('completed');
        } else {
            li.classList.add('completed');
        }
        task.isComplete = !task.isComplete;
    });

    const deleteBtn = li.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', (event) => {
        taskList.removeChild(li);
        tasks = tasks.filter(item => item !== task);
    });
}