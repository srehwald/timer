var displaySeconds = true;
var started = false;
var timer;

// object used to update the to be displayed time
var time = {
    minutes: 0,
    seconds: 0
}

// start the timer
function start() {
    var minutes = getMinutes()
    //console.log(minutes);
    
    // parsing of minutes needs to be successful
    if (isNaN(minutes)) {
        alert("Please set the timer with an integer number of minutes!");
        return;
    }
    
    var until = new Date();
    // define time until which the timer will run by adding the number of minutes on top of the current time
    until.setMinutes(until.getMinutes() + minutes);
    
    // avoid multiple intervals running at the same time
    // clear the interval if a new timer is started while the old one is still running
    if(started)
        clearInterval(timer);
    
    started = true;
    // execute every 500ms
    timer = setInterval(function () {
        var now = new Date().getTime();
        // find the distance between now an the count down date
        var distance = until.getTime() - now;
        //console.log(distance);

        // calculations for minutes and seconds
        time.minutes = Math.floor(distance / (1000 * 60));
        time.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        //console.log(time.minutes + ":" + time.seconds);
        
        // stop the countdown, if the time is up or started is set to false
        if (distance <= 0 || !started) {
            time.minutes = 0;
            time.seconds = 0;
            started = false;
            clearInterval(timer);
        }
        
        m.redraw();
    }, 500);

}

// stop the timer
function stop() {
    started = false;
    // faster reset; otherwise we would rely on the reset performed within the start()-function, which may take up to 500ms
    time.minutes = 0;
    time.seconds = 0;
    m.redraw();
}

// parse minutes from input form
function getMinutes() {
    var minutes = parseInt(document.getElementById("minutes").value);
    return minutes;
}

// handle the checkbox for displaying the seconds
function handleSeconds(checkbox) {
    if (checkbox.checked == true) {
        displaySeconds = false;
    } else {
        displaySeconds = true;
    }

    m.redraw();
}

// frontend Timer component
var Timer = {
    view: function (vnode) {
        var minutes = m("div", {
            style: "display: inline-block"
        }, [
                m("h6", {
                class: "subtitle is-6"
            }, "MIN"),
                m("h1", {
                class: "title is-1",
                style: "font-size: 8em"
            }, time.minutes)
            ]);
        var seconds = m("div", {
            style: "margin-left: 1.5em; display: inline-block"
        }, [
                m("h6", {
                class: "subtitle is-6"
            }, "SEC"),
                m("h1", {
                class: "title is-1",
                style: "font-size: 8em"
            }, String(time.seconds).length < 2 ? "0" + time.seconds : time.seconds)
            ]);

        // if displaySeconds is set to true or number of minutes is less than 1, display the seconds
        if (displaySeconds || time.minutes < 1)
            return m("div", [
                minutes,
                // colon (:) between minutes and seconds
                m("div", {
                    style: "margin-left: 1.5em; display: inline-block"
                }, [
                    m("h1", {
                        class: "title is-1",
                        style: "font-size: 8em"
                    }, ":")
                ]),
                seconds
            ])
        // else, display minutes only
        else
            return m("div", [
                minutes
            ])
    }
}

// initiate Mithril
var root = document.getElementById('timer');

m.mount(root, Timer);