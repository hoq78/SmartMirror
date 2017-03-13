/**
* Function to choose which clock should be displayed taken from the config file.
*/

function whichClock() {
    if (config.timeFormat === "digital") {
        $("#digital").css("display", "inline-block");
        $("#analogue").css("display", "none");
        showDigitalClock();
    } else if (config.timeFormat === "analogue" || config.timeFormat === "analog") {
        $("#analogue").css("display", "inline-block");
        $("#digital").css("display", "none");
        showAnalogueClock();
    }
}
