// Selectors
const submitButton = document.querySelector(".add-task-button");
const taskList = document.querySelector(".task-list");

// Event listeners
submitButton.onclick = addTask;
taskList.onclick = doneDelete;

// Task counter
let taskCounter = 0;

function addTask(event) {
  // Prevents button click from refreshing page
  event.preventDefault();
  if (taskCounter < 6) {
    // Grab text input
    const inputValue = document.querySelector(".task-input");

    // Edge case to deal with empty string and white space inputs
    if (inputValue.value === "" || /^\s+$/.test(inputValue.value)) {
      inputValue.value = "";
      return "Please enter a valid task";
    }

    // DIV for each task entry in list, including tick and cross
    const taskDiv = document.createElement("div");

    // LI for each task
    const newTask = document.createElement("li");
    newTask.textContent = ` ${inputValue.value}`;
    taskDiv.appendChild(newTask);

    // BUTTON for done
    const doneButton = document.createElement("button");
    doneButton.innerHTML = "<i class='fas fa-check'></i>";
    doneButton.classList.add("done-btn");
    taskDiv.appendChild(doneButton);

    // BUTTON for delete
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "<i class='fas fa-trash'></i>";
    deleteButton.classList.add("delete-btn");
    taskDiv.appendChild(deleteButton);

    // Append taskDiv to UL
    taskList.appendChild(taskDiv);

    // Increases Task Counter
    taskCounter += 1;

    // Resets input text value
    inputValue.value = "";
  } else {
    alert("You have too many tasks, please remove a task to continue adding.");
  }
}

function doneDelete(event) {
  const item = event.target;

  // Done button functionality
  if (item.classList[0] === "done-btn") {
    const taskElement = item.parentElement;
    taskElement.classList.toggle("doneItem");
  }

  // Delete button functionality
  if (item.classList[0] === "delete-btn") {
    const taskElement = item.parentElement;
    taskElement.remove();
    taskCounter -= 1;
  }
}
