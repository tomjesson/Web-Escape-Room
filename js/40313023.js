// images
var storageRoom_WithNote = "images/Storage/StorageNormal_WithNote.png";
var noteImage = "images/Storage/Note.jpg";
var storageRoom_WithNoItem = "images/Storage/StorageNormalZeroItem.png";
var storageRoom_WithOneItem = "images/Storage/StorageNormal1ItemDynamo.png";
var storageRoom_WithTwoItems = "images/Storage/StorageNormal_With2Items.png";
var storageRoom_WithThreeItems = "images/Storage/StorageNormal_With3Items.png";
var storageRoom_WithAllItems = "images/Storage/StorageNormal_WithAllItems.png"; 
var storageRoom_DrillObtained = "images/Storage/StorageDrill.png"

// maps
var storage_note_map = "#storage-intro-map";
var storage_items_map = "#storage-items-map";

// item
var drill = document.getElementById("item3");

// audio 
var audio = new sound("sounds/Storage/Storage.mp3");

// audio transcript
var intro_soundTranscript = new sound("sounds/Transcript/soundTranscript_1.m4a");
var tip1_soundTranscript = new sound("sounds/Transcript/soundTranscript_2.m4a");
var tip2_soundTranscript = new sound("sounds/Transcript/soundTranscript_3.m4a");
var tip3_soundTranscript = new sound("sounds/Transcript/soundTranscript_4.m4a");
var dustyKeypad_soundTranscript = new sound("sounds/Transcript/soundTranscript_5.m4a");
var note_soundTranscript = new sound("sounds/Transcript/soundTranscript_6.m4a");

//roomState == 1 --> Normal storage room with a note on the floor
function StorageRoomState_1(){
    setMainImg(storageRoom_WithNote,storage_note_map);
}
//roomState == 2 --> Normal storage room with item bar
function StorageRoomState_2(){
    setMainImg(storageRoom_WithNoItem,storage_items_map);
}
//roomState == 3 --> Normal storage room with 1 item on the item bar
function StorageRoomState_3(){
    setMainImg(storageRoom_WithOneItem,storage_items_map);
    item1Obtained = true;
}
//roomState == 4 --> Normal storage room with 2 items on the item bar
function StorageRoomState_4(){
    setMainImg(storageRoom_WithTwoItems,storage_items_map);
    item2Obtained = true;
}
//roomState == 5 --> Normal storage room with 3 items on the item bar
function StorageRoomState_5(){
    setMainImg(storageRoom_WithThreeItems,storage_items_map);
    item3Obtained = true;
}
//roomState == 6 --> Normal storage room with 4 items on the item bar
function StorageRoomState_6(){
    setMainImg(storageRoom_WithAllItems,storage_items_map);
    roomState_Storage.state = roomState_Storage.state+1;
}
//roomState == 7 --> Normal storage room with drill obtained
function StorageRoomState_7(){
    setMainImg(storageRoom_DrillObtained,storage_items_map);
    drillObtained = true;
    drill.style.opacity = 1;
    setTimeout(function(){roomState_Storage.state = 8;}, 4000);
}
//roomState == 8 --> lin's first roomState
//... lin's other roomStates

function currentRoom_3(){
    roomLit = "url(images/Storage/StorageNormal.jpg)";
    roomUV = "url(images/Storage/StorageUV.jpg)";
    hideMap = "#storage-hide-map";
    roomState_Storage.state = roomState_Storage.state;
}

function storageNoteClick(e){
    e.preventDefault();
    setMainImg(noteImage,storage_note_map);
    noteSoundTranscript();
    //roomIsMenu=true;
}
function storageItemOneClick(e){
    e.preventDefault();
    if(item1Obtained==false){
        roomState_Storage.state = roomState_Storage.state+1;
    }
}
function storageItemTwoClick(e){
    e.preventDefault();
    if(item1Obtained == true && item2Obtained == false){
        roomState_Storage.state = roomState_Storage.state+1;
    } else {
        alert("Correct item but wrong item order");
        roomState_Storage.state = roomState_Storage.state;
    }
}
function storageItemThreeClick(e){
    e.preventDefault();
    if(item1Obtained == true && item2Obtained == true && item3Obtained == false){
        roomState_Storage.state = roomState_Storage.state+1;
    } else {
        alert("Correct item but wrong item order");
        roomState_Storage.state = roomState_Storage.state;

    }
}
function storageItemFourClick(e){
    e.preventDefault();
    if(item1Obtained == true && item2Obtained == true && item3Obtained == true){
        roomState_Storage.state = roomState_Storage.state+1;
    } else {
        alert("Correct item but wrong item order");
        roomState_Storage.state = roomState_Storage.state;
    }
}
function storageUnusedItemsClick(e){
    e.preventDefault();
    alert("Wrong item");
    roomState_Storage.state = roomState_Storage.state;
}
function storageNoteExitClick(e){
    e.preventDefault();
    note_soundTranscript.stop();
    roomState_Storage.state = roomState_Storage.state+1;
}
/*
    audio transcript
*/
// office
function introSoundTranscript(){
    intro_soundTranscript.play();
}
function tip1SoundTranscript(){
    tip1_soundTranscript.play();
}
function tip2SoundTranscript(){
    tip2_soundTranscript.play();
}
function tip3SoundTranscript(){
    tip3_soundTranscript.play();
}
// hallway
function keypadSoundTranscript(){
    dustyKeypad_soundTranscript.play();
}
// storage
function noteSoundTranscript(){
    note_soundTranscript.play();
}

