// Variables

const TaskInput = document.querySelector("#task-input");
const AddTaskBtn = document.querySelector(".add-task-btn");
const TaskList = document.querySelector(".task-list");

// Create element on button clicked or when pressing on enter
AddTaskBtn.addEventListener("click", createElement); //using createElement() is invalid, it doesn’t pass the function, it calls the function immediately, which returns undefined to the addEventListener. "would have been valid if the function returns another function"
TaskInput.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) createElement();
});

// cancel all tasks edits if exist when pressing Esc
document.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "Escape") {
    let cancelTaskEdit = document.querySelectorAll(".cancel-edit-task-btn");
    if (cancelTaskEdit) {
      cancelTaskEdit.forEach((element) => {
        element.click();
      });
    }
  }
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

    editBtn.addEventListener("click", function (e) {
      let target = e.target;
      let targetedEditBtn = target.parentElement;
      let taskBtns = targetedEditBtn.parentElement;
      let task = taskBtns.parentElement.firstChild;
      let finishBtn = taskBtns.firstChild;
      let deleteBtn = taskBtns.children.item(2);

      // show update task UI if targetedEditBtn class was edit-task-btn
      if (targetedEditBtn.className == "edit-task-btn") {
        targetedEditBtn.classList.remove("edit-task-btn");
        targetedEditBtn.classList.add("update-task-btn");

        // hide finish and delete buttons
        finishBtn.style.display = "none";
        deleteBtn.style.display = "none";

        // create cancel button
        let cancelEditBtn = document.createElement("button");
        cancelEditBtn.classList.add("cancel-edit-task-btn");
        cancelEditBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        taskButtons.appendChild(cancelEditBtn);

        // update task title to view the input field
        let oldTaskValue = task.innerText;
        task.innerHTML = `<input type="text" placeholder="Enter Task" class="edit-input" value="${oldTaskValue}" />`;

        // revert to the old task UI if cancel edit button was clicked
        cancelEditBtn.addEventListener("click", function () {
          task.innerText = oldTaskValue;
          cancelEditBtn.remove();

          finishBtn.style.display = "block";
          deleteBtn.style.display = "block";

          targetedEditBtn.classList.add("edit-task-btn");
          targetedEditBtn.classList.remove("update-task-btn");
        });
      } else {
        // show updated task UI if targetedEditBtn class was update-task-btn"
        task.innerText = task.firstChild.value;
        task.style.textDecoration = "none";

        finishBtn.style.display = "block";
        deleteBtn.style.display = "block";
        taskButtons.children.item(3).remove(); // remove cancelEditBtn

        targetedEditBtn.classList.add("edit-task-btn");
        targetedEditBtn.classList.remove("update-task-btn");

        // update finish button as unchecked incase it was checked before editing
        finishBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
        finishBtn.classList.remove("finished");
        istaskChecked = false;
      }
    });

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
