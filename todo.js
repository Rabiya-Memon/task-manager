let editingTask = null;

function openModal(taskDiv = null) {
  document.getElementById('taskModal').style.display = 'flex';

  if (taskDiv) {
    editingTask = taskDiv;
    document.getElementById('modalTitle').innerText = "Edit Task";
    document.getElementById('taskTitle').value = taskDiv.querySelector('h3').innerText;
    document.getElementById('taskDesc').value = taskDiv.querySelector('p').innerText;
    document.getElementById('taskAssigned').value = taskDiv.querySelector('small').innerText.replace('Assigned to: ', '');
  } else {
    editingTask = null;
    document.getElementById('modalTitle').innerText = "Create Task";
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDesc').value = '';
    document.getElementById('taskAssigned').value = '';
  }
}

function closeModal() {
  document.getElementById('taskModal').style.display = 'none';
}

function saveTask() {
  const title = document.getElementById('taskTitle').value.trim();
  const desc = document.getElementById('taskDesc').value.trim();
  const assigned = document.getElementById('taskAssigned').value.trim();

  if (!title || !desc || !assigned) {
    alert("Please fill all fields!");
    return;
  }

  if (editingTask) {
    editingTask.querySelector('h3').innerText = title;
    editingTask.querySelector('p').innerText = desc;
    editingTask.querySelector('small').innerText = `Assigned to: ${assigned}`;
  } else {
    const taskHTML = `
      <div class="task">
        <h3>${title}</h3>
        <p>${desc}</p>
        <small>Assigned to: ${assigned}</small>
        <div class="buttons">
          <button class="move-progress">Move to In Progress</button>
          <button class="move-done">Move to Done</button>
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </div>
      </div>
    `;
    document.getElementById('todo').insertAdjacentHTML('beforeend', taskHTML);
  }

  closeModal();
  attachEventListeners(); // Reattach event listeners
}

function attachEventListeners() {
  document.querySelectorAll('.edit').forEach(button => {
    button.onclick = function() {
      const taskDiv = this.closest('.task');
      openModal(taskDiv);
    };
  });

  document.querySelectorAll('.delete').forEach(button => {
    button.onclick = function() {
      if (confirm("Are you sure you want to delete this task?")) {
        this.closest('.task').remove();
      }
    };
  });

  document.querySelectorAll('.move-progress').forEach(button => {
    button.onclick = function() {
      const taskDiv = this.closest('.task');
      document.getElementById('inprogress').appendChild(taskDiv);
    };
  });

  document.querySelectorAll('.move-done').forEach(button => {
    button.onclick = function() {
      const taskDiv = this.closest('.task');
      document.getElementById('done').appendChild(taskDiv);
    };
  });
}

// Add event listener to create-task button
document.querySelector('.create-task').addEventListener('click', () => openModal());

// Add event listener to save button (this is where the error occurred)
document.querySelector('.save-btn').addEventListener('click', saveTask);
