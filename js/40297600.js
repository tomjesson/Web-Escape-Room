var Lab = "images/Lab/Lab.png"; // https://pixabay.com/illustrations/alchemy-wizards-magic-witchcraft-2146679/
var LabDark = "images/Lab/LabDark.png";
var LabUV = "images/Lab/LabUV.png";
var Chest = "images/Lab/Chest.png"; //https://pixabay.com/vectors/treasure-chest-box-treasure-chest-575386/
var Shelf = "images/Lab/Shelf.png"; //https://stocksnap.io/photo/rustic-wood-H0E8BJ4H7I  https://pixabay.com/vectors/shelf-wood-wall-hanging-wooden-575408/
var Lab_map = "#lab-map";
var Chest_map = "#lab-chest-map";
var Shelf_map = "#lab-shelf-map";
var all_screen_map = "#all-screen"
var empty_png = "images/Lab/EmptyPNG.png";
var acid_get = "images/Lab/AcidGet.png";
var key_get = "images/Lab/KeyGet.png";
//Normal Lab

var empty_bottle = "images/Lab/Flask.png"; // https://pixabay.com/illustrations/flask-beaker-science-laboratory-908887/
var blue_bottle = "images/Lab/FlaskBlue.png";
var red_bottle = "images/Lab/FlaskRed.png";
var yellow_bottle = "images/Lab/FlaskYellow.png";
var brown_bottle = "images/Lab/FlaskBrown.png";
var green_bottle = "images/Lab/FlaskGreen.png";
var blue_bottle03 = "images/Lab/FlaskBlue0.3.png";
var red_bottle03 = "images/Lab/FlaskRed0.3.png";
var yellow_bottle03 = "images/Lab/FlaskYellow0.3.png";
var blue_bottle06 = "images/Lab/FlaskBlue0.6.png";
var red_bottle06 = "images/Lab/FlaskRed0.6.png";
var yellow_bottle06 = "images/Lab/FlaskYellow0.6.png";
var purple_bottle06 = "images/Lab/FlaskPurple0.6.png";
var orange_bottle06 = "images/Lab/FlaskOrange0.6.png";
var green_bottle06 = "images/Lab/FlaskGreen0.6.png";


var flask_empty = document.getElementById("flask-empty");
var flask_blue = document.getElementById("flask-blue");
var flask_red = document.getElementById("flask-red");
var flask_yellow = document.getElementById("flask-yellow");

var smokeChest = document.getElementById("smoke-chest"); //https://www.videvo.net/video/steam-vapour-spray-background-1777/844/  https://freesound.org/people/jesabat/sounds/119741/

var main_img = document.getElementById("main-img");

var numberofmixes = 0;
var firstcolour = "";
var secondcolour = "";
var thirdcolour = "";
var blueused = 0;
var yellowused = 0;
var redused = 0;

var acid = document.getElementById("item5");
var key = document.getElementById("item6");

var glug = new Audio("sounds/Lab/glug.wav"); // https://freesound.org/people/LloydEvans09/sounds/221488/

var DragItem;

//sets data for the current room
function currentRoom_4() {
    roomLit = "url(images/Lab/Lab.png)";
    roomUV = "url(images/Lab/LabUV.png)";
    hideMap = "#lab-hide-map";
    roomState_Lab.state = roomState_Lab.state;
}
//Normal Lab
function LabRoomState_1() {
    //numberofmixes = 0;
    removeFlask()
    setMainImg(Lab, Lab_map);
}
//Shelf with the flask game
function LabRoomState_2() {
    flashlightState.flashlight = 0;
    getFlask()
    move()
    setMainImg(Shelf, Shelf_map)
}
//When you get the key
function LabRoomState_3() {
    setMainImg(key_get, all_screen_map);
    key.style.opacity = 1
    key3Obtained = true;
    minute3 = minute;
    second3 = second;
    roomIsMenu = false;
}
//When you get the acid
function LabRoomState_4() {
    flashlightState.flashlight = 0;
    removeFlask()
    setMainImg(acid_get, all_screen_map);
    acid.style.opacity = 1;
}
//The chest screen
function LabRoomState_5() {
    flashlightState.flashlight = 0;
    setMainImg(Chest, Chest_map);
}
//changes the room to chest screen
function LabChestClick(i) {
    i.preventDefault()
    roomState_Lab.state = 5;
    roomIsMenu = true;
}
//changes the room to shelf screen
function LabShelfClick(i) {
    i.preventDefault()
    roomState_Lab.state = 2;
}
//changes the room to main screen
function ReturnToRoomFromChest(i) {
    i.preventDefault()
    roomState_Lab.state = 1;
    roomIsMenu = false;
}
//changes the room to main screen
function ReturnToRoomFromShelf(i) {
    i.preventDefault()
    //roomState_Lab.statePrevious;
    roomState_Lab.state = 1;
}
//positions the flask in the correct place and moves the z-index forward so the are infront of the background
function getFlask() {
    flask_empty.style.left = "200px"
    flask_blue.style.left = "400px"
    flask_red.style.left = "600px"
    flask_yellow.style.left = "800px"

    flask_empty.style.zIndex = 1
    flask_blue.style.zIndex = 1
    flask_red.style.zIndex = 1
    flask_yellow.style.zIndex = 1
}
//positions the flask in the top left corner so they are out the way and moves the z-index backwards so the are behind of the background and hidden
function removeFlask() {
    flask_empty.style.zIndex = -5
    flask_blue.style.zIndex = -5
    flask_red.style.zIndex = -5
    flask_yellow.style.zIndex = -5

    flask_empty.style.left = "0px"
    flask_blue.style.left = "0px"
    flask_red.style.left = "0px"
    flask_yellow.style.left = "0px"
}
//when any of the flasks are clicked on it sets DragItem to = that flask
function move() {
    flask_blue.onmousedown = function() {
        DragItem = flask_blue;
    }
    flask_yellow.onmousedown = function() {
        DragItem = flask_yellow;
    }
    flask_red.onmousedown = function() {
        DragItem = flask_red;
    }
}
//when the mouse is moved if the on the shelf page it takes the mouses x and y and moves DragItem with it 
document.onmousemove = function(i) {
    var check = (main_img.src).indexOf(Shelf);
    if (check !== -1) {
        var x = i.pageX;
        var y = i.pageY;
        DragItem.style.left = x - flask_blue.offsetWidth / 2 + "px";
        DragItem.style.top = y - flask_blue.offsetWidth / 2 + "px";
    }
}
//when the mouse is lifted and is on the shelf screen it if the flask has been dragged over the empty flask it will pour some from that flask into the empty one and update the empty flask image accordingly depending on what you pour in.
document.onmouseup = function(i) {
    var check = (main_img.src).indexOf(Shelf);
    if (check !== -1) {
        var x = i.pageX;
        var y = i.pageY;
        if ((x > 200) && (x < 300) && (y > 500) && (y < 600)) {
            numberofmixes = numberofmixes + 1;
            if (numberofmixes == 1) {

                if (DragItem == flask_blue) {
                    flask_empty.src = blue_bottle03;
                    firstcolour = "blue";
                    blueused++;
                }
                if (DragItem == flask_red) {
                    flask_empty.src = red_bottle03;
                    firstcolour = "red";
                    redused++;
                }
                if (DragItem == flask_yellow) {
                    flask_empty.src = yellow_bottle03;
                    firstcolour = "yellow";
                    yellowused++;
                }
            }

            if (numberofmixes == 2) {
                if (DragItem == flask_blue) {
                    blueused++;
                    if (firstcolour == "blue") {
                        flask_empty.src = blue_bottle06;
                        secondcolour = "blue";
                    }
                    if (firstcolour == "red") {
                        flask_empty.src = purple_bottle06;
                        secondcolour = "blue";
                    }
                    if (firstcolour == "yellow") {
                        flask_empty.src = green_bottle06;
                        secondcolour = "blue";
                    }
                }
                if (DragItem == flask_red) {
                    redused++;
                    if (firstcolour == "blue") {
                        flask_empty.src = purple_bottle06;
                        secondcolour = "red";
                    }
                    if (firstcolour == "red") {
                        flask_empty.src = red_bottle06;
                        secondcolour = "red";
                    }
                    if (firstcolour == "yellow") {
                        flask_empty.src = orange_bottle06;
                        secondcolour = "red";
                    }
                }
                if (DragItem == flask_yellow) {
                    yellowused++;
                    if (firstcolour == "blue") {
                        flask_empty.src = green_bottle06;
                        secondcolour = "yellow";
                    }
                    if (firstcolour == "red") {
                        flask_empty.src = orange_bottle06;
                        secondcolour = "yellow";
                    }
                    if (firstcolour == "yellow") {
                        flask_empty.src = yellow_bottle06;
                        secondcolour = "yellow";
                    }
                }
            }
            if (numberofmixes == 3) {
                if (DragItem == flask_blue) {
                    blueused++;
                    if ((firstcolour == "red") && (secondcolour == "yellow")) {
                        flask_empty.src = green_bottle;
                        thirdcolour = "green";
                        roomState_Lab.state = 4

                    } else {
                        flask_empty.src = brown_bottle
                        thridcolour = "brown";
                    }
                }
                if (DragItem == flask_yellow) {
                    flask_empty.src = brown_bottle;
                    thridcolour = "brown";
                    yellowused++;
                }
                if (DragItem == flask_red) {
                    flask_empty.src = brown_bottle;
                    thridcolour = "brown";
                    redused++;
                }
            }
            glug.play()
        }

        DragItem = null;
        checkbottleammounts()
    }
}

// this function updates the image of the bottle you poured from to show that it has been used. If any bottle becomes empty without having created the acid it's game over.
function checkbottleammounts() {
    var gameovercheck = false;
    if (redused == 1) {
        flask_red.src = red_bottle06;
    }
    if (redused == 2) {
        flask_red.src = red_bottle03;
    }
    if (yellowused == 1) {
        flask_yellow.src = yellow_bottle06;
    }
    if (yellowused == 2) {
        flask_yellow.src = yellow_bottle03;
    }
    if (blueused == 1) {
        flask_blue.src = blue_bottle06;
    }
    if (blueused == 2) {
        flask_blue.src = blue_bottle03;
    }
    if (blueused == 3) {
        flask_blue.src = empty_bottle;
        gameovercheck = true;
    }
    if (redused == 3) {
        flask_red.src = empty_bottle;
        gameovercheck = true;
    }
    if (blueused == 3) {
        flask_red.src = empty_bottle;
        gameovercheck = true;
    }
    if (thirdcolour == "brown") {
        if (gameovercheck == true) {
            gameOver();
            removeFlask();
        }
    }
    if (gameovercheck == true){
        gameOver();
        removeFlask();
    }
}
//emptys the bottle you pour into when the button is pressed.
function emptybottle(i) {
    i.preventDefault()
    numberofmixes = 0;
    firstcolour = "";
    secondcolour = "";
    thirdcolour = "";
    flask_empty.src = empty_bottle;
}
// sets the room state back to the main room image
function resetroom(i) {
    i.preventDefault()
    roomState_Lab.state = 1;
}
// if the lock on the chest is clicked when you have the acid item it will play the video of the smoke on the lock of the chest
function acidcheck(i) {
    i.preventDefault()
    if (acid.style.opacity == 1) {
        smokeChest.style.zIndex = 2;
        smokeChest.style.left = "0px"
        smokeChest.style.top = "0px"
        smokeChest.play()
    }
}
// when the some video stopps playing the media player is removed and hidden and the room state is changed to show you got the key
function smokeended(i) {
    i.preventDefault()
    smokeChest.removeAttribute('src');
    smokeChest.style.zIndex = -6;
    smokeChest.style.left = ""
    smokeChest.style.top = ""
    smokeChest.load();
    roomState_Lab.state = 3  
}
//goes back to previous room
function backarrow(i){
    i.preventDefault();
    currentRoom.state=2;
    roomState_Hallway.state = 2;
}
//allows for personalised gameplay as your name is used
function formsubmit(i) {
    i.preventDefault();
    var username = document.getElementById("name").value;
    document.getElementById("name-form").style.zIndex = -5;
    roomState_Office.state=2
    document.getElementById("hide-text").textContent="You hear noices! " + username + " you need to hide in the correct spot before it's to late! ";
}
//changes the contrast
function contrastchange(i) {
    main_img.style.filter = "contrast(" + i + "%)";
}
//inverts the colours
var invert = 0
function invertcolours(i){
    i.preventDefault();
    if (invert == 0) {
        main_img.style.filter = "invert(1)";
        invert = 1;
    } else {
        main_img.style.filter = "invert(0)";
        invert = 0;
    }
}
//changes the brightness
function brightnesschange(i) {
    main_img.style.filter = "brightness(" + i + "%)";
}