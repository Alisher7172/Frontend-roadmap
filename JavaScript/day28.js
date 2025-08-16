// Day 29 — To-Do List App
// Features: add, remove, mark complete, filter, persist (localStorage)

const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const clearCompleted = document.getElementById("clearCompleted");
const filterBtns = document.querySelectorAll(".filter-btn");

let todos = [];
let filter = "all";

function saveTodos() {
  localStorage.setItem("day29-todos", JSON.stringify(todos));
}
function loadTodos() {
  const data = localStorage.getItem("day29-todos");
  todos = data ? JSON.parse(data) : [];
}

function renderTodos() {
  todoList.innerHTML = "";
  let filtered = todos;
  if (filter === "active") filtered = todos.filter((t) => !t.completed);
  if (filter === "completed") filtered = todos.filter((t) => t.completed);
  filtered.forEach((todo, idx) => {
    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "";
    li.innerHTML = `
			<span class="check" tabindex="0" aria-label="Mark as done">${
        todo.completed ? "✔" : ""
      }</span>
			<span class="text">${todo.text}</span>
			<button class="remove" aria-label="Remove">✕</button>
		`;
    // Mark complete
    li.querySelector(".check").onclick = () => {
      todo.completed = !todo.completed;
      saveTodos();
      renderTodos();
    };
    // Remove
    li.querySelector(".remove").onclick = () => {
      todos.splice(todos.indexOf(todo), 1);
      saveTodos();
      renderTodos();
    };
    todoList.appendChild(li);
  });
  todoCount.textContent = `${todos.length} task${
    todos.length !== 1 ? "s" : ""
  }`;
}

todoForm.onsubmit = (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;
  todos.push({ text, completed: false });
  saveTodos();
  renderTodos();
  todoInput.value = "";
  todoInput.focus();
};

filterBtns.forEach((btn) => {
  btn.onclick = () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filter = btn.dataset.filter;
    renderTodos();
  };
});

clearCompleted.onclick = () => {
  todos = todos.filter((t) => !t.completed);
  saveTodos();
  renderTodos();
};

// Initial load
loadTodos();
renderTodos();
filterBtns[0].classList.add("active");
