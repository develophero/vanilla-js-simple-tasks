// Comments
/*
 Another comment
 * */


// JavaScript basic types
// Variable names in camelcase - can be anything
var aNumber = 1;
var aString = 'this is a string';
var aBoolean = false;
// console.log(aNumber);
// console.log(aString);
// console.log(aBoolean);

// Object type in JavaScript - JSON
// Bonus: What is JSON?
var task = {
    content: 'Learn how to code JavaScript',
    done: false,
    user: {
        name: 'zack',
        id: 1
    }
};

// Accessing object properties
var theTaskContent = task.content;

// Bonus: What if there's an object inside an object?
// Log the user's name to the console 
//console.log(task.user.name);

// Arrays
var a = 'a';
var b = 'b';
var c = 'c';

var myNumbers = [a, b, c];
myNumbers.push('d');
myNumbers.splice(2, 1);
//console.log( myNumbers );

// Truthy and falsey

var x = null;
if (x != null && x != undefined) {
     //console.log('x exists');
}

// Bonus: Name three different falsey values
// 0, undefined, '', [].length

// Function notation

function doSomething(xIn) {
    console.log(xIn);
}

var x = 5;
doSomething(x);

// f(x)

// Callbacks - set timeout

/**
 * Executes callback after a time.
 * @param time
 * @param callback
 */

// doSomethingAfterTime

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

// Log Task method on Task class

// New Task

// Document Object Model
// Accessing a node on the document
var myDiv = document.getElementById('my-div');
console.log(myDiv.innerHTML);

// Changing the node on the document
myDiv.style.color = 'red';
myDiv.innerHTML = '<h1>New Inner Html</h1>';

// Creating a node on the document
var node = document.createElement('h2');
var textNode = document.createTextNode('This is the subheader');
// <h2></h2>
// This is a subheader
node.appendChild(textNode);
//document.body.appendChild(node);
document.body.insertBefore(node, myDiv.nextSibling);

document.body.removeChild(myDiv);
// Removing a node

// Events - clicking a button
function buttonClicked() {
    console.log('button clicked');
}

var myButton = document.getElementById('my-button');
console.log(myButton);
myButton.addEventListener('click', function() {
    console.log('button was clicked');
})

// Event listener
