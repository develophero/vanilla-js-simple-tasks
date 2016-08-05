// Accessing a node on the document
var $myDiv = $('#my-div');

// Changing the node on the document
$myDiv.css('color', 'red');

// Another way
$myDiv.css({
  color: 'red'
});

// Be careful with the html function
$myDiv.html('<h1>New Inner Html</h1>');

// Create a node on the document
var $subheader = $('<h2>This is the subheader</h2>');

// At bottom of body:
//$('body').append($subheader);

$myDiv.after($subheader);

$myDiv.remove();

function buttonClicked() {
    console.log('button clicked');
}

// Two different ways:
$('#my-button').on('click', buttonClicked);

// Button clicked is a callback

// A callback anonymous inline function
$('#my-button').on('click', function() {
  console.log('button was clicked');
});