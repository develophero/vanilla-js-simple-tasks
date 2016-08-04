(function (window) {
    'use strict';

    var TasksModel = function(controller) {
        var model = this;
        this.controller = controller;

        this.getTasks = function(callback) {
            //return this.tasks;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    // return? nope
                    model.tasks = JSON.parse(xmlhttp.response);
                    callback(model.tasks);
                }
            };
            xmlhttp.open("GET", "http://localhost:4000/todos", true);
            xmlhttp.send();
        }

        this.getTask = function(id) {
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