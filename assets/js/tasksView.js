(function (window) {
    'use strict';

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

        this.setUpNewTaskForm = function() {
            // Show div on HTML file using vanilla JavaScript
            // jQuery Example is used later
            var myButton = document.getElementById('new-task-button');
            myButton.addEventListener('click', newTaskButtonClicked);

            function newTaskButtonClicked() {
                var editDiv = document.getElementById('edit-task-wrapper');
                editDiv.style.display = 'block';
                this.disabled = true;
            }

            // Task Content cannot be blank
            $('#task-content').on('input', function() {
                var input = $(this);
                var taskContent = input.val();
                if (taskContent) {
                    console.log("task content is: " + taskContent);
                    input.removeClass("invalid").addClass("valid");
                } else {
                    console.log("task content cannot be blank")
                    input.removeClass("valid").addClass("invalid");
                }
            });

            // Save Button Click Event using jQuery
            $('#task-edit-save').click(function() {
                var taskContent = $.trim($('#task-content').val());
                var taskAssigned = $.trim($('#task-assigned-select').val());
                var editTask = true;
                var alertMessage = [];

                if (!taskContent) {
                    alertMessage.push('Task Content is blank');
                    editTask = false;
                }
                if (!taskAssigned) {
                    alertMessage.push('User is unassigned');
                    editTask = false;
                }

                if (editTask) {
                    controller.newTaskClicked(taskContent);
                    clearInputs();
                } else {
                    alert(alertMessage);
                }

            });

            // Cancel Button Click Event using jQuery
            $('#task-edit-cancel').click(function() {
                $('#edit-task-wrapper').hide();
                $('#new-task-button').prop("disabled", false);

                clearInputs();
            });

            function clearInputs() {
                $('#task-content').val('').removeClass("invalid").removeClass("valid");
                $('#task-assigned-select').val('');
            }
        }
    }

    // Export to window
    window.TasksView = TasksView;

})(window);