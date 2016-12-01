document.addEventListener('DOMContentLoaded', function() {
    whichClock();
}, false);

//Function to choose which clock should be displayed taken from the config file.
function whichClock() {
    if (config.timeFormat === "digital") {
        $("#digital").css("display", "block");
        $("#analogue").css("display", "none");
        showDigitalClock();
    } else if (config.timeFormat === "analogue" || config.timeFormat === "analog") {
        $("#analogue").css("display", "block");
        $("#digital").css("display", "none");
        showAnalogueClock();
    }
}
