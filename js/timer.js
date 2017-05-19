var displaySeconds = true;
var started = false;
var timer;

var time = {
    minutes: 0,
    seconds: 0
}

function start() {
    var now = new Date();
    var until = new Date();
    // TODO remove hard coded 2 mins
    until.setMinutes(now.getMinutes() + 1);
    
    var distance = until.getTime() - now.getTime();
    time.minutes = Math.floor(distance / (1000 * 60));
    time.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    m.redraw();
    
    // avoid multiple intervals running at the same time
    if(started)
        clearInterval(timer);
    
    started = true;
    timer = setInterval(function () {
        var now = new Date().getTime();
        // Find the distance between now an the count down date
        var distance = until.getTime() - now;

        // Time calculations for days, hours, minutes and seconds
        time.minutes = Math.floor(distance / (1000 * 60));
        // TODO to few seconds in the beginning
        time.seconds = Math.floor((distance % (1000 * 60)) / 1000);
        console.log(time.minutes + ":" + time.seconds);
        
        if (distance <= 0 || !started) {
            time.minutes = 0;
            time.seconds = 0;
            clearInterval(timer);
        }
        
        m.redraw();
    }, 1000);

}

function stop() {
    started = false;
    // faster reset
    time.minutes = 0;
    time.seconds = 0;
    m.redraw();
}

function handleSeconds(checkbox) {
    if (checkbox.checked == true) {
        displaySeconds = false;
    } else {
        displaySeconds = true;
    }

    m.redraw();
}

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

        if (displaySeconds)
            return m("div", [
                minutes,
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
        else
            return m("div", [
                minutes
            ])
    }
}

var root = document.getElementById('timer');

m.mount(root, Timer);