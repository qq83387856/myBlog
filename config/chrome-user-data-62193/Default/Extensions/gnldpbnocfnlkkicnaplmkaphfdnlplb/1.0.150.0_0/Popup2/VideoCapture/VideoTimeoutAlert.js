function countdown() {
    var seconds = 60;
    function tick() {
        var counter = document.getElementById("timer");
        seconds--;
        counter.textContent = "00:" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else if (seconds === 0) {
            var timertext = document.getElementById("timertext");
            var curDate = new Date();
            timertext.textContent = "Ended at " + curDate.toLocaleString();

            var warningtext = document.getElementById("warningtext");
            warningtext.textContent = "Your screen recording has been ended since you have reached the maximum time limit. Please start the screen recording again to continue capturing your screen.";

            var warningtitle = document.getElementById("warningtitle");
            warningtitle.textContent = "Screen recording timeout!";
        } 
    }

    if (localStorage.getItem("ngStorage-" + "videoCaptureRequestPresent")) {
        document.title = "Test & Feedback";
    } else {
        document.title = "Microsoft Test Runner";
    }

    tick();
}
 
window.onload = countdown;