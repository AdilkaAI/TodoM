document.addEventListener('DOMContentLoaded', () => {
  
  const taskForm = document.getElementById('taskForm');
  if (taskForm) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks(filter = 'all') {
      const list = document.getElementById('tasksList');
      list.innerHTML = '';

      const filtered = tasks.filter(task => {
        if (filter === 'active') return !task.done;
        if (filter === 'completed') return task.done;
        return true;
      });

      filtered.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.priority} ${task.done ? 'done' : ''}`;
        li.innerHTML = `
          <div class="priority-dot"></div>
          <span class="task-text">${task.text}</span>
          <label class="task-checkbox">
            <input type="checkbox" ${task.done ? 'checked' : ''}>
          </label>
          <button class="delete-btn">×</button>
        `;

    
        li.querySelector('input[type="checkbox"]').addEventListener('change', () => {
          task.done = !task.done;
          saveTasks();
          renderTasks(filter);
        });

       
        li.querySelector('.delete-btn').addEventListener('click', () => {
          tasks = tasks.filter(t => t.id !== task.id);
          saveTasks();
          renderTasks(filter);
        });

        list.appendChild(li);
      });

      updateHeaderStats();
    }

    function updateHeaderStats() {
      const total = tasks.length;
      const completed = tasks.filter(t => t.done).length;
      document.getElementById('totalCount').textContent = total;
      document.getElementById('completedCount').textContent = completed;
    }

  
    taskForm.addEventListener('submit', e => {
      e.preventDefault();
      const text = document.getElementById('taskInput').value.trim();
      const priority = document.querySelector('input[name="priority"]:checked').value;

      if (!text) return;

      tasks.unshift({
        id: Date.now(),
        text,
        priority,
        done: false
      });

      saveTasks();
      renderTasks(getCurrentFilter());
      taskForm.reset();
    });

 
    function getCurrentFilter() {
      const activeBtn = document.querySelector('.filter-btn.active');
      return activeBtn ? activeBtn.dataset.filter : 'all';
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTasks(btn.dataset.filter);
      });
    });

 
    renderTasks();
  }
    function renderTasks(filter = 'all') {
  const list = document.getElementById('tasksList');
  if (!list) return;

  list.innerHTML = '';

  let filtered = [];
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    if (filter === 'all' ||
        (filter === 'active' && !task.done) ||
        (filter === 'completed' && task.done)) {
      filtered.push(task);
    }
  }

  filtered.forEach(task => {
    
  });

  updateStats();
}
  
  const totalTasksEl = document.getElementById('totalTasks');
  if (totalTasksEl) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const total = tasks.length;
    const completed = tasks.filter(t => t.done).length;
    const pending = total - completed;
    const progress = total ? Math.round((completed / total) * 100) : 0;

    document.getElementById('totalTasks').textContent = total;
    document.getElementById('completedTasks').textContent = completed;
    document.getElementById('pendingTasks').textContent = pending;
    document.getElementById('progressText').textContent = `${progress}%`;

  
    const circle = document.getElementById('progressCircle');
    circle.style.setProperty('--progress', `${progress}%`);

    
    const high = tasks.filter(t => t.priority === 'high').length;
    const mid = tasks.filter(t => t.priority === 'mid').length;
    const low = tasks.filter(t => t.priority === 'low').length;
    const max = Math.max(high, mid, low, 1);

    document.getElementById('highCount').textContent = high;
    document.getElementById('midCount').textContent = mid;
    document.getElementById('lowCount').textContent = low;

    document.getElementById('highBar').style.width = `${(high / max) * 100}%`;
    document.getElementById('midBar').style.width = `${(mid / max) * 100}%`;
    document.getElementById('lowBar').style.width = `${(low / max) * 100}%`;

    
    const recentList = document.getElementById('recentTasks');
    recentList.innerHTML = '';
    tasks.slice(0, 5).forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item ${task.priority} ${task.done ? 'done' : ''}`;
      li.innerHTML = `
        <div class="priority-dot"></div>
        <span>${task.text}</span>
      `;
      recentList.appendChild(li);
    });
  }


  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const agree = document.getElementById('agree').checked;

      const resultEl = document.getElementById('formResult');

      if (!name || !email || !message || !agree) {
        resultEl.textContent = 'Пожалуйста, заполните все поля и дайте согласие';
        resultEl.style.color = '#ef4444';
        return;
      }

      if (!email.includes('@') || !email.includes('.')) {
        resultEl.textContent = 'Введите корректный email';
        resultEl.style.color = '#ef4444';
        return;
      }

    
      resultEl.textContent = '✅ Сообщение отправлено! Спасибо за обратную связь.';
      resultEl.style.color = '#10b981';
      contactForm.reset();

     
      setTimeout(() => resultEl.textContent = '', 4000);
    });
  }
});


const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');

if (menuToggle && navList) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navList.classList.toggle('active');


    menuToggle.setAttribute('aria-label', isExpanded ? 'Открыть меню' : 'Закрыть меню');
  });


  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      navList.classList.remove('active');
    });
  });
}