// document.addEventListener('DOMContentLoaded', function() {
//     getDate();
// }, false);

function getDate() {
    var date = new Date();
    var daynumber = date.getDay();
    var dateOfMonth = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var daysInTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var monthsInYear = ["February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "January"];
    var day;

    day = daysInTheWeek[daynumber];
    month = monthsInYear[month - 1];
    let dateOut = day + " " + dateOfMonth + " " + month + " " + year;
    $("#date").html(dateOut);
    //document.getElementById('date').innerHTML = day + ":" + daynumber + ":" + month+ ":" + year ;

}
