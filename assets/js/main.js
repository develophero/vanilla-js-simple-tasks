
$(document).ready( function() {

    var tasksModel = new window.TasksModel(this);
    var tasksView = new window.TasksView(this);

    tasksView.placeTasks(tasksModel.getTasks());
    tasksView.setUpNewTaskForm();

    // Actions from view
    this.checkboxClickedAction = function(id, checked) {
        tasksModel.checkboxClicked(id, checked);
    };

    this.newTaskClicked = function(taskContent) {
        var newTask = tasksModel.newTask(taskContent);
        tasksView.placeTask(newTask);
    }

});




// ------------------------------------------------------- Practice: Building the form using vanilla javascript
// Add new input fields in JavaScript
// Not a lot of fun! This is simply for practice
// myButton.addEventListener('click', buildFormUsingJavaScript);
function buildFormUsingJavaScript() {
  var myDiv = document.getElementById('bottom-wrapper');

  // Build the new form
  // Form has a text input and a dropdown selector
  var innerDiv = document.createElement('div');

  var newInput = document.createElement('input');
  newInput.type = "text";
  newInput.placeholder = "Content";
  newInput.className = "task-form";
  innerDiv.appendChild(newInput);

  // Build the "Assigned to: " text
  var assignedToSpan = document.createElement('span');
  assignedToSpan.innerHTML = 'Assigned to: ';
  innerDiv.appendChild(assignedToSpan)

  // Build the Dropdown selector
  var newSelector = document.createElement('select');
  var optionDefault = document.createElement('option');
  var optionAlice = document.createElement('option');
  var optionBob = document.createElement('option');
  optionDefault.value = "";
  optionDefault.selected = true;
  optionDefault.style = "display: none";
  optionAlice.value = 0;
  optionAlice.innerHTML = 'Alice';
  optionBob.value = 1;
  optionBob.innerHTML = 'Bob';
  newSelector.appendChild(optionDefault);
  newSelector.appendChild(optionAlice);
  newSelector.appendChild(optionBob);
  innerDiv.appendChild(newSelector);


  // Add new form to the DOM
  myDiv.appendChild(innerDiv);

  // disable click event after it's been clicked
  // check styles.css for disabled background color
  this.disabled = true;
}
