const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('todo_list')) || [];
let currentTab = 'all';

function addNewTask() {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ id: Date.now(), text: text, done: false });
        taskInput.value = '';
        updateUI();
    }
}

addBtn.onclick = addNewTask;

taskInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addNewTask();
    }
});

function updateUI() {
    localStorage.setItem('todo_list', JSON.stringify(tasks));
    taskList.innerHTML = '';

    const filtered = tasks.filter(t => {
        if (currentTab === 'active') return !t.done;
        if (currentTab === 'completed') return t.done;
        return true;
    });

    filtered.forEach(t => {
        const li = document.createElement('li');
        if (t.done) li.className = 'completed-item';

        li.innerHTML = `
            <span class="task-text">${t.text}</span>
            <div class="actions">
                <button class="btn-done" onclick="toggle(${t.id})">${t.done ? 'Undo' : 'Done'}</button>
                <button class="btn-del" onclick="remove(${t.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

window.toggle = (id) => {
    tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
    updateUI();
};

window.remove = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    updateUI();
};

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.onclick = (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentTab = e.target.innerText.toLowerCase();
        updateUI();
    };
});

updateUI();



