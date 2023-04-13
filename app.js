// MY VARIABLES

var song = new Audio('https://audio-previews.elements.envatousercontent.com/files/295283998/preview.mp3?response-content-disposition=attachment;+filename="K44XEWK-alarm-fire-alarm-buzzer-01.mp3"')
song.loop = true
// song.play()

//SELECTING HTML ELEMENTS
const clock = document.getElementById('clock')

const lists = document.getElementById('lists')
const alarmArray = []
const setAlarm = document.getElementById('setAlarm')

function stop(){
    let count = 0
    song.pause();
    
    console.log(play)
    if(play){
        alert("alarm stopped")
    }
    
   
}
function ringing(msg){
    
    // song.load();
    song.play();
    callSetTimeout(msg)
    var play = true;
}

function callSetTimeout(ringer){
   
    setTimeout(function alertFunction(){
    // console.log('timout'+ringer)
    alert("Alarm at "+ringer)
},2000)
}

//THIS IS THE FUNCTION WHICH UPDATES THE TIME EVERY SECOND
function updateClock() {

    const today = new Date();
    const hour = formatTime(today.getHours());
    const min = formatTime(today.getMinutes());
    const sec = formatTime(today.getSeconds());
    const now = `${hour}:${min}:${sec}`;

    // clock.innerText=`${hour}:${minutes}:${seconds}`;
    clock.innerHTML = now
    // console.log(now)

    //WE HAVE TO CHECK IF THE CURRENT TIME (now) IS PRESENT IN THE 
    //ALARMLIST IF YES THEN WE HAVE TO START RINGING

    if(alarmArray.includes(now)){
        ringing(now);
        // console.log('upadteclo'+now)
    }
}

//THIS FUNCTION WILL ADD 0 INFRONT OF SINGLE DIGIT TIME (1:6:2 = 01:06:02)
function formatTime(time) {
    if ( time < 10 && time.length != 2) {
        return '0' + time;
    }
    return time;
}
function updateCalender(){
    var today = new Date();//Date function
    //Week Day
    var weeks = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const week = weeks[today.getDay()]
    document.getElementById('dayName').innerHTML= week

    //date
    const day = today.getDate()
    document.getElementById('dayNum').innerHTML = day

    // console.log(week)
    
    // console.log(year)
    
    //Month
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const month = months[today.getMonth()]
    document.getElementById('month').innerHTML = month
    
    

    //Year
    const year = today.getFullYear()
    let displayYear = document.getElementById('year')
    // console.log(displayYear)
    displayYear.innerHTML= year
}
// function deleteAlarm(){
    
// }

//FOR DELETEING THE UPCOMING ALARM FROM LIST
lists.addEventListener('click', e=> {
    
    console.log(e.target) //<li>
    //console.log(e.target.className) //"deleteButton"
    console.log(e.target.classList) //gives DOMtoken list - collection of class attributes
    
    if(e.target.classList.contains("deleteButton")){
        
        e.target.parentElement.remove();  //removes the parent li
    }    
})
// REMOVING THE ALARM FROM ARRAY 
function remove(value){
    let newList = alarmArray.filter((time) => time != value);
    alarmArray.length = 0;         
    alarmArray.push.apply(alarmArray, newList);
    
    console.log("newList", newList);
    console.log("alarmArray", lists);
}
//display alarm in unordered-list
function displayAlarm(newAlarm) {
    let content =`<li  id="list-items" >
    <h5>${newAlarm}</h5>
    <button   class="deleteButton" onclick="remove(this.value)" value=${newAlarm}  >
        Delete
    </button>
</li>`
console.log(lists)
lists.innerHTML += content 

}


//SETTING NEW ALARM AFTER CLICKING SET ALARM BUTTON
setAlarm.addEventListener('submit',event=>{ //not click use submit
    event.preventDefault(); // It will prevent the default behaviour of refresh after submittng
    let newHour = formatTime(setAlarm.hour.value)
    let newMin = formatTime(setAlarm.min.value)
    let newSec = formatTime(setAlarm.sec.value)
    //IF WE LEAVE THE INPUT BOX BLANK IT AND SUBMIT WILL GIVE 0 
    //but to deal with that below if's
    if(newHour == '0'){
        newHour = '0'+newHour
    }
    if(newMin == '0'){
        newMin = '0'+newMin
    }
    if(newSec == '0'){
        newSec = '0'+newSec
    }
    

    const newAlarm = `${newHour}:${newMin}:${newSec}`
    console.log(newAlarm)

    // console.log(newHour)
    // console.log(newMin)
    // console.log(newSec)
    // console.log('done')

    //ADDING newAlarm TO OUR ARRAY
    if(!alarmArray.includes(newAlarm)){
        alarmArray.push(newAlarm)
        console.log(alarmArray)
        displayAlarm(newAlarm)
    }
    else{
        alert('alarm already set for '+JSON.stringify(newAlarm))
    }
})


    
    

// This will call the upadteClock function every sec
setInterval(updateClock,1000)
//This is for day,date,minth and year
updateCalender();
