var displaySeconds = true;


function start() {
    // TODO
}

function stop() {
    // TODO
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
            }, "1337")
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
            }, "42")
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
