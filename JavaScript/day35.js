// Advanced To-Do List App
let todos = [];
let filter = 'all';
const UI = {};

document.addEventListener('DOMContentLoaded', () => {
  UI.input = document.getElementById('todo-input');
  UI.addBtn = document.getElementById('add-btn');
  UI.list = document.getElementById('todo-list');
  UI.filters = document.querySelectorAll('.filter-btn');
  UI.clearCompleted = document.getElementById('clear-completed');
  UI.clearAll = document.getElementById('clear-all');
  UI.status = document.getElementById('todo-status');

  loadTodos();
  render();

  UI.addBtn.addEventListener('click', addTodo);
  UI.input.addEventListener('keydown', e => { if (e.key === 'Enter') addTodo(); });
  UI.list.addEventListener('click', handleListClick);
  UI.list.addEventListener('keydown', handleListKeydown);
  UI.filters.forEach(btn => btn.addEventListener('click', setFilter));
  UI.clearCompleted.addEventListener('click', clearCompleted);
  UI.clearAll.addEventListener('click', clearAll);
});

function addTodo() {
  const text = UI.input.value.trim();
  if (!text) return;
  todos.unshift({ text, completed: false, id: Date.now() });
  UI.input.value = '';
  saveTodos();
  render();
}

function handleListClick(e) {
  const li = e.target.closest('li');
  if (!li) return;
  const id = Number(li.dataset.id);
  if (e.target.classList.contains('check')) {
    toggleComplete(id);
  } else if (e.target.classList.contains('delete-btn')) {
    deleteTodo(id);
  } else if (e.target.classList.contains('edit-btn')) {
    startEdit(li, id);
  }
}

function handleListKeydown(e) {
  if (e.key === 'Enter' && e.target.classList.contains('edit-input')) {
    finishEdit(e.target);
  } else if (e.key === 'Escape' && e.target.classList.contains('edit-input')) {
    cancelEdit(e.target);
  }
}

function toggleComplete(id) {
  const t = todos.find(t => t.id === id);
  if (t) t.completed = !t.completed;
  saveTodos();
  render();
}

function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id);
  saveTodos();
  render();
}

function startEdit(li, id) {
  const t = todos.find(t => t.id === id);
  if (!t) return;
  li.innerHTML = `<input class="edit-input" type="text" value="${t.text}" maxlength="80" />`;
  const input = li.querySelector('.edit-input');
  input.focus();
  input.setSelectionRange(input.value.length, input.value.length);
}

function finishEdit(input) {
  const li = input.closest('li');
  const id = Number(li.dataset.id);
  const t = todos.find(t => t.id === id);
  if (t && input.value.trim()) {
    t.text = input.value.trim();
    saveTodos();
    render();
  } else {
    render();
  }
}

function cancelEdit(input) {
  render();
}

function setFilter(e) {
  UI.filters.forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');
  filter = e.target.dataset.filter;
  render();
}

function clearCompleted() {
  todos = todos.filter(t => !t.completed);
  saveTodos();
  render();
}

function clearAll() {
  todos = [];
  saveTodos();
  render();
}

function render() {
  let filtered = todos;
  if (filter === 'active') filtered = todos.filter(t => !t.completed);
  if (filter === 'completed') filtered = todos.filter(t => t.completed);
  UI.list.innerHTML = filtered.map(t => `
    <li data-id="${t.id}" class="${t.completed ? 'completed' : ''}">
      <span class="check" tabindex="0" aria-label="Mark as complete">${t.completed ? '✔' : ''}</span>
      <span class="todo-text">${t.text}</span>
      <button class="edit-btn" title="Edit" aria-label="Edit">✏️</button>
      <button class="delete-btn" title="Delete" aria-label="Delete">🗑️</button>
    </li>
  `).join('');
  UI.status.textContent = todos.length === 0 ? 'No tasks yet.' : `${todos.filter(t => !t.completed).length} active, ${todos.filter(t => t.completed).length} completed.`;
}

function saveTodos() {
  localStorage.setItem('day35_todos', JSON.stringify(todos));
}

function loadTodos() {
  try {
    const raw = localStorage.getItem('day35_todos');
    todos = raw ? JSON.parse(raw) : [];
  } catch { todos = []; }
}
