const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  const html = `<li class="card" data-task-id="${id}" style="min-width: 50vw">
  <div class="card-body">
    <h5 class="card-title">${name}</h5>
    <p class="card-text">
      ${description}
    </p>
    <p class="card-text">${assignedTo} To</p>
    <p class="card-text">${dueDate}</p>
    <div class="card-footer row">
      <div class="col-6">
        <p class="card-text"><b>${status}</b></p>
      </div>
      <div class="col-3">
        <button class="btn btn-outline-success done-button">
          Done
        </button>
      </div>
      <div class="col-3">
        <button class="btn btn-outline-danger delete-button">
          Delete
        </button>
      </div>
    </div>
  </div>
</li>`;
  return html;
};

// Create the TaskManager class
class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, description, assignedTo, dueDate, status) {
    // Create a task object that we will push to the list of tasks

    const task = {
      // Increment the current Id for each new task
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
    };

    this.tasks.push(task);
  }

  getTaskById(taskId) {
    // Create a variable to store the found task
    let foundTask;
    // Loop over the tasks and find the task with the id passed as a parameter
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      // Check if its the right task by comparing the task's id to the id passed as a parameter
      if (task.id === taskId) {
        // Store the task in the foundTask variable
        foundTask = task;
      }
    }
    // Return the found task
    return foundTask;
  }

  render() {
    let tasksHtmlList = [];
    // Loop over our tasks and create the html, storing it in the array
    for (let i = 0; i < this.tasks.length; i++) {
      // Get the current task in the loop
      const task = this.tasks[i];
      // Format the date
      const date = new Date(task.dueDate);
      const formattedDate =
        date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
      // Create the task html
      const taskHtml = createTaskHtml(
        task.id,
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status
      );
      // Push it to the tasksHtmlList array
      tasksHtmlList.push(taskHtml);
    }

    // Create the tasksHtml by joining each item in the tasksHtmlList
    // with a new line in between each item.
    const tasksHtml = tasksHtmlList.join("\n");

    // Set the inner html of the tasksList on the page
    const tasksList = document.querySelector("#task-list");
    tasksList.innerHTML = tasksHtml;
  }
}
