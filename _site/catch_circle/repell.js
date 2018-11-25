
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

canvas.height = document.body.offsetHeight;
canvas.width = document.body.offsetWidth;

var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = 70;
var message = 'If you can click it, you win!';


var checkLocation = function() {
  if((centerX > canvas.width + radius + 15) || (centerX < -radius - 15) || 
    (centerY > canvas.height + radius + 15) || (centerY < -radius - 15)) {
    alert("Oops. Circle out of bounds. Refresh to try again.")
    canvas.removeEventListener('mousemove', onMouseMove);
    return true;
  }

  return false;
}


var draw = function(){
;
  canvas.height = document.body.offsetHeight;
  canvas.width = document.body.offsetWidth;

  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.fillStyle = 'green';
  context.fill();
  context.lineWidth = 5;
  context.strokeStyle = 'black';
  context.stroke();

}

draw();
context.font = 'italic 25pt Calibri';
context.fillText('Chase that circle!', 20, 100);

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
  return scale(vector, 10 / magnitude(vector) + 1/magnitude(vector))
}

var onMouseMove = function(e){
  var mousePos = [e.pageX,e.pageY];
  var objCentre = [centerX, centerY];

  var vector = subtract(objCentre, mousePos);
  if (magnitude(vector) < 150) {
    var distanceToAdd = normalize(vector);
    var newObj = add(objCentre, distanceToAdd);
    centerX = newObj[0];
    centerY = newObj[1];
  }

  if (checkLocation()){
    return
  };
  draw();
  context.font = 'italic 25pt Calibri';
  context.fillText(message, 20, 100);
  
}

var onMouseDown = function(e) {
  if(e.button != 0){
    return;
  }

  var mousePos = [e.pageX,e.pageY];
  var objCentre = [centerX, centerY];

  var vector = subtract(objCentre, mousePos);
  if (magnitude(vector) < 70) {
    alert("You win!");
    message = "yaaaaaay!";
  }

}


canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('mousedown', onMouseDown, false)


