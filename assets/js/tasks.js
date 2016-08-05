(function (window) {
    'use strict';

    var tasks = [
        {
            id: 1,
            content: 'My Task 1',
            done: false
        },
        {
            id: 2,
            content: 'My Task 2',
            done: false
        }
    ]

    var TasksModel = function(controller) {
        var model = this;
        this.controller = controller;
        this.tasks = null;

        this.getTasks = function(callback) {
            model.tasks = tasks;
            return callback(model.tasks);
        }

        this.getTask = function(id) {
            // Notice anything different about the above function?
            for (var i=0; i < this.tasks.length; i++) {
                if (this.tasks[i].id === id) {
                    return this.tasks[i];
                }
            }
        }

        this.updateCheckedForId = function(id, checked) {
            var task = this.getTask(id);
            task.done = checked;
            console.log(this.tasks);
        }

        this.newTask = function(taskContent) {
            var newTask = {
                id: parseInt(Math.random()*10000),
                content: taskContent
            }
            this.tasks.push(newTask);
            return newTask;
        }

        this.saveTask = function(taskId, taskContent) {
            console.log('To be implemented in model - edit task with id ' + taskId + ' and new content: ' + taskContent);
        }

        // Called from a click on the View -> Controller -> Model
        this.deleteTask = function(id) {
            console.log('To be implemented in model - delete task with id ' + id);
        }
    }

    // Export to window
    window.TasksModel = TasksModel;

})(window);