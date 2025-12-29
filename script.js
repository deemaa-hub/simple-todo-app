const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filters button");

document.addEventListener("DOMContentLoaded", loadTasks);

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", e => {
    if (e.key === "Enter") addTask();
});

// Add task
function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    const task = { text, completed: false };
    saveTask(task);
    renderTasks("all");

    taskInput.value = "";
    taskInput.focus();
}

// Save to localStorage
function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasks() {
    return localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks"))
        : [];
}

// Load tasks
function loadTasks() {
    renderTasks("all");
}

// Render tasks with filter
function renderTasks(filter) {
    taskList.innerHTML = "";
    const tasks = getTasks();

    tasks.forEach((task, index) => {
        if (
            filter === "completed" && !task.completed ||
            filter === "active" && task.completed
        ) return;

        const li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) li.classList.add("completed");

        li.addEventListener("click", () => {
            task.completed = !task.completed;
            updateTasks(tasks);
            renderTasks(filter);
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "delete-btn";

        deleteBtn.addEventListener("click", e => {
            e.stopPropagation();
            tasks.splice(index, 1);
            updateTasks(tasks);
            renderTasks(filter);
        });

        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}

// Update localStorage
function updateTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Filter buttons
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderTasks(btn.dataset.filter);
    });
});



