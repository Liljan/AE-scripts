// Pulse wave function for opacity

//Get selected layer
//edit its opacity

var layer = app.project.activeItem.selectedLayers[0];

var myProperty = layer.opacity;

var startTime = 2.0;
var endTime = 4.0;
var deltaTime = 0.01;

myProperty.setValueAtTime(startTime - deltaTime, 100);
myProperty.setValueAtTime(startTime, 0);
myProperty.setValueAtTime(endTime - deltaTime, 0);
myProperty.setValueAtTime(endTime,100);