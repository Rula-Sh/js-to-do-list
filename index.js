// Variables

const TaskInput = document.querySelector("#task-input");
const AddTaskBtn = document.querySelector(".add-task-btn");
const TaskList = document.querySelector(".task-list");

// Create element on button clicked or when pressing on enter
AddTaskBtn.addEventListener("click", createElement); //using createElement() is invalid, it doesn’t pass the function, it calls the function immediately, which returns undefined to the addEventListener. "would have been valid if the function returns another function"
TaskInput.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) createElement();
});

function createElement() {
  if (TaskInput.value === "") {
    showPopup();
  } else {
    TaskList.style.backgroundColor = "#fff";

    // Create a task item and its descendants
    let task = document.createElement("div");
    task.classList.add("task-item");

    let taskTitle = document.createElement("li");
    taskTitle.classList.add("task-title");
    taskTitle.innerText = TaskInput.value;
    task.appendChild(taskTitle);

    let taskButtons = document.createElement("div");
    taskButtons.classList.add("task-btns");

    // Create Task Control Buttons
    let finishBtn = document.createElement("button");
    finishBtn.classList.add("finish-task-btn");
    finishBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
    taskButtons.appendChild(finishBtn);

    let editBtn = document.createElement("button");
    editBtn.classList.add("edit-task-btn");
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    taskButtons.appendChild(editBtn);

    let deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-task-btn");
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    taskButtons.appendChild(deleteBtn);

    task.appendChild(taskButtons);

    TaskList.appendChild(task);
    TaskInput.value = "";

    let istaskChecked = false;

    finishBtn.addEventListener("click", function (e) {
      let target = e.target;
      let targetedFinishBtn = target.parentElement;
      if (!istaskChecked) {
        targetedFinishBtn.parentElement.parentElement.firstChild.style.textDecoration =
          "line-through";
        targetedFinishBtn.innerHTML = `<i class="fa-solid fa-rotate-left"></i>`;
        targetedFinishBtn.classList.add("finished");
        istaskChecked = true;
      } else {
        targetedFinishBtn.parentElement.parentElement.firstChild.style.textDecoration =
          "none";
        targetedFinishBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
        targetedFinishBtn.classList.remove("finished");
        istaskChecked = false;
      }
    });

    editBtn.addEventListener("click", function () {});

    deleteBtn.addEventListener("click", function (e) {
      let target = e.target;
      target.parentElement.parentElement.parentElement.remove();

      // Remove TaskList background if i deleted the last child
      if (!TaskList.firstChild) {
        TaskList.style.backgroundColor = "transparent";
      }
    });
  }
}

function showPopup() {
  document.querySelector(".no-input-pop-up").style.display = "block";
  document.querySelector(".no-input-pop-up").style.animationName = "slide-left";

  setTimeout(() => {
    document.querySelector(".no-input-pop-up").style.animationName =
      "slide-right";
    setTimeout(() => {
      document.querySelector(".no-input-pop-up").style.display = "none";
    }, 700);
  }, 4000);
}
