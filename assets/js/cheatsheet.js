// Comments
/*
 Another comment
 * */

// JavaScript basic types
var content = 'this is a string';
var done = false;
var id = 1;

// Object type in JavaScript - JSON
// Bonus: What is JSON?
var task = {
    content: 'this is a string',
    done: false,
    id: 1,
    user: {
        id: 2,
        name: 'zack'
    }
}

// Accessing object properties
var tasksUserName = task.user.name;

// Bonus: What if there's an object inside an object?

// Arrays
var tasks = []; // new Array;
tasks.push({
    content: 'adsfds'
})
console.log(tasks[0]);

// Truthy and falsey
// Bonus: Name three different falsey values
if (tasks) {
    console.log('its tehre');
}

// Function notation
var doSomething = function(str) {
    console.log(str);

    function doSomethingElse() {
        console.log('asdfasf');
    }

    doSomethingElse();
}

doSomething('hello');

// Callbacks - set timeout
setTimeout(function() {
    console.log('its been two secnods');
}, 2000);
console.log('down here');

/**
 * Executes callback after a time.
 * @param time
 * @param callback
 */
function doSomethingAfterTime(time, callback) {
    setTimeout(function() {
        callback();
    }, time);
}

// doSomethingAfterTime
doSomethingAfterTime(1000, function() {
    console.log('callback called');
})

// Classes - Object Oriented

/*

    // In some other programming language you might have something like:

    class Task {
        private content;

        Task(string contentIn) {
            // The constructor
            this.content = contentIn;
        }

        public void log () {
            cout << this.content;
        }
    }
 */

// But in JS:
function Task(contentIn) {
    // Scope
    this.content = contentIn;

    // Not accessible
    var done = false;

    // Use strict
}

// Log Task method on Task class
Task.prototype.log = function() {
    console.log(this.content);
}

// New Task
var newTask = new Task('stuff');
newTask.log();

// Document Object Model

// Accessing a node on the document
var lessonDiv = document.getElementById('lesson');
console.log(lessonDiv);
console.log(lessonDiv.textContent);
console.log(lessonDiv.innerHTML);

// Changing the node on the document
lessonDiv.innerHTML = '<h1>asdfsfafs</h1>';
lessonDiv.style.color = 'red';

// Creating a node on the document
var node = document.createElement("h2");
var textnode = document.createTextNode("Water");
node.appendChild(textnode);
//document.body.appendChild(node);

document.body.insertBefore(node, lessonDiv);
console.log(node.nextSibling);

// Removing a node
document.body.removeChild(lessonDiv);

// Events - clicking a button
var myFunction = function() {
    console.log('hello');
}

// Event listener
document.getElementById('new-button').addEventListener("click", function() {
    console.log('new button');
});
