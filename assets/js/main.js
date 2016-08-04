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

console.log(tasks);

var taskModel = tasks[0];
var taskList = document.getElementById('task-list');
var newTaskElement = document.createElement('li');
var newTaskTextNode = document.createTextNode(taskModel.content);

newTaskElement.appendChild(newTaskTextNode);
taskList.appendChild(newTaskElement);










