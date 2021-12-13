

var overlayStopFlag = false;

//Imagecontainer div
var container = document.getElementById("img-container");

//Hover img div
var hoverImg = document.getElementById("hover-image");

//the main Image that needs to be changed
var mainImg = document.getElementById("main-img");

//invisible layer image, needed because of the flashlight mechanic as a third layer, also needs to be changed with state
var invisMainImg = document.getElementById("invisible-layer");

var hideEventOverlay = document.getElementById("hideEvent-overlay");

/*
    These 2 variables need to contain the url to the lit and UV lit versions of the current room
*/
var roomLit = "url(images/Office/SecurityOfficeSceneLITPNG1.png)";
var roomUV = "url(images/Office/SecurityOfficeSceneUVLightPNG1.png)";

//Monitor image needs to be updated based on taskState
var monitorImage = "images/Office/monitor-Introduction.png";

//update to current room on room change event | hide map for the random triggered hide event
var hideMap = "#secruity-office-hide-map";


var fuseObtained = false; //fuse to put in fusebox to turn on lights
var key1Obtained = false; //first key located in a safe in security office
var drillObtained = false;
var key2Obtained = false;
var key3Obtained = false;
var item1Obtained = false;
var item2Obtained = false;
var item3Obtained = false;
/*
Need a boolean for each item, stating if its obtained or not
*/


//This flag is needed for the random hide event since we dont want it triggered if the user has a menu open
var roomIsMenu=false;


taskState={
    taskInternal: 1,
    taskListener: function(val) {},
    set task(val) {
        this.taskInternal = val;
        this.taskListener(val);
    },
    get task() {
        return this.taskInternal;
    },
    registerListener: function(listener) {
        this.taskListener = listener;
    }

}
//task == 1 --> Introduction
//task == 2 --> Find fuse in dark and place in fuse box
//task == 3 --> Open safe
//task == 4 --> get to storage room
//task == 5 --> find drill hole
//task == 6 --> get Key2
//task == 7 --> use key to open the door
//task == 8 --> get to lab

//Tips need to be updated
//Monitor with tip 1 : "If ligths go out there is a spare fuse in the desk to the left"
//Monitor with tip 2 : "I need to get a key from the safe but can't remember the code..."
//Monitor with tip 3 : "I need to get into the laboratory, maybe the storage room will have something I could use"
//Monitor with tip 4 : "I need to get into the laboratory, maybe the storage room will have something I could use"

/*
    Contains the roomstate and also contains the previous roomstate, for jumping back from menus etc
*/
roomState_Office={
    stateInternal: 1, //THIS SHOULD BE 1, TEMPORARILY AT 8 FOR TESTING PURPOSES
    statePrevious: 1,//stores the previous roomState for easier jumping back
    stateListener: function(val) {},
    set state(val) {
        if(this.stateInternal!=val){//if new value is same as old value, dont overwrite previous state
            this.statePrevious=this.stateInternal;
        }
        this.stateInternal = val;
        this.stateListener(val);
    },
    get state() {
        return this.stateInternal;
    },
    registerListener: function(listener) {
        this.stateListener = listener;
    }
}
//roomState == 1 --> Normal office with no blood
//roomState == 2 --> Dark office
//roomState == 3 --> Dark office with fuse taken animation and fuse taken in lit
//roomState == 4 --> Dark office with fusebox open
//roomState == 5 --> Normal office with fuse taken and blood
//roomState == 6 --> Normal office with safe menu open
//roomState == 7 --> Normal office with safe menu open and failed code
//roomState == 8 --> Normal office with key gained animation and exit arrow

roomState_Hallway={
    stateInternal: 1,
    statePrevious: 0,//stores the previous roomState for easier jumping back
    stateListener: function(val) {},
    set state(val) {
        if(this.stateInternal!=val){//if new value is same as old value, dont overwrite previous state
            this.statePrevious=this.stateInternal;
        }
        this.stateInternal = val;
        this.stateListener(val);
    },
    get state() {
        return this.stateInternal;
    },
    registerListener: function(listener) {
        this.stateListener = listener;
    }
}
//roomState == 1 --> dark hallway
//roomState == 2 --> light hallway
//roomState == 3 --> dusty keypad
//roomState == 4 --> keypad
//roomState == 5 --> final door
//roomState == 6 --> final door open
//roomState == 7 --> end screen

roomState_Storage={
    stateInternal: 1,
    statePrevious: 1,//stores the previous roomState for easier jumping back
    stateListener: function(val) {},
    set state(val) {
        if(this.stateInternal!=val){//if new value is same as old value, dont overwrite previous state
            this.statePrevious=this.stateInternal;
        }
        this.stateInternal = val;
        this.stateListener(val);
    },
    get state() {
        return this.stateInternal;
    },
    registerListener: function(listener) {
        this.stateListener = listener;
    }
}
//roomState == 1 --> Normal storage room with a note on the floor
//roomState == 2 --> Normal storage room with item bar
//roomState == 3 --> Normal storage room with 1 item on the item bar
//roomState == 4 --> Normal storage room with 2 items on the item bar
//roomState == 5 --> Normal storage room with 3 items on the item bar
//roomState == 6 --> Normal storage room with 4 items on the item bar
//roomState == 7 --> Normal storage room with drill obtained
//roomState == 8 --> Dark Storage Room and find drill hole
//roomState == 9 --> use drill
//roomState == 10 --> get key2
//roomState == 11 --> use key2
//roomState == 12 --> get to lab

roomState_Lab={
    stateInternal: 1,
    statePrevious: 1,//stores the previous roomState for easier jumping back
    stateListener: function(val) {},
    set state(val) {
        if(this.stateInternal!=val){//if new value is same as old value, dont overwrite previous state
            this.statePrevious=this.stateInternal;
        }
        this.stateInternal = val;
        this.stateListener(val);
    },
    get state() {
        return this.stateInternal;
    },
    registerListener: function(listener) {
        this.stateListener = listener;
    }
}
//roomState == 1 --> 
//roomState == 2 --> 
//roomState == 3 --> 
//roomState == 4 --> 
//roomState == 5 --> 
//roomState == 6 --> 
//roomState == 7 --> 
//roomState == 8 --> 

currentRoom={
    stateInternal: 1,
    stateListener: function(val) {},
    set state(val) {
        this.stateInternal = val;
        this.stateListener(val);
    },
    get state() {
        return this.stateInternal;
    },
    registerListener: function(listener) {
        this.stateListener = listener;
    }
}
//currentRoom == 1 --> Office
//currentRoom == 2 --> Hallway
//currentRoom == 3 --> Storage room
//currentRoom == 4 --> Lab room


flashlightState={
    flashlightInternal: 0,
    flashlightListener: function(val) {},
    set flashlight(val) {
        this.flashlightInternal = val;
        this.flashlightListener(val);
    },
    get flashlight() {
        return this.flashlightInternal;
    },
    registerListener: function(listener) {
        this.flashlightListener = listener;
    }

}
//flashlightState == 0 --> Off
//flashlightState == 1 --> On
//flashlightState == 2 --> UV






/*
This is the method responsible for the flashlight/ uv light, to activate it just set the flashLight state to On or UV 
*/
//flashlightState.flashlight = 1;

function overlay(e){
    if(flashlightState.flashlight != 0){


        if(overlayStopFlag==false){
            var relX = e.pageX - container.parentElement.offsetLeft;
            var relY = e.pageY - container.parentElement.offsetTop;
            var picHeight = 100;
            var picWidth = 100;


            hoverImg.style.left= relX-50+"px";
            hoverImg.style.top= relY-50+"px";
            hoverImg.style.backgroundPosition= (picWidth-relX-50) + "px " 
                + (picHeight-relY-50) + "px";
        }

    }

    //console.log("hover img left: "+hoverImg.style.left+" | hover img top: "+hoverImg.style.top+" | Hover img background position: "+hoverImg.style.backgroundPosition);

    /*
    var x = e.clientX;
    var y = e.clientY;
    var coor = "Coordinates: (" + x + "," + y + ")";
    */
}
/*
Prevents flashlight from going out of bounds
*/
function mouseOut(){

    overlayStopFlag=true;
}
function mouseIn(){
    overlayStopFlag=false;
}



function setMainImg( image,  map){

    mainImg.src= image;
    invisMainImg.src= image;
    mainImg.useMap= map;
    invisMainImg.useMap= map;
}

/*
    Flashlight state change listener
*/

flashlightState.registerListener(function(val) {

    if(val==0){
        hoverImg.style.opacity=0;
    }else if(val ==1){
        hoverImg.style.opacity=1;
        hoverImg.style.backgroundImage= roomLit;

    }else if(val ==2){
        hoverImg.style.opacity=1;
        hoverImg.style.backgroundImage= roomUV;
    }

});



/*
    This is the listener method, this is where the actual code/methods go on task state change, use methods where possible, dont dump walls of code in it
*/
taskState.registerListener(function(val) {
    //alert("Someone changed the value of tasktate.task to " + val);//demo, delete 

    switch(val){
        case 1:
            taskState_1();
            break;
        case 2:
            taskState_2();
            break;
        case 3:
            taskState_3();
            break;
        case 4:
            taskState_4();
            break;
        default:
    }

});

/*
    Office state tracker, methods go here for changing the room
*/
roomState_Office.registerListener(function(val) {
    //alert("Someone changed the value of roomState.state to " + val);//demo, delete 
    if(val==4 || val==6 || val==7){//needed to make sure random hide event doesn't trigger while a menu is open
        roomIsMenu=true;
    }else{roomIsMenu=false;}

    switch(val){
        case 1:
            OfficeRoomState_1();
            break;
        case 2:
            OfficeRoomState_2();
            break;
        case 3:
            OfficeRoomState_3();
            break;
        case 4:
            OfficeRoomState_4();
            break;
        case 5:
            OfficeRoomState_5();
            break;
        case 6:
            OfficeRoomState_6();
            break;
        case 7:
            OfficeRoomState_7();
            break;
        case 8:
            OfficeRoomState_8();
            break;
        default:
    }

});

roomState_Hallway.registerListener(function(val) {

    switch(val){
        case 1:
            HallwayRoomState_1();
            break;
        case 2:
            HallwayRoomState_2();
            break;
        case 3:
            HallwayRoomState_3();
            keypadSoundTranscript();
            break;
        case 4:
            HallwayRoomState_4();
            break;
        case 5:
            HallwayRoomState_5();
            break;
        case 6:
            HallwayRoomState_6();
            break;
        case 7:
            HallwayRoomState_7();
            break;
        default:
    }

});

roomState_Storage.registerListener(function(val) {
    //alert("Someone changed the value of roomState.state to " + val);//demo, delete 
    if(val==3 || val==4 || val==6){//needed to make sure random hide event doesn't trigger while a menu is open
        roomIsMenu=true;
    }else{roomIsMenu=false;}

    switch(val){
        case 1:
            StorageRoomState_1();
            break;
        case 2:
            StorageRoomState_2();
            break;
        case 3:
            StorageRoomState_3();
            break;
        case 4:
            StorageRoomState_4();
            break;
        case 5:
            StorageRoomState_5();
            break;
        case 6:
            StorageRoomState_6();
            break;
        case 7:
            StorageRoomState_7();
            break;
        case 8:
            StorageRoomState_8();
            break;
        case 9:
            StorageRoomState_9();
            break;
        case 10:
            StorageRoomState_10();
            break;
        case 11:
            StorageRoomState_11();
            break;
        case 12:
            StorageRoomState_12();
            break;
        default:
    }

});

roomState_Lab.registerListener(function(val) {
    //alert("Someone changed the value of roomState.state to " + val);//demo, delete 


    switch(val){
        case 1:
            LabRoomState_1();
            break;
        case 2:
            LabRoomState_2();
            break;
        case 3:
            LabRoomState_3();
            break;
        case 4:
            LabRoomState_4();
            break;
        case 5:
            LabRoomState_5();
            break;
        default:
    }

});


/*
    When room is changed, call to your current room state and load UV, LIT version and hide map of your room to the global variables
*/
currentRoom.registerListener(function(val) {
    //alert("Someone changed the value of currentRoom.state to " + val);//demo, delete 

    switch(val){
        case 1:
            currentRoom_1();
            break;
        case 2:
            currentRoom_2()
            break;
        case 3:
            currentRoom_3();
            break;
        case 4:
            currentRoom_4();
            break;

            currentRoom_1();
        default:
    }

});


var hideFlag=false;

/*
    Timer
*/

function startTimer(duration,display) {
    var hideTrigger = randomIntFromInterval(11,30);
    var timer = duration, minutes, seconds;
    return setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        if(hideTrigger==seconds && hideFlag==false && roomIsMenu==false){
            hideEvent();
            hideTrigger= randomIntFromInterval(11,50);
        }
        display.textContent = minutes + ":" + seconds;

        if (--timer < 0 ) {//game over, time limit reached
            timer = duration;
            gameOver();
        }
    }, 1000);
}

function gameOver(){
    if (gameIsOver == false){
    setMainImg(hallway_Death_Screen,hallway_Death_Screen_Map);
    var timer = document.getElementById("countdown");
    hideEventOverlay.style.display = "none";
    timer.style.display = "none";
    hideFlag = false;
    roomIsMenu = true;
    }
}

function deathScreenClick(e){
    e.preventDefault();
    location.reload();
}

//by storing the timer in a global variable, the timer can later be aborted by referencing this variable as follows: clearInterval(hideInterval);
var hideInterval;

function hideEvent(){
    hideFlag=true;//set the hideflag to true to signal begin of hide and disable triggering another hide event in main timer
    mainImg.useMap= hideMap;//set the map of the current room to hide map, regardless of state, this may need change
    invisMainImg.useMap =hideMap;
    hideEventOverlay.style.opacity=1; //make hide alert div overlay visible
    var duration = 10;
    var display = document.querySelector('#hide-time');
    hideInterval = startTimer(duration,display); // start the 10sec countdown for the hide event

}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
} 

//random number generator
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
