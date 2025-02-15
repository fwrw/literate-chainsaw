document.addEventListener('DOMContentLoaded', async () => {
  const taskGrid = document.getElementById('task-grid');
  const greeting = document.getElementById('greeting');
  const taskForm = document.getElementById('task-form');
  const editTaskForm = document.getElementById('edit-task-form');
  const tagInputs = document.getElementById('tag-inputs');
  const editTagInputs = document.getElementById('edit-tag-inputs');
  let userId;

  // Add new tag inputs
  let tagCount = 1;
  document.getElementById('add-tag-btn').addEventListener('click', function() {
    if (tagCount < 3) {
      tagCount++;
      const newTagInput = document.createElement('div');
      newTagInput.classList.add('form-group');
      newTagInput.innerHTML = `
        <label for="tag-${tagCount}">Tag ${tagCount} Name</label>
        <input type="text" class="form-control" id="tag-${tagCount}">
        <label for="tag-color-${tagCount}">Tag ${tagCount} Color</label>
        <input type="color" class="form-control" style="width: 50px;" id="tag-color-${tagCount}" value="#000000">
      `;
      tagInputs.appendChild(newTagInput);
    }
  });

  // Add new tag inputs in edit modal
  let editTagCount = 0;
  document.getElementById('edit-add-tag-btn').addEventListener('click', function() {
    if (editTagCount < 3) {
      editTagCount++;
      const newTagInput = document.createElement('div');
      newTagInput.classList.add('form-group');
      newTagInput.innerHTML = `
        <label for="edit-tag-${editTagCount}">Tag ${editTagCount} Name</label>
        <input type="text" class="form-control" id="edit-tag-${editTagCount}">
        <button type="button" class="btn btn-danger btn-sm mt-2 remove-tag-btn">X</button>
      `;
      editTagInputs.appendChild(newTagInput);

      // Add event listener to remove tag button
      newTagInput.querySelector('.remove-tag-btn').addEventListener('click', function() {
        newTagInput.remove();
        editTagCount--;
      });
    }
  });

  // Fetch user info and tasks from the API
  const fetchUserTasks = async () => {
    const response = await fetch('/user-info');
    const userInfo = await response.json();
    userId = userInfo.id;

    // Set the greeting
    greeting.textContent = `Hello, ${userInfo.username}`;

    // Fetch tasks
    const tasksResponse = await fetch(`/users/${userInfo.id}/tasks`);
    const tasks = await tasksResponse.json();

    // Display tasks
    taskGrid.innerHTML = tasks.map(task => `
      <div class="col-md-4 mb-3">
        <div class="card ${task.status === 'Finished' ? 'bg-primary' : 'bg-dark'} text-white">
          <div class="card-body">
            <h5 class="card-title">${task.title}</h5>
            <p class="card-text">${task.description}</p>
            <p class="card-text">Status: ${task.status}</p>
            <p class="card-text">Priority: ${task.priority}</p>
            <p class="card-text">
              <small class="text-muted">Tags: 
                ${task.Tags.map(tag => `<span id="tag-info-id-${tag.id}" style="
                  border: 2px solid;
                  border-color: ${tag.color};
                  padding: 4px; 
                  margin-right: 5px;
                  border-radius: 21px;
                ">${tag.name}</span>`).join('')}
              </small>
            </p>
            <div class="d-flex justify-content-between mt-3">
              <div>
                <a class="btn btn-secondary edit-task" data-task-id="${task.id}" data-toggle="modal" data-target="#editTaskModal">Edit</a>
                <a class="btn btn-danger delete-task" data-task-id="${task.id}">Delete</a>
              </div>
              <button class="btn btn-primary mark-finished" data-task-id="${task.id}">
                ${task.status === 'finished' ? 'Reopen Task' : 'Mark as Finished'}
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.edit-task').forEach(button => {
      button.addEventListener('click', (e) => {
        const taskId = e.target.getAttribute('data-task-id');
        const task = tasks.find(t => t.id == taskId);
        document.getElementById('edit-title').value = task.title;
        document.getElementById('edit-description').value = task.description;
        document.querySelector(`input[name="edit-status"][value="${task.status}"]`).checked = true;
        document.querySelector(`input[name="edit-priority"][value="${task.priority}"]`).checked = true;
        document.getElementById('edit-task-id').value = task.id;

        // Clear existing tags
        editTagInputs.innerHTML = '';

        // Add existing tags
        task.Tags.forEach((tag, index) => {
          const tagInput = document.createElement('div');
          tagInput.classList.add('form-group');
          tagInput.innerHTML = `
            <label for="edit-tag-${index + 1}">Tag ${index + 1} Name</label>
            <input type="text" class="form-control" id="edit-tag-${index + 1}" value="${tag.name}">

            <button type="button" class="btn btn-danger btn-sm mt-2 remove-tag-btn">X</button>
          `;
          editTagInputs.appendChild(tagInput);

          // Add event listener to remove tag button
          tagInput.querySelector('.remove-tag-btn').addEventListener('click', function() {
            tagInput.remove();
            editTagCount--;
          });
        });

        // Set editTagCount to the number of existing tags
        editTagCount = task.Tags.length;

        $('#editTaskModal').modal('show');
      });
    });

    document.querySelectorAll('.delete-task').forEach(button => {
      button.addEventListener('click', async (e) => {
        const taskId = e.target.getAttribute('data-task-id');
        const response = await fetch(`/tasks/${taskId}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          fetchUserTasks();
        } else {
          alert('Failed to delete task');
        }
      });
    });

    // Add event listeners for mark as finished/reopen buttons
    document.querySelectorAll('.mark-finished').forEach(button => {
      button.addEventListener('click', async (e) => {
        const taskId = e.target.getAttribute('data-task-id');
        const task = tasks.find(t => t.id == taskId);
        const newStatus = task.status === 'finished' ? 'in progress' : 'finished';

        const response = await fetch(`/tasks/${taskId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status: newStatus })
        });

        if (response.ok) {
          fetchUserTasks();
        } else {
          alert('Failed to update task status');
        }
      });
    });
  };

  // Add a new task
  taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const status = document.querySelector('input[name="status"]:checked').value;
    const priority = document.querySelector('input[name="priority"]:checked').value;
    const description = document.getElementById('description').value;
    const tags = [];

    for (let i = 1; i <= tagCount; i++) {
      const tagName = document.getElementById(`tag-${i}`).value;
      const tagColor = document.getElementById(`tag-color-${i}`).value;
      if (tagName) {
        tags.push({ name: tagName, color: tagColor });
      }
    }

    const taskData = { title, description, status, priority, userId, tags };

    const response = await fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    });

    if (response.ok) {
      $('#taskModal').modal('hide');
      taskForm.reset();
      tagInputs.innerHTML = `
        <div class="form-group">
          <label for="tag-1">Tag 1 Name</label>
          <input type="text" class="form-control" id="tag-1">
          <label for="tag-color-1">Tag 1 Color</label>
          <input type="color" class="form-control" id="tag-color-1" value="#000000">
        </div>
      `;
      tagCount = 1;
      fetchUserTasks();
    } else {
      alert('Failed to add task');
    }
  });

  // Update an existing task
  editTaskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const taskId = document.getElementById('edit-task-id').value;
    const title = document.getElementById('edit-title').value;
    const status = document.querySelector('input[name="edit-status"]:checked').value;
    const priority = document.querySelector('input[name="edit-priority"]:checked').value;
    const description = document.getElementById('edit-description').value;
    const tags = [];

    for (let i = 1; i <= editTagCount; i++) {
      const tagName = document.getElementById(`edit-tag-${i}`).value;
      const tagColor = document.querySelector(`#edit-tag-${i}`)

      if (tagName) {
        tags.push({ name: tagName, color: tagColor });
      }
    }

    const taskData = { title, description, status, priority, userId, tags };

    const response = await fetch(`/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(taskData)
    });

    if (response.ok) {
      $('#editTaskModal').modal('hide');
      editTaskForm.reset();
      fetchUserTasks();
    } else {
      alert('Failed to update task');
    }
  });

  function filterTasksByTag(tagName) {
    const tasks = document.querySelectorAll('.col-md-4'); 
    tasks.forEach(task => {
      const tagsInTask = task.querySelectorAll('.card-text small span');
      let hasMatchingTag = false;
  
      tagsInTask.forEach(tag => {
        if (tag.textContent.toLowerCase().includes(tagName.toLowerCase())) {
          hasMatchingTag = true;
        }
      });
  
      if (hasMatchingTag) {
        task.style.display = 'block';
      } else {
        task.style.display = 'none';
      }
    });
  }
  
  document.getElementById('search-tag').addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    filterTasksByTag(searchTerm);
  });

  

  

  fetchUserTasks();
});

