// Create the palette-type window (a modeless dialog)
var win = new Window('palette', 'Muzzle Flash Maker');
this.windowRef = win;
// Create a container panel for the components
win.pnl = win.add("panel", [5, 5, 170, 80], 'Offset Controls');
// Use the panel's add() method to create components
win.pnl.stxt = win.pnl.add('statictext', [10, 15, 100, 35], "Duplicate #:");
var theNum = win.pnl.add('edittext', [90, 15, 140, 35], '10');
// Add OK/Cancel buttons
win.pnl.okBtn = win.pnl.add("button", [10, 40, 60, 60], 'OK');
win.pnl.cnlBtn = win.pnl.add("button", [90, 40, 140, 60], 'Cancel');
// Define the behavior of the buttons

    // Display the window
win.show();

win.pnl.okBtn.onClick = function() {
    //alert("button pressed"); //debug
    //offset3D();
}
win.pnl.cnlBtn.onClick = function() {
        $.writeln("Cancel Button Pressed");
        win.close();
    }

function on_textInput_changed() {
    // Set the duplicate number based on the text.
    //alert("In text change");// debug
    var value = theNum.text;
    if (isNaN(value)) {
        alert(value + " is not a number. Please enter a number.", scriptName);
    } else {
        //alert("Value is "+value);//debugging
        duplicates = value;
    }
}

function offset3D() {
    //alert("In 3D");
    var undoStr = "3D Layer Offset";
    app.beginUndoGroup(undoStr); // begin UNDO group
    on_textInput_changed(); //check that its a number not letters
    // alert(duplicates);//debugging
    var myComp = app.project.activeItem;
    if (myComp == null || !(myComp instanceof CompItem)) { // A COMP MUST BE SELECTED
        alert("A Comp must be active to run this script");
    } else {
        var myLayer = myComp.selectedLayers;
        if (myLayer == null) { // check a layer is selected
            alert("Select a Layer");
        } else {
            var thisLayer = myComp.selectedLayers[0];
            if (thisLayer) {
                thisLayer.threeDLayer = true;
                thisLayer.duplicate();
                // make a null object
                var controlNull = myComp.layers.addNull();
                controlNull.source.name = "Anchor Point Offset Control";
                //add a sliders for Z anchorPoint
                var offset = controlNull("Effects").addProperty("Slider Control");
                offset.name = 'Layer Offset (Z)';
                // duplicate the layers and
                // add the script to the selected layer
                for (i = 0; i < (duplicates - 1); i++) {
                    var posExpression = 'x =anchorPoint[0]; \n y=anchorPoint[1];\n z =thisComp.layer(index-1).transform.anchorPoint[2]+ thisComp.layer("Anchor Point Offset Control").effect("Layer Offset (Z)")("Slider");[x,y,z]';
                    thisLayer.anchorPoint.expression = posExpression;
                    thisLayer.duplicate();
                }
            } else {
                alert("Select a layer first.")
                app.endUndoGroup();
            }
        }
    }
}
//var selectedComp = app.project.activeItem;

//alert ("oh", "oh");
