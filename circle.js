var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");


var colours = ['red', 'green', 'blue', 'orange', 'yellow', 'purple', 'pink'];
var randColour = colours[Math.floor(Math.random()*colours.length)];
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;


canvas.height = document.body.offsetHeight;
canvas.width = document.body.offsetWidth;

context.font = 'italic 25pt Calibri';
context.fillText('Fill the screen with circles! Click your mouse for a change of colour!', 20, 100);

var draw = function(){


var radius = 70;

context.beginPath();
context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
context.fillStyle = randColour;
context.fill();
context.lineWidth = 5;
context.strokeStyle = 'black';
context.stroke();

}


var onMouseMove = function(e){
  var x_coord = e.pageX;
  var y_coord = e.pageY;
  centerX = x_coord;
  centerY = y_coord;
  draw();
}

var onMouseDown = function(e){
  randColour = colours[Math.floor(Math.random()*colours.length)]
  draw();

}

canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('mousedown', onMouseDown, false);

