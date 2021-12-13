var securityOffice_WithNoBlood = "images/Office/SecurityOfficeSceneNoBlood.png";
var securityOffice_Dark="images/Office/SecurityOfficeSceneNightPNG1.png";
var securityOffice_FuseAcquired="images/Office/Fuse-acquired.gif";
var securityOffice_FuseBoxOpen="images/Office/SecurityOfficeSceneNightPNG1-fusebox-open.png";
var securityOffice_FuseBoxOpenFusePlaced="images/Office/SecurityOfficeSceneNightPNG1-fusebox-open-fuse-placed.png";
var securityOffice_FusePlaced="images/Office/fuse-placed.gif";
var securityOffice_WithBlood="images/Office/SecurityOfficeScenePNG1.png";
var securityOffice_Safe_Open="images/Office/SecurityOfficeScene-safe.png";
var securityOffice_Safe_Failed="images/Office/Safe-failed.gif";
var securityOffice_Safe_Succes="images/Office/Safe-success.gif";
var securityOffice_WithExit="images/Office/SecurityOfficeScenePNG1WithArrow.png";

var securityOffice_map="#secruity-office-map";
var securityOffice_Fusebox_map="#secruity-office-fuse-map";
var securityOffice_Safe_map="#secruity-office-safe-map";
var securityOffice_Monitor_map="#secruity-office-monitor-map";

var safeUserInput="";
var safeTryLimit= 3;

var key1= document.getElementById("item2");
var fuse = document.getElementById("item1");
var officeSafeDiv= document.getElementById("safe-div");

//Normal office
function OfficeRoomState_1(){
    endSound.stop();
    setMainImg(securityOffice_WithNoBlood,securityOffice_map);
}

//lights out/ dark
function OfficeRoomState_2(){
    setMainImg(securityOffice_Dark,securityOffice_map);
    document.getElementById("office-lost-fuse").coords="215,16,213,30,232,31,233,16";
    taskState.task=2;
}

//new fuse gained
function OfficeRoomState_3(){
    flashlightState.flashlight = 0;
    setMainImg(securityOffice_FuseAcquired,securityOffice_map);
    securityOffice_FuseAcquired= securityOffice_Dark;
    roomLit= "url(images/Office/SecurityOfficeSceneLIT-fuse-taken.png)"
    fuseObtained=true;
    fuse.style.opacity=1;

}

//fusebox open
function OfficeRoomState_4(){
    flashlightState.flashlight=0;
    if(roomState_Office.statePrevious>4){
        setMainImg(securityOffice_FuseBoxOpenFusePlaced,securityOffice_Fusebox_map);
    }else{
        setMainImg(securityOffice_FuseBoxOpen,securityOffice_Fusebox_map);
    }
}

//fusebox fixed --> normal office with blood
function OfficeRoomState_5(){
    setMainImg(securityOffice_FusePlaced,securityOffice_map);
    securityOffice_FusePlaced= securityOffice_WithBlood;
    taskState.task=3;

}

//safe menu open
function OfficeRoomState_6(){
    flashlightState.flashlight=0;
    setMainImg(securityOffice_Safe_Open,securityOffice_Safe_map);
    officeSafeDiv.style.opacity=1;
    document.querySelector("#safe-tries").textContent= safeTryLimit;

}

//safe menu failed
function OfficeRoomState_7(){
    setMainImg(securityOffice_Safe_Failed,securityOffice_Safe_map);

    if(safeTryLimit>1){
        safeTryLimit--;
        document.querySelector("#safe-tries").textContent= safeTryLimit;
    }else{
        gameOver();
        officeSafeDiv.style.opacity=0;
    }
}

//safe menu success -> normal office with exit arrow
function OfficeRoomState_8(){
    officeSafeDiv.style.opacity=0;
    setMainImg(securityOffice_Safe_Succes,securityOffice_map);
    securityOffice_Safe_Succes= securityOffice_WithExit;
    key1.style.opacity=1;//show key in toolbar
    taskState.task= 4;
    document.getElementById("office-escape-arrow").coords="498,542,568,542,564,572,507,576"; //enable escape arrow area
    document.getElementById("office-safe").coords="0"; //remove safe from clickable
    key1Obtained=true;
    minute1 = minute;
    second1 = second;
}

function currentRoom_1(){
    roomLit= "url(images/Office/SecurityOfficeSceneLITPNG1.png)";
    roomUV = "url(images/Office/SecurityOfficeSceneUVLightPNG1.png)";
    hideMap = "#secruity-office-hide-map";
    roomState_Office.state= roomState_Office.state;
}

/*
    Hide method | for the sake of simplicity, the first hide place is always the correct on
*/
function hideEventClick(e,id){
    e.preventDefault();
    if (id.includes("hallway")){
        air_vent_open_sound.play();
    }
    if(id.includes("1")){
        alert("Good!");
        clearInterval(hideInterval);// by storing the interval in a variable, we can delete that interval using that variable
        hideEventOverlay.style.opacity=0;
        currentRoom.state= currentRoom.state;
        hideFlag=false;
    }else{
        gameOver();
        hideEventOverlay.style.opacity=0;
        clearInterval(hideInterval);
        hideFlag=false;
    }

}

/*
    I could display the numbers of the safe using a div that is otherwise invisible at the empty space at the bottom of the key pad // optional 
*/

function taskState_1(){
    monitorImage="images/Office/monitor-Introduction.png";
}
function taskState_2(){
    monitorImage="images/Office/monitor-tip1.png";
}
function taskState_3(){
    monitorImage="images/Office/monitor-tip2.png";
}
function taskState_4(){
    monitorImage="images/Office/monitor-tip3.png";
}

/*
    Toolbar click events
*/

function flashlightClick(e){
    if(flashlightState.flashlight<2){
        flashlightState.flashlight++;
    }else{
        flashlightState.flashlight=0;
    }

}

/*
    Security office click methods
*/
function officeMonitorClick(e){
    e.preventDefault();
    roomIsMenu=true;
    reset();
    start();
    setMainImg(monitorImage,securityOffice_Monitor_map);
    // audio transcript ----------------
    if (taskState.taskInternal == 1){
        introSoundTranscript();
    } else if(taskState.taskInternal == 2){
        tip1SoundTranscript();
    } else if(taskState.taskInternal == 3){
        tip2SoundTranscript();
    } else if(taskState.taskInternal == 4){
        tip3SoundTranscript();
    }
    //-----------------------------------
    //-----------------------------------------------------------------
    var check2 = (main_img.src).indexOf("monitor-Introduction.png");
    if (check2 !== -1) {
        document.getElementById("name-form").style.zIndex = 5;
    } 
    //-----------------------------------------------------------------
    
}

function officeFuseboxClick(e){
    e.preventDefault();

    if(roomState_Office.state>1){
        roomState_Office.state=4;
    }
}

function officeLostFuseClick(e){
    e.preventDefault();
    if(flashlightState.flashlight==1){
        e.target.coords="0"; //remove fuse to be unclickable
        roomState_Office.state=3;
    } 
}

function officeSafeClick(e){
    e.preventDefault();
    if(roomState_Office.state>4){
        roomState_Office.state=6;
    }

}

function officeExitArrowClick(e){
    e.preventDefault();
    currentRoom.state=2;
}


/*
    Monitor click methods
*/

function officeMonitorExitClick(e){
    e.preventDefault();
    if(roomState_Office.state!=1){
        roomState_Office.state= roomState_Office.state;
    }else{
        //---------------------------------------------------------------------
        //roomState_Office.state=2;
        //---------------------------------------------------------------------
    }
    // audio transcript ----------------
    if(taskState.taskInternal == 2){
        tip1_soundTranscript.stop();
    } else if(taskState.taskInternal == 3){
        tip2_soundTranscript.stop();
    } else if(taskState.taskInternal == 4){
        tip3_soundTranscript.stop();
    }
    //----------------------------------
    roomIsMenu=false;
}



/*
    Fusebox click methods
*/
function officeFuseboxFuseClick(e){
    e.preventDefault();
    if(fuseObtained==true&& roomState_Office.state<5){
        roomState_Office.state=5;
        

    }
}

function officeFuseboxExitClick(e){
    e.preventDefault();
    roomState_Office.state= roomState_Office.statePrevious;
}


/*
    Safe click methods
*/

function officeSafeCompareCode(){
    if(safeUserInput=="9167"){
        roomState_Office.state=8;
    }else{ roomState_Office.state=7; safeUserInput="";}
}

function officeSafeMenuClick(e){
    e.preventDefault();

    if(e.target.id.includes("1")==true){
        if(safeUserInput.length<3){
            safeUserInput= safeUserInput+"1";
        }
        else{
            safeUserInput= safeUserInput+"1";
            officeSafeCompareCode();
        }
    } 
    else if(e.target.id.includes("2")==true){
        if(safeUserInput.length<3){
            safeUserInput= safeUserInput+"2";
        }
        else{
            safeUserInput= safeUserInput+"2";
            officeSafeCompareCode();
        }
    }
    else if(e.target.id.includes("3")==true){
        if(safeUserInput.length<3){
            safeUserInput= safeUserInput+"3";
        }
        else{
            safeUserInput= safeUserInput+"3";
            officeSafeCompareCode();
        }
    }
    else if(e.target.id.includes("4")==true){
        if(safeUserInput.length<3){
            safeUserInput= safeUserInput+"4";
        }
        else{
            safeUserInput= safeUserInput+"4";
            officeSafeCompareCode();
        }
    }
    else if(e.target.id.includes("5")==true){
        if(safeUserInput.length<3){
            safeUserInput= safeUserInput+"5";
        }
        else{
            safeUserInput= safeUserInput+"5";
            officeSafeCompareCode();
        }
    }
    else if(e.target.id.includes("6")==true){
        if(safeUserInput.length<3){
            safeUserInput= safeUserInput+"6";
        }
        else{
            safeUserInput= safeUserInput+"6";
            officeSafeCompareCode();
        }
    }
    else if(e.target.id.includes("7")==true){
        if(safeUserInput.length<3){
            safeUserInput= safeUserInput+"7";
        }
        else{
            safeUserInput= safeUserInput+"7";
            officeSafeCompareCode();
        }
    }
    else if(e.target.id.includes("8")==true){
        if(safeUserInput.length<3){
            safeUserInput= safeUserInput+"8";
        }
        else{
            safeUserInput= safeUserInput+"8";
            officeSafeCompareCode();
        }
    }
    else if(e.target.id.includes("9")==true){
        if(safeUserInput.length<3){
            safeUserInput= safeUserInput+"9";
        }
        else{
            safeUserInput= safeUserInput+"9";
            officeSafeCompareCode();
        }
    }
    else if(e.target.id.includes("0")==true){
        if(safeUserInput.length<3){
            safeUserInput= safeUserInput+"0";
        }
        else{
            safeUserInput= safeUserInput+"0";
            officeSafeCompareCode();
        }
    }
    else if(e.target.id.includes("wipe")==true){
        safeUserInput="";
    }
    else if(e.target.id.includes("exit")==true){
        if(roomState_Office.state==7){
            officeSafeDiv.style.opacity=0;
            roomState_Office.state=5;
        }else{
            roomState_Office.state= roomState_Office.statePrevious;
        } 
    }
    document.querySelector("#safe-input").textContent= safeUserInput;
}
