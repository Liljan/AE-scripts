// Pulse wave function for opacity

//Get selected layer
//edit its opacity

var layer = app.project.activeItem.layer(1);

var myProperty = layer.opacity;
//opacity has propertyValueType of OneD, and is stored as a f loat
myProperty.setValue(Math.random() * 100); // s et opacity to 50%
