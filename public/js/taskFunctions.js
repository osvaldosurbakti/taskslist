const API_URL = '/api/tasks';

// Fetch API wrapper
async function apiRequest(url, options) {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Request failed');
    return result;
  } catch (error) {
    console.error('API Error:', error);
    alert(`Error: ${error.message}`);
    throw error;
  }
}

// Fetch tasks on load
document.addEventListener('DOMContentLoaded', fetchTasks);

// Get tasks
async function fetchTasks() {
  const tasks = await apiRequest(API_URL, { method: 'GET' });
  const tasksList = document.getElementById('tasks-list');
  tasksList.innerHTML = '';

  tasks.forEach((task) => {
    tasksList.innerHTML += `
      <div>
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        ${task.imageUrl ? `<img src="${task.imageUrl}" alt="${task.title}" style="max-width: 200px; max-height: 200px;">` : ''}
        <button onclick="deleteTask('${task._id}')">Delete</button>
        <button onclick="openEditForm('${task._id}', '${task.title}', '${task.description}', '${task.imageUrl || ''}')">Edit</button>
      </div>
    `;
  });
}

// Create task
async function createTask() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const image = document.getElementById('image').files[0];

  if (!title || !description) {
    alert('Title and description are required!');
    return;
  }

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  if (image) formData.append('image', image);

  try {
    await apiRequest(API_URL, { method: 'POST', body: formData });
    alert('Task created successfully!');
    fetchTasks();
  } catch (error) {
    console.error('Error creating task:', error);
    alert('Error creating task');
  }
}

// Delete task
async function deleteTask(taskId) {
  try {
    if (!taskId) {
      throw new Error('Task ID is required');
    }
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
    alert('Task deleted successfully!');
    fetchTasks(); // Refresh tasks list after deletion
  } catch (error) {
    console.error('API Error:', error);
    alert('Error deleting task');
  }
}

// Edit task form handler
function openEditForm(taskId, taskTitle, taskDescription, taskImageUrl) {
  // Assuming you have an edit form with ID 'edit-form'
  document.getElementById('edit-form').style.display = 'block'; // Show the form
  document.getElementById('edit-task-id').value = taskId; // Set task ID in hidden field
  document.getElementById('edit-title').value = taskTitle; // Set task title
  document.getElementById('edit-description').value = taskDescription; // Set task description
  document.getElementById('edit-image-preview').src = taskImageUrl || ''; // Set task image (if available)

  // Optionally, focus on the title input
  document.getElementById('edit-title').focus();
}

// Submit edited task
async function submitEdit() {
  const taskId = document.getElementById('edit-task-id').value;
  const title = document.getElementById('edit-title').value;
  const description = document.getElementById('edit-description').value;
  const image = document.getElementById('edit-image').files[0];

  if (!title || !description) {
    alert('Title and description are required!');
    return;
  }

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  if (image) formData.append('image', image); // If you plan to update the image

  try {
    await apiRequest(`/api/tasks/${taskId}`, { method: 'PUT', body: formData });
    alert('Task updated successfully!');
    fetchTasks(); // Refresh tasks list
    cancelEdit(); // Hide the form after submission
  } catch (error) {
    console.error('Error updating task:', error);
    alert('Error updating task');
  }
}

// Cancel edit
function cancelEdit() {
  document.getElementById('edit-form').style.display = 'none'; // Hide the edit form
}
