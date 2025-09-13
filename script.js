const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks on start
renderTasks();

// Add Task
function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) {
        alert("Please enter a task");
        return;
    }

    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();

    taskInput.value = "";
}

// Save to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Render tasks
function renderTasks() {
    taskList.innerHTML = "";
    if (tasks.length === 0) {
        taskList.innerHTML = "<p style='text-align:center; color:gray; '>No tasks yet! </p>";
        return;
    }
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        const taskTextEl = document.createElement('span');
        taskTextEl.textContent = task.text;
        li.appendChild(taskTextEl);

        li.addEventListener('click', () => toggleComplete(index));

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('task-buttons');

        // Edit Button
        const editBtn = document.createElement('button');
        editBtn.textContent = "✏";
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            editTask(index);
        });

        // Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "🗑";
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTask(index);
        });

        btnContainer.appendChild(editBtn);
        btnContainer.appendChild(deleteBtn);

        li.appendChild(btnContainer);
        taskList.appendChild(li);
    });
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newTask = prompt("Edit your task:", tasks[index].text);
    if (newTask !== null && newTask.trim() !== "") {
        tasks[index].text = newTask.trim();
        saveTasks();
        renderTasks();
    }
}

// Event listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === "Enter") addTask();
});
