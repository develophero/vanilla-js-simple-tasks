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

// Not necessarily how we'd do this in a real app, especially as we start
// adding more pages and more functionality.
// But not a bad example of separation of concerns and MVC.
var TasksModel = function(controller) {
    this.controller = controller;
    this.tasks = tasks;

    this.getTasks = function() {
        return this.tasks;
    }

    this.getTask = function(id) {
        for (var i=0; i < tasks.length; i++) {
            if (tasks[i].id === id) {
                return tasks[i];
            }
        }
    }

    this.checkboxClicked = function(id, checked) {
        var task = this.getTask(id);
        task.done = checked;
        console.log(tasks);
    }
}

var TasksView = function(controller) {
    var view = this;

    this.controller = controller;
    this.placeTask = function(task) {
        var taskModel = task;

        var $undoneTaskList = $('#task-list');
        var $doneTaskList = $('#done-task-list');

        var $newTask = $('<li><input type="checkbox"><span></span></li>');
        $newTask.attr('id', taskModel.id);
        $newTask.find('span').text(taskModel.content);
        $undoneTaskList.append($newTask);

        var $checkbox = $newTask.find('[type="checkbox"]');
        $checkbox.on('click', function() {
            // Update the model - but the view shouldnt know anything about it
            var todoId = +this.parentElement.id;
            var checked = this.checked;
            view.controller.checkboxClickedAction(todoId, checked);

            if (checked) {
                var doneTaskList = document.getElementById('done-task-list');
                doneTaskList.appendChild(this.parentElement);
            } else {
                var undoneTaskList = document.getElementById('task-list');
                undoneTaskList.appendChild(this.parentElement);
            }

        });
    }
    this.placeTasks = function(tasks) {
        for (var i=0; i < tasks.length; i++) {
            this.placeTask(tasks[i]);
        }
    }
}

window.onload = function() {

    var tasksModel = new TasksModel(this);
    var tasksView = new TasksView(this);

    tasksView.placeTasks(tasksModel.getTasks());

    // Actions from view
    this.checkboxClickedAction = function(id, checked) {
        tasksModel.checkboxClicked(id, checked);
    };

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
