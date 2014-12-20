function add_instructions(_instructions) {
  buttonContainer = document.createElement('div');
  instructionsContainer = document.createElement('div');
  button = document.createElement('p');
  instructions = document.createElement('p');

  document.body.appendChild(buttonContainer); 
  document.body.appendChild(instructionsContainer);
  buttonContainer.appendChild(button);
  instructionsContainer.appendChild(instructions);


  buttonContainer.id = "buttonContainer";
  button.id = "button";
  instructionsContainer.id = "instructionsContainer";
  instructions.id = "instructions";
  instructionsContainer.className = "invisible";
  // instructions.className = "invisible";

  button.innerHTML = "?";
  instructions.innerHTML = _instructions;

  buttonContainer.onmouseover = function(){
    instructionsContainer.className = "visible";
  }

  buttonContainer.onmouseout = function() {
    instructionsContainer.className = "invisible";
  }

}
