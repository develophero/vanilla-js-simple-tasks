(function (window) {
    'use strict';

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