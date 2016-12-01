// OUR FUNCTION WHICH IS EXECUTED ON LOAD OF THE PAGE.
// document.addEventListener('DOMContentLoaded', function() {
//     digitalclockFunction();
// }, false);

function showDigitalClock() {
    var dt = new Date() // DATE() CONSTRUCTOR FOR CURRENT SYSTEM DATE AND TIME.
    var hrs = dt.getHours();
    var min = dt.getMinutes();
    var sec = dt.getSeconds();

    min = Ticking(min); //pads the time to 2 digits when the time is less than 2 digits long
    sec = Ticking(sec);

    document.getElementById('dc').innerHTML = hrs + ":" + min;
    document.getElementById('dc_second').innerHTML = sec;


    var time;

    // CALL THE FUNCTION EVERY 1 SECOND RECURSIVLY
    time = setTimeout('digitalclockFunction()', 1000);
}

function Ticking(ticVal) {
    if (ticVal < 10) {
        ticVal = "0" + ticVal;
    }
    return ticVal;
}
