(function (window) {
    'use strict';

    var TasksView = function(controller) {
        var view = this;
        var $undoneTaskList = $('#task-list');
        var $doneTaskList = $('#done-task-list');

        this.controller = controller;

        this.placeTask = function(task) {
            var taskModel = task;

            var $newTask = $('<li><input type="checkbox"><span></span><button class="btn btn-default">Edit</button><button class="btn btn-danger">Delete</button></li>');
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

            var $delete = $newTask.find('.btn-danger');
            $delete.on('click', function() {
                var todoId = +this.parentElement.id;
                view.controller.deleteClickedAction(todoId);
            });

            var $edit = $newTask.find('.btn-default');
            $edit.on('click', function() {
                var taskId = +this.parentElement.id;
                var $originalTask = $(this.parentElement).html();
                var $taskElement = $(this.parentElement);
                var taskContent = $(this.parentElement).find('span').text();
                var $editInput = $('<input type="text">');
                $(this.parentElement).html($editInput);
                $editInput.val(taskContent);
                $editInput.on('keyup', function(event) {
                    //console.log(event.keyCode);
                    if (event.keyCode === 13) {
                        var newContent = $editInput.val();
                        view.controller.editSaved(taskId, newContent);
                        $taskElement.html($originalTask);
                        $taskElement.find('span').text(newContent);
                    }
                });
            });
        }

        this.placeTasks = function(tasks) {
            for (var i=0; i < tasks.length; i++) {
                this.placeTask(tasks[i]);
            }
        }



        /**
         * Remove task by ID
         * @param task
         */
        this.removeTask = function(id) {

            // First look for task in undone list
            // Our task elements have ids that correspond to their task number id
            var $task = $undoneTaskList.find('#' + id);

            // Standard way of seeing if a jQuery object contains anything
            if ($task.length) {
                $task.remove();
            } else {
                // Task was not in undone task list - let's assume in done
                $doneTaskList.find('#' + id).remove();
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