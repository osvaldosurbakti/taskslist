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
  tasksList.innerHTML = ''; // Clear existing tasks

  if (tasks.length === 0) {
    tasksList.innerHTML = '<p>No tasks available.</p>';
    return;
  }

  tasks.forEach((task) => {
    tasksList.innerHTML += `
      <div>
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        ${task.imageUrl ? `<img src="${task.imageUrl}" alt="${task.title}" style="max-width: 200px; max-height: 200px;">` : ''}
        <!-- Replace Edit/Delete with Detail button -->
        <button onclick="showTaskDetails('${task.id}')">Detail</button>
      </div>
    `;
  });
}

// Show task details
function showTaskDetails(taskId) {
  // You can implement a logic to show detailed task information in a modal or a new page.
  alert(`Showing details for task with ID: ${taskId}`);
  // Here you could make another API call to fetch the task details and display it.
}
