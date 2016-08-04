(function (window) {
    'use strict';

    var TasksModel = function(controller) {
        var model = this;
        this.controller = controller;
        this.tasks = null;

        this.getTasks = function(callback) {
            $.get('http://localhost:4000/todos', function(response) {
                model.tasks = response;
                callback(model.tasks);
            });
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
    }

    // Export to window
    window.TasksModel = TasksModel;

})(window);