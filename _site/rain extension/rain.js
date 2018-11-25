

function RainDrop() {
  var self = this;

  self.x = Math.floor(Math.random() * canvas.width - 1) + 1;
  self.y = -35;
  self.speed = Math.floor(Math.random() * 800) + 300; 

  self.draw = function(){
    context.beginPath();
    context.moveTo(self.x, self.y);
    context.lineTo(self.x + 5, self.y + 30);
    context.strokeStyle = "blue";
    context.stroke();

  }
}

function createRain(drops) {
  for(var i = 0; i < drops; i++){
    var new_drop = new RainDrop();
    rain_array.push(new_drop);
    new_drop.draw();
  }
}

var start_raining = function(){
  var j = 0;
  var make_it_rain = setInterval(function() {
    var startTime = (new Date()).getTime();
    var rain_drops_at_once = Math.floor(Math.random() * 5) + 2;
    for(var drops = 0; drops < rain_drops_at_once; drops++){
      animate(rain_array[j + drops], canvas, context, startTime);
    }
    j += rain_drops_at_once;
    if (j >= rain_array.length){
      clearInterval(make_it_rain);
      canvasContainer.removeChild(canvas);
      document.body.removeChild(canvasContainer);
    }
  }, 400);
}

function animate(rain, canvas, context, startTime) {

// update
  var time = (new Date()).getTime() - startTime;

  if(!rain){
    return;
  }

  var linearSpeed = rain.speed;
  // pixels / second

  var newY = linearSpeed * time / 1000;

  rain.y = newY;

// clear
  context.clearRect(0, 0, canvas.width, canvas.height);

  var length = rain_array.length;
  for(var i = 0; i < length; i++){
    rain_array[i].draw();
  }

  // request new frame
  
  requestAnimationFrame(function() {
    animate(rain, canvas, context, startTime);
  });

}

function make_it_rain() { 
  canvasContainer = document.createElement('div');
  document.body.appendChild(canvasContainer);
  canvasContainer.style.position="absolute";
  canvasContainer.style.left="0px";
  canvasContainer.style.top="0px";
  canvasContainer.style.width="100%";
  canvasContainer.style.height="100%";
  canvasContainer.style.pointerEvents = 'none';

  canvasContainer.style.zIndex="1000000";

  canvas = document.createElement('canvas');
  canvas.style.width = canvasContainer.scrollWidth+"px";
  canvas.style.height = canvasContainer.scrollHeight+"px";
  canvas.style.pointerEvents = 'none';

  canvas.width = canvasContainer.scrollWidth;
  canvas.height = canvasContainer.scrollHeight;
  canvas.style.overflow = 'visible';
  canvas.style.position = 'absolute';

  canvasContainer.appendChild(canvas);
  context = canvas.getContext('2d');

  createRain(200);
  start_raining();
}

function find_ip_address() {
  $.get("http://ipinfo.io", function(response) {
      user_ip = response.ip;
  }, "jsonp");
}

function check_weather(){

  $.get("http://api.worldweatheronline.com/free/v2/weather.ashx?key=ee39f413b1b2fcb8e45617a390f80&q=" + user_ip +"&format=json", function(response) {
    if(response.data.error){
      console.log("No weather data for your region. Sorries!")
    } else if(response.data.current_condition[0].precipMM > 0){
      // console.log(response.data.current_condition[0])
      console.log("it's raiiinin!");
      make_it_rain();
    } else {
      console.log("Sunshine and rainbows everywhere!")
    }
    // console.log(response.data.current_condition[0]);
  }, "jsonp");
}


// Check if raining

var canvasContainer;
var canvas;
var context;
var user_ip;
var rain_array = [];

find_ip_address();
setTimeout(function(){
  check_weather();
}, 100);

setInterval(function() {
  check_weather();
}, 1000 * 60 * 20);

