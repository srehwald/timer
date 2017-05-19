function start() {
    // TODO
}

function stop() {
    // TODO
}

var Timer = {
    view: function() {
        return m("div", [
            m("div", {style: "display: inline-block"}, [
                m("h6", {class: "subtitle is-6"}, "MIN"),
                m("h1", {class: "title is-1", style: "font-size: 8em"}, "1337")
            ]),
            m("div", {style: "margin-left: 1.5em; display: inline-block"}, [
                m("h1", {class: "title is-1", style: "font-size: 8em"}, ":")
            ]),
            m("div", {style: "margin-left: 1.5em; display: inline-block"}, [
                m("h6", {class: "subtitle is-6"}, "SEC"),
                m("h1", {class: "title is-1", style: "font-size: 8em"}, "42")
            ])
        ])
    }
}

var root = document.getElementById('timer');

m.mount(root, Timer);