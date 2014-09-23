var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.height = document.body.offsetHeight;
canvas.width = document.body.offsetWidth;

var colours = ['red', 'green', 'blue', 'yellow'];
var radiuses = [];
var centerXs = [];
var centerYs = [];

for(var i = 3; i < 30; i++){
  radiuses.push(i);
}

for(var j = 100; j < canvas.width - 150; j++){
  centerXs.push(j);
}

for(var j = 100; j < canvas.height - 150; j++){
  centerYs.push(j);
}

var points = 0;
var pointString = parseInt(points);
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

var drawPosts = function() {
  context.beginPath();
  context.rect(canvas.width - 50, 0, 50, canvas.height);
  context.fillStyle = 'red';
  context.fill();
  context.stroke();

  context.beginPath();
  context.rect(50, 0, canvas.width - 100, 50);
  context.fillStyle = 'yellow';
  context.fill();
  context.stroke();

  context.beginPath();
  context.rect(0, 0, 50, canvas.height);
  context.fillStyle = 'blue';
  context.fill();
  context.stroke();

  context.beginPath();
  context.rect(50, canvas.height - 50, canvas.width - 100, 50);
  context.fillStyle = 'green';
  context.fill();
  context.stroke();

}

var displayPoints = function(){
  context.font = 'italic 25pt Calibri';
  context.fillText('Points:', 60, 100);
  context.fillText(pointString, 160, 100);
  context.fillText("/30", 195, 100);
}

var draw = function(){

  canvas.height = document.body.offsetHeight;
  canvas.width = document.body.offsetWidth;


  drawPosts();
  displayPoints();
  drawCaptureButton();

  for(var i = 0; i < circles.length; i++){
    drawCircle(circles[i][0], circles[i][1], circles[i][2], circles[i][3]);
  }
  requestAnimationFrame(draw);
}



var checkCircleStatus = function(circle) {
  var circleR = circle[2];
  var circleX = circle[0];
  var circleY = circle[1];
  var colour = circle[3];

  if((circleX > canvas.width + circleR) && colour == 'red'){
    points++;
  } else if((circleX < -circleR) && colour == 'blue'){
    points++;
  } else if((circleY > canvas.height + circleR) && colour == 'green'){
    points++;
  } else if((circleY < -circleR) && colour == 'yellow'){
    points++;
  }

  pointString = parseInt(points);
  if((circleY < -circleR) || (circleY > canvas.height + circleR) || 
    (circleX < -circleR) || (circleX > canvas.width + circleR)) {
    circles.splice(circles.indexOf(circle), 1);
  }

  if (circles.length == 0) {
    alert("game over! You scored " + points + " points!");
  }
}

var moveCircle = function(circle, e) {

  var mousePos = [e.pageX,e.pageY];
  var circleX = circle[0];
  var circleY = circle[1];
  var circleR = circle[2];
  var objCentre = [circleX, circleY];

  var vector = subtract(objCentre, mousePos);
  if (magnitude(vector) < 100) {
    var distanceToAdd = normalize(vector);
    var newObj = add(objCentre, distanceToAdd);
    circle[0] = newObj[0];
    circle[1] = newObj[1];
  }

  checkCircleStatus(circle);

}


var moveSquare = function(e) {
  squareX = e.pageX;
  squareY = e.pageY;
}

var drawCaptureButton = function() {
  context.beginPath();
  context.rect(canvas.width - 150, 15, 30, 20);
  context.fillStyle = 'yellow';
  context.fill();
  context.lineWidth = 1.5;
  context.strokeStyle = 'black';
  context.stroke();

  context.beginPath();
  context.arc(canvas.width - 135, 25, 6, 0, 2 * Math.PI, false);
  context.fillStyle = 'yellow';
  context.fill();
  context.lineWidth = 0;
  context.strokeStyle = 'black';
  context.stroke();


  var startAngle = 1.1 * Math.PI;
  var endAngle = 1.9 * Math.PI;

  context.beginPath();
  context.arc(canvas.width - 143, 16, 6, startAngle, endAngle, false);

      // line color
      context.strokeStyle = 'black';
      context.stroke();
}


var onMouseMove = function(e){

  for(var i = 0; i < circles.length; i++){
    var circle = circles[i];
    moveCircle(circle, e);

  }

  moveSquare(e);
  
}

var onMouseDown = function(e){
  if(e.button != 0){
    return;
  }

  var mousePos = [e.pageX,e.pageY];
  var cameraX = canvas.width - 150
  var cameraY = 15
  var objCentre = [cameraX, cameraY];

  var vector = subtract(objCentre, mousePos);
  if (magnitude(vector) < 25) {
    console.log("clicked!");
    var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
    window.location.href=image;
  }

}


generate30Circles();
draw();
addEventListener('mousemove', onMouseMove, false);
addEventListener("load", moveSquare);
addEventListener('mousedown', onMouseDown)


