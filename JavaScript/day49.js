// Day 49 | Task Manager

(() => {
  const tasksKey = 'day49.tasks.v1'
  /** @type {Array<{id:string,title:string,completed:boolean,priority:'low'|'normal'|'high',createdAt:number,due?:string}>} */
  let tasks = []

  // Elements
  const titleInput = document.getElementById('taskTitle')
  const dueInput = document.getElementById('taskDue')
  const prioritySelect = document.getElementById('taskPriority')
  const addBtn = document.getElementById('addTaskBtn')

  const taskList = document.getElementById('taskList')
  const statsEl = document.getElementById('taskStats')

  const filterChips = Array.from(document.querySelectorAll('.chip[data-filter]'))
  const searchInput = document.getElementById('searchInput')
  const sortSelect = document.getElementById('sortSelect')
  const clearCompletedBtn = document.getElementById('clearCompletedBtn')

  let currentFilter = 'all'
  let searchQuery = ''
  let sortBy = 'created-desc'

  // Utils
  const uid = () => Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4)

  const load = () => {
    try {
      const raw = localStorage.getItem(tasksKey)
      tasks = raw ? JSON.parse(raw) : []
    } catch { tasks = [] }
  }
  const save = () => {
    localStorage.setItem(tasksKey, JSON.stringify(tasks))
  }

  // Render
  const priorityOrder = { high: 2, normal: 1, low: 0 }
  const applySort = (arr) => {
    const out = [...arr]
    switch (sortBy) {
      case 'created-asc':
        out.sort((a,b) => a.createdAt - b.createdAt); break
      case 'created-desc':
        out.sort((a,b) => b.createdAt - a.createdAt); break
      case 'due-asc':
        out.sort((a,b) => (a.due || '9999-12-31').localeCompare(b.due || '9999-12-31')); break
      case 'due-desc':
        out.sort((a,b) => (b.due || '0000-01-01').localeCompare(a.due || '0000-01-01')); break
      case 'priority-asc':
        out.sort((a,b) => priorityOrder[a.priority] - priorityOrder[b.priority]); break
      case 'priority-desc':
        out.sort((a,b) => priorityOrder[b.priority] - priorityOrder[a.priority]); break
    }
    return out
  }

  const applyFilter = (arr) => {
    let filtered = arr
    if (currentFilter === 'active') filtered = filtered.filter(t => !t.completed)
    if (currentFilter === 'completed') filtered = filtered.filter(t => t.completed)
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(t => t.title.toLowerCase().includes(q))
    }
    return filtered
  }

  const updateStats = () => {
    const done = tasks.filter(t => t.completed).length
    statsEl.textContent = `${done} of ${tasks.length} completed`
  }

  const formatDueBadge = (due) => {
    if (!due) return ''
    const today = new Date().toISOString().slice(0,10)
    let label = `Due ${due}`
    if (due < today) label = `Overdue ${due}`
    if (due === today) label = 'Due today'
    return `<span class="badge due-badge">${label}</span>`
  }

  const render = () => {
    const items = applySort(applyFilter(tasks))
    taskList.innerHTML = items.map(t => {
      const prClass = t.priority === 'high' ? 'priority-high'
                    : t.priority === 'low' ? 'priority-low'
                    : 'priority-normal'
      return `
        <li class="task-item ${t.completed ? 'is-completed':''}" data-id="${t.id}">
          <input class="task-toggle" type="checkbox" ${t.completed ? 'checked':''} aria-label="Toggle completed">
          <div class="task-info">
            <h4 class="task-title">${escapeHtml(t.title)}</h4>
            <div class="task-meta">
              <span class="badge ${prClass}">Priority: ${t.priority}</span>
              ${formatDueBadge(t.due)}
            </div>
          </div>
          <div class="task-actions">
            <button class="icon-btn edit-btn" title="Edit">Edit</button>
            <button class="icon-btn icon-btn--danger delete-btn" title="Delete">Delete</button>
          </div>
        </li>`
    }).join('')
    updateStats()
  }

  function escapeHtml(str) {
    return (str || '').replace(/[&<>"']/g, s => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[s]))
  }

  // Actions
  const addTask = () => {
    const title = (titleInput.value || '').trim()
    if (!title) { titleInput.focus(); return }
    const t = {
      id: uid(),
      title,
      completed: false,
      priority: /** @type any */(prioritySelect.value || 'normal'),
      createdAt: Date.now(),
      due: dueInput.value || undefined,
    }
    tasks.unshift(t)
    save()
    titleInput.value = ''
    dueInput.value = ''
    prioritySelect.value = 'normal'
    render()
  }

  const toggleCompleted = (id, value) => {
    const task = tasks.find(t => t.id === id)
    if (!task) return
    task.completed = value
    save(); render()
  }

  const removeTask = (id) => {
    tasks = tasks.filter(t => t.id !== id)
    save(); render()
  }

  const startEdit = (li, id) => {
    const task = tasks.find(t => t.id === id)
    if (!task) return
    const titleEl = li.querySelector('.task-title')
    const actions = li.querySelector('.task-actions')
    if (!titleEl || !actions) return
    li.classList.add('is-editing')
    const input = document.createElement('input')
    input.type = 'text'
    input.className = 'input'
    input.value = task.title
    input.style.width = '100%'
    titleEl.replaceWith(input)
    input.focus()
    input.selectionStart = input.value.length

    const submitEdit = () => {
      const newTitle = (input.value || '').trim()
      if (newTitle) {
        task.title = newTitle
        save()
      }
      li.classList.remove('is-editing')
      render()
    }
    const cancelEdit = () => { li.classList.remove('is-editing'); render() }

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submitEdit()
      if (e.key === 'Escape') cancelEdit()
    })
    input.addEventListener('blur', submitEdit)
  }

  const clearCompleted = () => {
    tasks = tasks.filter(t => !t.completed)
    save(); render()
  }

  // Events
  addBtn?.addEventListener('click', addTask)
  titleInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addTask()
  })

  taskList?.addEventListener('change', (e) => {
    const target = e.target
    if (target && target.classList.contains('task-toggle')) {
      const li = target.closest('.task-item')
      if (!li) return
      toggleCompleted(li.getAttribute('data-id'), target.checked)
    }
  })

  taskList?.addEventListener('dblclick', (e) => {
    const li = e.target && e.target.closest && e.target.closest('.task-item')
    if (!li) return
    startEdit(li, li.getAttribute('data-id'))
  })

  taskList?.addEventListener('click', (e) => {
    const btn = e.target
    if (!(btn && btn.classList)) return
    const li = btn.closest && btn.closest('.task-item')
    if (!li) return
    const id = li.getAttribute('data-id')
    if (btn.classList.contains('delete-btn')) removeTask(id)
    if (btn.classList.contains('edit-btn')) startEdit(li, id)
  })

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('is-active'))
      chip.classList.add('is-active')
      currentFilter = chip.getAttribute('data-filter') || 'all'
      render()
    })
  })

  searchInput?.addEventListener('input', () => {
    searchQuery = searchInput.value || ''
    render()
  })

  sortSelect?.addEventListener('change', () => {
    sortBy = sortSelect.value || 'created-desc'
    render()
  })

  clearCompletedBtn?.addEventListener('click', clearCompleted)

  // Boot
  load()
  render()
})()


