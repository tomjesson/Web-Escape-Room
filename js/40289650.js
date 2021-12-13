// Variables created to store background images.
var hallway_Normal = "images/Hallway/hallway_normal.png";
var hallway_Dark = "images/Hallway/hallway_dark.png";
var hallway_Torch = "images/Hallway/hallway_flashlight.png";
var hallway_UV = "images/Hallway/hallway_UV";
var hallway_Final_Door = "images/Hallway/final_door.png";
var hallway_Final_Door_Open = "images/Hallway/final_door_open.png";
var hallway_Keypad = "images/Hallway/keypad.png";
var hallway_End_Screen = "images/Hallway/end_screen.PNG";
var hallway_Keypad_Dust = "images/Hallway/keypad_dust.png";
var hallway_Death_Screen = "images/Hallway/death_screen.PNG";

//Variables created to store the maps for the rooms (buttons)
var hallway_Dark_map = "#hallway-dark-map";
var hallway_Normal_map = "#hallway-normal-map";
var hallway_Hide_map = "#hallway-hide-map";
var hallway_Keypad_map = "#hallway-keypad-map";
var hallway_Keypad_Dust_map = "#hallway-keypad-dust-map";
var hallway_Final_Door_map = "#hallway-final-door-map";
var hallway_Death_Screen_Map = "#death-screen-map";

//Variables created to store the sounds for the rooms
var keypad_good_sound = new sound("sounds/Hallway/keypad_good.wav");
var keypad_click_sound = new sound("sounds/Hallway/keypad_click.wav");
var keypad_bad_sound = new sound("sounds/Hallway/keypad_bad.wav");
var door_open_sound = new sound("sounds/Hallway/door_open.wav");
var air_vent_open_sound = new sound("sounds/Hallway/air_vent_open.mp3");
var door_creek_sound = new sound("sounds/Hallway/door_creek.wav");
var light_switch_sound = new sound("sounds/Hallway/light_switch.wav");
var padlock_open_sound = new sound("sounds/Hallway/padlock_open.wav");
var padlock_rattle_sound = new sound("sounds/Hallway/padlock_rattle.ogg");
var endSound = new sound("sounds/Hallway/endscreen.ogg");

//Stores the user input for hallway keypad
var keypadInput = "";
var keypadComplete = false; //bool to check if keypad puzzle is done
var keypadDust = true;
var gameIsOver = false;

var minute1, second1;
var minute2, second2;
var minute3, second3;

//bools to store and see if keypad has been unlocked.
var hallwayPadlock1Locked = true; 
var hallwayPadlock2Locked = true;
var hallwayPadlock3Locked = true;

var threshold = 100; //max mic threshold

function HallwayRoomState_1(){ //Dark Hallway
    setMainImg(hallway_Dark,hallway_Dark_map);
    roomIsMenu = true;
}

function HallwayRoomState_2(){ //Normal bright hallway
    setMainImg(hallway_Normal,hallway_Normal_map);
    roomIsMenu = false;
}

function HallwayRoomState_3(){
    setMainImg(hallway_Keypad_Dust,hallway_Keypad_Dust_map);
    roomIsMenu = true;

    checkMicrophone();
}

function HallwayRoomState_4(){ //Keypad puzzle
    setMainImg(hallway_Keypad,hallway_Keypad_map);
    roomState_Hallway.statePrevious = 2;
    roomIsMenu = true;
}

function HallwayRoomState_5(){ //Hallway Final Door 
    setMainImg(hallway_Final_Door,hallway_Final_Door_map);
    roomIsMenu = true;
    gameIsOver = true;
}

function HallwayRoomState_6(){ //Hallway Final Door Complete (Game Over)
    door_creek_sound.play();
    setMainImg(hallway_Final_Door_Open,null);   
    roomIsMenu = true;
    clearInterval(hideInterval)
    setTimeout(function(){roomState_Hallway.state = 7;}, 4000);
}

function HallwayRoomState_7(){ //End Screen
    setMainImg(hallway_End_Screen, null)
    roomIsMenu = true; 
    var timer = document.getElementById("countdown");
    timer.style.display = "none";
    hideFlag = false;
    stop();  

    second1 = pad(second1);
    second2 = pad(second2);
    second3 = pad(second3);

    document.getElementById("end-screen-stats").textContent="Time taken: " + minute + ":" + second + "\r\nTime for key #1: " + minute1 + ":" + second1 + "\r\nTime for key #2: " + minute2 + ":" + second2 + "\r\nTime for key #3: " + minute3 + ":" + second3;
    endSound.play();
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function hallwayLightSwitchClick(e,id){ //Light switch click event
    e.preventDefault();
    light_switch_sound.play(); //Make click sound
    if (id == "hallway-dark-light-switch") //If statement to check what previos room was (bright or dark)
    {
        if(roomState_Hallway.statePrevious == 0){ //if first time going into room
            roomState_Hallway.state = 2; //make room light
        }
        else{
            roomState_Hallway.state = roomState_Hallway.statePrevious;
        }

    }
    else if (id == "hallway-normal-light-switch")
    {
        roomState_Hallway.state = 1; //mark room dark
    }
}

function hallwayKeypadClick(e){ //If key pad was clicked.
    e.preventDefault();
    if(keypadDust == true){
        roomState_Hallway.state = 3;
    }
    else{
        roomState_Hallway.state = 4;
    }

}

function hallwayKeypadCompareCode(){ //Keypad input checker
    if(keypadInput=="3724"){ //If keypad code is correct
        roomState_Hallway.state=2; //Take user back to normal hallway
        keypadComplete = true; //Let code know the puzzle is complete
        keypad_good_sound.play(); //play according sound
        keypadInput = ""; //reset code
    }else{keypadInput=""; //If user got code wrong, reset
          keypad_bad_sound.play();} //play according sound
}

function hallwayKeypadMenuClick(e){ //When user clicks on a key on keypad
    e.preventDefault();
    keypad_click_sound.play();
    if(e.target.id.includes("1")==true){ //If they press 1
        keypadInput= keypadInput+"1"; // Add 1 to the code variable.
    }
    if(e.target.id.includes("2")==true){
        keypadInput= keypadInput+"2";
    }
    if(e.target.id.includes("3")==true){
        keypadInput= keypadInput+"3";
    }
    if(e.target.id.includes("4")==true){
        keypadInput= keypadInput+"4";
    }
    if(e.target.id.includes("5")==true){
        keypadInput= keypadInput+"5";
    }
    if(e.target.id.includes("6")==true){
        keypadInput= keypadInput+"6";
    }
    if(e.target.id.includes("7")==true){
        keypadInput= keypadInput+"7";
    }
    if(e.target.id.includes("8")==true){
        keypadInput= keypadInput+"8";
    }
    if(e.target.id.includes("9")==true){
        keypadInput= keypadInput+"9";
    }
    if(e.target.id.includes("0")==true){
        keypadInput= keypadInput+"0";        
    }
    if(e.target.id.includes("clear")==true){ //if the press the x to clear, it resets the keypad code input
        keypadInput="";

    }
    if(e.target.id.includes("enter")==true){ //if they press enter, it checks the code using function above this one.
        hallwayKeypadCompareCode();
    }
    if(e.target.id.includes("back-arrow")==true){ //if they click back arrow then take them back to the normal hallway.
        roomState_Hallway.state= roomState_Hallway.statePrevious;
        keypadInput="";
    }
}
function hallwayStorageDoorClick(e){ //Click event for Storage room. @Lin / Vania Please edit this for you room.
    e.preventDefault();
    if(keypadComplete == true)
    {
        door_open_sound.play();
        currentRoom.state=3;
    }
    else{
        alert("Door is locked...");
    }
}

function hallwayLabratoryDoorClick(e){ //Click event for Labaratory room. @Tom please edit this for your room.
    e.preventDefault();
    if(drillObtained == true)
    {
        door_open_sound.play();
        currentRoom.state=4;
    }
    else{
        alert("Door seems jammed, I need a tool to open it.");
    }
}

function hallwayFinalDoorClick(e){ //Final door Click event
    e.preventDefault();
    roomState_Hallway.state = 5; 
}

function hallwayFinalDoorLockpadClick(e){ //Final door padlock click event.
    e.preventDefault();
    if(e.target.id.includes("1")==true){ //If padlock one is clicked
        if(hallwayPadlock1Locked == true){ //If padlock is still locked
            if(key1Obtained == true) //If user has the key
            {
                hallwayPadlock1Locked = false; //Unlock the padlock
                padlock_open_sound.play();
            }
            else{ //If user doesn't have the key
                padlock_rattle_sound.play();  
                alert("I need to find a key for this..."); //display message saying a key is needed.
            }
        }
        else{ //if padlock already unlocked
            alert("Padlock is already unlocked.") //display message saying a key is needed
        }
    }

    if(e.target.id.includes("2")==true){ //If padlock two is clicked
        if(hallwayPadlock2Locked == true){
            if(key2Obtained == true)
            {
                hallwayPadlock2Locked = false;
                padlock_open_sound.play();
            }
            else{
                padlock_rattle_sound.play();
                alert("I need to find a key for this...");
            }
        }
        else{
            alert("Padlock is already unlocked.")
        }
    }

    if(e.target.id.includes("3")==true){ //If padlock two is clicked
        if(hallwayPadlock3Locked == true){
            if(key3Obtained == true)
            {
                hallwayPadlock3Locked = false;
                padlock_open_sound.play();
            }
            else{
                padlock_rattle_sound.play();
                alert("I need to find a key for this...");
            }
        }
        else{
            alert("Padlock is already unlocked.")
        }
    }

    hallwayPadlockCheck(); //checks if all three padlocks are unlocked
}

function hallwayPadlockCheck(){ //check to see if all padlocks are unlocked.
    if(hallwayPadlock1Locked == false && hallwayPadlock2Locked == false && hallwayPadlock3Locked == false){
        roomState_Hallway.state = 6;
    }
}

function hallwayBackArrowClick(e){ //back arrow to go back to security room.
    e.preventDefault();
    keypad_click_sound.play();
    currentRoom.state = 1;
}

function checkMicrophone(){
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

    if (navigator.getUserMedia) {
        navigator.getUserMedia({
            audio: true
        },

                               function(stream) {
            var audioContext = new AudioContext();
            var analyser = audioContext.createAnalyser();
            var microphone = audioContext.createMediaStreamSource(stream);
            var javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

            analyser.smoothingTimeConstant = 0.8;
            analyser.fftSize = 1024;

            microphone.connect(analyser);
            analyser.connect(javascriptNode);
            javascriptNode.connect(audioContext.destination);

            javascriptNode.onaudioprocess = function() {
                var array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);
                var values = 0;

                var length = array.length;
                for (var i = 0; i < length; i++) {
                    values += (array[i]);
                }

                var average = Math.round(values / length);

                // console.log(Math.round(average));

                if (average > threshold) {
                    roomState_Hallway.state = 4;
                    keypadDust = false;
                    microphone.disconnect();
                }
            };
        },
                               function(err) {
            alert("Error");
        });
    } else {
        alert("Error, media not supported.");
    }
}

function currentRoom_2(){
    roomLit= "url(images/Hallway/hallway_flashlight.png)";
    roomUV = "url(images/Hallway/hallway_UV.png)";
    hideMap = "#hallway-hide-map";
    roomState_Hallway.state= roomState_Hallway.state;
}