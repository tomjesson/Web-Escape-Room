var storageRoom_Normal = "images/Storage/StorageNormal.jpg";
var storageRoom_Dark = "images/Storage/StorageDark.jpg";
var storageRoom_Normal = "images/Storage/StorageNormal.jpg";
var storageRoom_Exit = "images/Storage/StorageWithArrow.jpg";
var storageRoom_Horror = "images/Storage/StorageHorror.jpg";
var storageRoom_UseDrill = "images/Storage/StorageUseDrill.jpg";
var storageRoom_UseKey = "images/Storage/StorageUseKey.jpg";
var storageRoom_GetDrill = "images/Storage/StorageDrill.jpg";
var storageRoom_GetKey2 = "images/Storage/StorageGetKey2.gif";
var storageRoom_Escape = "images/Storage/StorageWithArrow.gif";

var storageRoom_map = "#storage-map";
var storageRoom_UseDrill_map = "#storage-useDrill-map"
var storageRoom_UseKey_map = "#storage-useKey-map";

var audio = new sound("sounds/Storage/Storage.mp3");

var key2 = document.getElementById("item4");


//timer for get key2
var minute, second;


//dark and find the drill hole
function StorageRoomState_8(){
    setMainImg(storageRoom_Dark, storageRoom_map);
    document.getElementById("storage-findDrillHole").coords="518,510,568,510,573,544,517,544";
    audio.play();
    // if(flashlightState.flashlight == 2){
    //     document.getElementById("storage-findDrillHole").coords="518,510,568,510,573,544,517,544";
    // }
}

//use drill
function StorageRoomState_9(){
    flashlightState.flashlight = 0;
    // if(drillObtained == true){
    //     roomState_Storage.state = 4;
    // } else {
    //     roomState_Storage.state = 3;
    //     alert("Create drill first");
    // }
    setMainImg(storageRoom_UseDrill, storageRoom_UseDrill_map);
    roomIsMenu = true;
}

//get key2
function StorageRoomState_10(){
    flashlightState.flashlight = 0;
    setMainImg(storageRoom_GetKey2, storageRoom_UseKey_map);
    // storageRoom_GetKey2 = storageRoom_UseKey;
    key2Obtained = true;
    key2.style.opacity = 1;
    roomIsMenu = true;
}

//use key2
function StorageRoomState_11(){
    flashlightState.flashlight = 0;
    setMainImg(storageRoom_GetKey2, storageRoom_UseKey_map);
    // storageRoom_GetKey2 = storageRoom_UseKey;
    // taskState.task = 7;
    roomIsMenu = true;
}

//normal storage room with exit arrow
function StorageRoomState_12(){
    setMainImg(storageRoom_Escape, storageRoom_map);
    // storageRoom_Escape = storageRoom_Exit;
    key2Obtained = true;
    minute2 = minute;
    second2 = second;
    key2.style.opacity = 1;

    document.getElementById("storage-escape-arrow").coords="502,546,563,546,563,578,502,578";

}

function currentRoom_3(){
    roomUV = "url(images/Storage/StorageUV.jpg";
    roomLit = "url(images/Storage/StorageTorch.jpg"
    hideMap = "#storage-hide-map"
    roomState_Storage.state = roomState_Storage.state;

}

/*
    ToolBar Clickable
*/
function flashlightClick(e){
    if(flashlightState.flashlight<2){
        flashlightState.flashlight++;
    }else{
        flashlightState.flashlight=0;
    }

}

/*
    Storage room click method
*/
function storageFindDrillHole(e){
    e.preventDefault();
    // roomState_Storage.state = 2;
    if(flashlightState.flashlight == 2){
        roomState_Storage.state = 9;
    } else {
        roomState_Storage.state = 8;
    }
}

function storageExitArrowClick(e){
    e.preventDefault();
    currentRoom.state = 2;
    roomState_Hallway.state = 2;
    audio.stop();
}

function storageUseDrillClick(e){
    e.preventDefault();
    if(drillObtained == true){
        roomState_Storage.state = 10;
    } else {
        roomState_Storage.state = 9;
        alert("Create drill first");
    }
}

function drillHoleExit(e){
    e.preventDefault();
    roomState_Storage.state = roomState_Storage.statePrevious;
}

function keyHoleExit(e){
    e.preventDefault();
    roomState_Storage.state = roomState_Storage.statePrevious;
}

function storageUseKeyClick(e){
    e.preventDefault();
    roomState_Storage.state = 12;
}


//timer
minute = second = 0;
var int;

function reset(){
    window.clearInterval(int);
    hour = minute = second = 0;
    // document.getElementById('timeForKey2').value = '0M 0S';
}

function start(){
    int = setInterval(timer, 1000);
}

function timer(){
    second++;
    if(second > 59){
        minute++;
        second = 0;
    }
    // document.getElementById('timeForKey2').value = ' M ' + minute + ' S ' + second;
}

function stop(){
    window.clearInterval(int);
}

function timerForKey2(){
    if(currentRoom_3){
        start();
    }
    if(key2Obtained == true){
        stop();
    }
}
