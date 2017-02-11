// Pulse wave function for opacity

var layer = app.project.activeItem.selectedLayers[0];

var myProperty = layer.opacity;

var startTime = 0.0;
var deltaTime = 0.01;

var RPM = 600.0;
var roundsPerSecond = RPM / 60.0;
var period = 1.0 / roundsPerSecond; // 

var ammo = 32;

for(var i = 0; i < ammo; i++)
{
    myProperty.setValueAtTime(startTime, 100); // 1
    startTime += period/2.0;
    myProperty.setValueAtTime(startTime, 100); // 2
    myProperty.setValueAtTime(startTime +deltaTime , 0); // 3
    
    startTime += period/2.0;
    myProperty.setValueAtTime(startTime - deltaTime , 0); // 4
}