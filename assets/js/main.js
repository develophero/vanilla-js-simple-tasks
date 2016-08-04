// reminder: iife
// reminder: class Task

// content - string, id - number, 
// done - boolean
var tasks = [
  {
    id: 1,
    content: 'first task',
    done: false
  },
  {
    id: 2,
    content: 'second task',
    done: false
  }
];

// console.log(tasks);



// -------------------------------------------------------------------------------------------------- NEW

// Let's first do a thing where we add to the dom with jquery
// Two is enough to make View a good idea:
// Then make a View object and render it pieces at a time

function getTask(id) {
    for (var i=0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            return tasks[i];
        }
    }
}

window.onload = function() {

    // Check and uncheck todos
    // Then we'll get update the view and do jQuery

    for (var i=0; i < tasks.length; i++) {
        var taskModel = tasks[i];
        var taskList = document.getElementById('task-list');
        var newTaskElement = document.createElement('li');
        var newTaskCheckbox = document.createElement('input');
        newTaskCheckbox.type = 'checkbox';
        newTaskElement.id = taskModel.id;
        var newTaskTextNode = document.createTextNode(taskModel.content);
        newTaskElement.appendChild(newTaskCheckbox);
        newTaskElement.appendChild(newTaskTextNode);
        taskList.appendChild(newTaskElement);

        newTaskCheckbox.addEventListener('click', function() {
            var checked = this.checked;
            var todoId = +this.parentElement.id;
            // Here - how to get the task model?
            var task = getTask(todoId);
            console.log(task);
            task.done = checked;

            // After this bad code, this is where we introduce MVC
            var undoneTaskList = document.getElementById('done-task-list');
            undoneTaskList.appendChild(this.parentElement);

            // How do you add the newTaskCheckbox event listener here?
        });
    }



}






// -------------------------------------------------------------------------------------------------- FORM VALIDATION

// // Beginning of Form Validation
//
// // Show div on HTML file using vanilla JavaScript
// // jQuery Example is used later
// var myButton = document.getElementById('new-task-button');
// myButton.addEventListener('click', newTaskButtonClicked);
//
// function newTaskButtonClicked() {
//   var editDiv = document.getElementById('edit-task-wrapper');
//   editDiv.style.display = 'block';
//   this.disabled = true;
// }
//
// // jQuery Manual Form Validation
// $(document).ready( function() {
//
//   // Task Content cannot be blank
//   $('#task-content').on('input', function() {
//     var input = $(this);
//     var taskContent = input.val();
//     if (taskContent) {
//       console.log("task content is: " + taskContent);
//       input.removeClass("invalid").addClass("valid");
//     } else {
//       console.log("task content cannot be blank")
//       input.removeClass("valid").addClass("invalid");
//     }
//   });
//
//   // Save Button Click Event using jQuery
//   $('#task-edit-save').click(function() {
//     var taskContent = $.trim($('#task-content').val());
//     var taskAssigned = $.trim($('#task-assigned-select').val());
//     var editTask = true;
//     var alertMessage = [];
//
//     if (!taskContent) {
//       alertMessage.push('Task Content is blank');
//       editTask = false;
//     }
//     if (!taskAssigned) {
//       alertMessage.push('User is unassigned');
//       editTask = false;
//     }
//
//     if (editTask) {
//       $('#task-list').append($("<li></li>").html(taskContent));
//     } else {
//       alert(alertMessage);
//     }
//
//     clearInputs();
//   });
//
//   // Cancel Button Click Event using jQuery
//   $('#task-edit-cancel').click(function() {
//     $('#edit-task-wrapper').hide();
//     $('#new-task-button').prop("disabled", false);
//
//     clearInputs();
//   });
//
//   function clearInputs() {
//     $('#task-content').val('').removeClass("invalid").removeClass("valid");
//     $('#task-assigned-select').val('');
//   }
//
// });
//
//
//
//
// // Add new input fields in JavaScript
// // Not a lot of fun! This is simply for practice
// // myButton.addEventListener('click', buildFormUsingJavaScript);
// function buildFormUsingJavaScript() {
//   var myDiv = document.getElementById('bottom-wrapper');
//
//   // Build the new form
//   // Form has a text input and a dropdown selector
//   var innerDiv = document.createElement('div');
//
//   var newInput = document.createElement('input');
//   newInput.type = "text";
//   newInput.placeholder = "Content";
//   newInput.className = "task-form";
//   innerDiv.appendChild(newInput);
//
//   // Build the "Assigned to: " text
//   var assignedToSpan = document.createElement('span');
//   assignedToSpan.innerHTML = 'Assigned to: ';
//   innerDiv.appendChild(assignedToSpan)
//
//   // Build the Dropdown selector
//   var newSelector = document.createElement('select');
//   var optionDefault = document.createElement('option');
//   var optionAlice = document.createElement('option');
//   var optionBob = document.createElement('option');
//   optionDefault.value = "";
//   optionDefault.selected = true;
//   optionDefault.style = "display: none";
//   optionAlice.value = 0;
//   optionAlice.innerHTML = 'Alice';
//   optionBob.value = 1;
//   optionBob.innerHTML = 'Bob';
//   newSelector.appendChild(optionDefault);
//   newSelector.appendChild(optionAlice);
//   newSelector.appendChild(optionBob);
//   innerDiv.appendChild(newSelector);
//
//
//   // Add new form to the DOM
//   myDiv.appendChild(innerDiv);
//
//   // disable click event after it's been clicked
//   // check styles.css for disabled background color
//   this.disabled = true;
// }
