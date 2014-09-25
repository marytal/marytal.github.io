var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.height = document.body.offsetHeight;
canvas.width = document.body.offsetWidth;

var colours = ['red', 'green', 'blue', 'yellow','red', 'green', 'blue', 'yellow', 'red', 'green', 'blue', 'yellow', 'black'];
var radiuses = [];
var centerXs = [];
var centerYs = [];
var outlines = ['red', 'green', 'blue', 'yellow'];

for(var i = 20; i < 60; i++){
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

var globalMousePosition = [-50, -50];

var generateCircle = function(){
  var randColour = colours[Math.floor(Math.random()*colours.length)];
  var randRadius = radiuses[Math.floor(Math.random()*radiuses.length)];
  var centerX = centerXs[Math.floor(Math.random()*centerXs.length)];
  var centerY = centerYs[Math.floor(Math.random()*centerYs.length)];
  if(randColour == 'black'){
    var randOutline = outlines[Math.floor(Math.random()*outlines.length)];
  } else {
    var randOutline = 'black';
  }

  var circle = [centerX, centerY, randRadius, randColour, randOutline];
  circles.push(circle);
}


var generate10Circles = function(){

  for(var x = 0; x <= 10; x++){
    generateCircle();
  }
}

var maxCircles = 15;
var circlesAdded = 0;
var randomCircles

var startGenerating = function(){
  randomCircles = setInterval(generateDuringGame, 2000);
}

var generateDuringGame = function(){
  generateCircle();
  circlesAdded++;
  if(maxCircles < circlesAdded){
    clearInterval(randomCircles);
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
  return scale(vector, 1/magnitude(vector))
}


var drawCircle = function(centerX, centerY, randRadius, randColour, randOutline) {

  context.beginPath();
  context.arc(centerX, centerY, randRadius, 0, 2 * Math.PI, false);
  context.fillStyle = randColour;
  context.fill();
  context.lineWidth = 0;
  if(randColour == 'black') {
    context.strokeStyle = randOutline;
  } else {
    context.strokeStyle = 'black';
  }
  context.stroke();
  context.strokeStyle = 'black'

}

var drawSheep = function() {
  var image = new Image();
  image.src = "https://www.foodandhealth.com/images/clipart/Broom.png";
  context.drawImage(image, globalMousePosition[0], globalMousePosition[1], 40, 70);
  
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
}

var drawEndGame = function(){
  var image = new Image()
  image.src = "http://hotmexchili.com/media/catalog/product/cache/1/image/650x650/9df78eab33525d08d6e5fb8d27136e95/g/a/gameover.jpg"
  context.drawImage(image, canvas.width / 2 - 200, canvas.height / 2 - 200, 400, 400);
}

var draw = function(){

  canvas.height = document.body.offsetHeight;
  canvas.width = document.body.offsetWidth;


  drawPosts();
  drawSheep();
  displayPoints();
  drawCaptureButton();
  moveCircles();

  for(var i = 0; i < circles.length; i++){
    drawCircle(circles[i][0], circles[i][1], circles[i][2], circles[i][3], circles[i][4]);
  }

  if((circles.length == 0) && (circlesAdded > maxCircles)){
    drawEndGame();
    //alert("Good game(ish)! You scored " + points + " points!");
  }


  requestAnimationFrame(draw);
}


var removeCircle = function(circle) {
  circles.splice(circles.indexOf(circle), 1);
}

var checkCircleStatus = function(circle) {
  var circleR = circle[2];
  var circleX = circle[0];
  var circleY = circle[1];
  var colour = circle[3];
  var outline = circle[4];

  if(colour == 'black'){
    colour = outline;
  }

  if((circleX > canvas.width + circleR) && colour == 'red'){
    if(outline != 'black'){
      points+= 10;
    } else {
      points += 5;
    }
    return removeCircle(circle);
  } else if((circleX < -circleR) && colour == 'blue'){
      if(outline != 'black'){
        points+= 10;
      } else {
        points += 5;
      }
    return removeCircle(circle);
  } else if((circleY > canvas.height + circleR) && colour == 'green'){
      if(outline != 'black'){
        points+= 10;
      } else {
        points += 5;
      }
    return removeCircle(circle);
  } else if((circleY < -circleR) && colour == 'yellow'){
      if(outline != 'black'){
        points+= 10;
      } else {
        points += 5;
      }
    return removeCircle(circle);
  }

  pointString = parseInt(points);
  if((circleY < -circleR) || (circleY > canvas.height + circleR) || 
    (circleX < -circleR) || (circleX > canvas.width + circleR)) {
    if(outline != 'black'){
      points-= 20;
    } else {
      points -= 1;
    }
    removeCircle(circle);
  }

}

var moveCircle = function(circle, mousePos) {

  var circleX = circle[0];
  var circleY = circle[1];
  var circleR = circle[2];
  var objCentre = [circleX, circleY];

  var vector = subtract(objCentre, mousePos);
  var distance = magnitude(vector);
  if (distance < 3500) {

    var baseSpeed = 14400;
    var howMuchDistanceAffectsSpeed = 1.8;

    var distanceToAdd = baseSpeed / Math.pow(distance, howMuchDistanceAffectsSpeed);
    var vectorToAdd = scale(normalize(vector), distanceToAdd);
    var newObj = add(objCentre, vectorToAdd);
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

var onMouseMove = function(e) {
  globalMousePosition[0] = e.pageX;
  globalMousePosition[1] = e.pageY;

}

var moveCircles = function(){

  for(var i = 0; i < circles.length; i++){
    var circle = circles[i];
    moveCircle(circle, globalMousePosition);

  }
  
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


generate10Circles();
draw();
canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('mousedown', onMouseDown);
window.addEventListener('load', startGenerating);



