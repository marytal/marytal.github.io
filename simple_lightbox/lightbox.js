// Global Variables

var current_image;
_background_images = [];


// Functions to open and customize lightbox



var onOpenLightbox = function(e) {
  var lightbox = document.getElementById("lightbox");
  lightbox.className = "visible";
  var body = document.getElementById("everything_except_lightbox");
  body.className = "faded";
  window.addEventListener('keydown', assignAction)

}

var customizeLightbox = function(clicked_image) {
  var lightbox = document.getElementById("lightbox");
  lightbox.getElementsByTagName("img")[0].src = clicked_image.src;
  current_image = clicked_image.id;
  onOpenLightbox("");
}

var findTargetID = function(e) {
  var clicked_image = document.getElementById(e.target.id);
  customizeLightbox(clicked_image);
}

var moveLeft = function(e){
  var length = _background_images.length
  for(var i = 0; i < length; i++){
    if (_background_images[0] == current_image) {
      return;
    } else if (_background_images[i] == current_image) {
      var clicked_image = document.getElementById(_background_images[i - 1]);
      customizeLightbox(clicked_image);
    }
  }
}

var moveRight = function(e){
  var length = _background_images.length
  for(var i = 0; i < length; i++){
    if (_background_images[length - 1] == current_image) {
      return;
    } else if (_background_images[i] == current_image) {
      var clicked_image = document.getElementById(_background_images[i + 1]);
      console.log(clicked_image.id);
      return customizeLightbox(clicked_image);
    }
  }
}
// Functions to close lightbox

var onCloseLightbox = function(e) {
  var lightbox = document.getElementById("lightbox");
  lightbox.className = "invisible";
  var bodies = document.getElementById("everything_except_lightbox");
  bodies.className = "";
  window.removeEventListener('keydown', assignAction);
}

// Shared functions

var assignAction = function(e) {
  e.preventDefault();
  if (e.keyCode == 27) {
    onCloseLightbox();
  } else if(e.keyCode == 37) {
    moveLeft();
  } else if(e.keyCode == 39) {
    moveRight();
  }
}


//Event Listeners

// To close lightbox
var close_lightbox = document.getElementById("close_lightbox");
close_lightbox.addEventListener('click', onCloseLightbox);



// To open lightbox


var background_images = document.querySelectorAll(".background")
for(var i = 0; i < background_images.length; i++){
  _background_images.push(background_images[i].id);
  background_images[i].addEventListener('click', findTargetID);
}

// To move left

var left_arrow = document.getElementById("left_arrow");
left_arrow.addEventListener('click', moveLeft);

// Move right
var right_arrow = document.getElementById("right_arrow");
right_arrow.addEventListener('click', moveRight);


