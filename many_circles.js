var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.height = document.body.offsetHeight;
canvas.width = document.body.offsetWidth;

var colours = ['red', 'green', 'blue', 'orange'];
var radiuses = [];
var centerXs = [];
var centerYs = [];

for(var i = 3; i < 30; i++){
  radiuses.push(i);
}

for(var j = 10; j < canvas.width - 100; j++){
  centerXs.push(j);
}

for(var j = 10; j < canvas.height - 100; j++){
  centerYs.push(j);
}


squareX = -50;
squareY = -50;

var circles = [];

var generate30Circles = function(){

  for(var x = 0; x <= 30; x++){
    var randColour = colours[Math.floor(Math.random()*colours.length)];
    var randRadius = radiuses[Math.floor(Math.random()*radiuses.length)];
    var centerX = centerXs[Math.floor(Math.random()*centerXs.length)];
    var centerY = centerYs[Math.floor(Math.random()*centerYs.length)];

    var circle = [centerX, centerY, randRadius, randColour];
    circles.push(circle);
  }
}



scale = function(vector, scale)  {
  return [vector[0] * scale, vector[1] * scale]
}
magnitude = function(vector) {
  return Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2))
}
subtract = function(v1, v2) {
  return [v1[0] - v2[0], v1[1] - v2[1]]
}
add = function(v1, v2) {
  return [v1[0] + v2[0], v1[1] + v2[1]]
}
normalize = function(vector) {
  return scale(vector, 5 * 1/magnitude(vector))
}


var drawCircle = function(centerX, centerY, randRadius, randColour) {

  context.beginPath();
  context.arc(centerX, centerY, randRadius, 0, 2 * Math.PI, false);
  context.fillStyle = randColour;
  context.fill();
  context.lineWidth = 0;
  context.strokeStyle = 'black';
  context.stroke();

}

var drawSquare = function() {
  context.beginPath();
  context.rect(squareX, squareY, 50, 50);
  context.fillStyle = 'black';
  context.fill();
  context.lineWidth = 1.5;
  context.strokeStyle = 'black';
  context.stroke();
}

var draw = function(){

  canvas.height = document.body.offsetHeight;
  canvas.width = document.body.offsetWidth;

  drawSquare();

  for(var i = 0; i < circles.length; i++){
    drawCircle(circles[i][0], circles[i][1], circles[i][2], circles[i][3]);
  }
  requestAnimationFrame(draw);
}



var moveCircle = function(circle, e) {

  var mousePos = [e.pageX,e.pageY];
  var circleX = circle[0];
  var circleY = circle[1];
  var circleR = circle[2];
  var objCentre = [circleX, circleY];

  var vector = subtract(objCentre, mousePos);
  if (magnitude(vector) < circleR * 100) {
    var distanceToAdd = normalize(vector);
    var newObj = add(objCentre, distanceToAdd);
    circle[0] = newObj[0];
    circle[1] = newObj[1];
  }

}

var moveSquare = function(e) {
  squareX = e.pageX;
  squareY = e.pageY;
}


var onMouseMove = function(e){

  for(var i = 0; i < circles.length; i++){
    var circle = circles[i];
    moveCircle(circle, e);

  }

  moveSquare(e);
}


generate30Circles();
draw();
addEventListener('mousemove', onMouseMove, false);
object.addEventListener("load", moveSquare);
