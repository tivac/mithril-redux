"use strict";

var m     = require("mithril"),
    redux = require("redux"),
    
    store;

store = redux.createStore(function(state, action) {
    if(!state) {
        return {
            text : "ZZZ"
        };
    }
    
    switch(action.type) {
        case "TEXT_CHANGE":
            return Object.assign({}, state, { text : action.text });
        
        default:
            return state;
    }
});

store.subscribe(m.redraw.bind(m));

m.mount(document.body, {
    controller : function() {
        this.clickText = function(e) {
            e.preventDefault();
            
            store.dispatch({
                type : "TEXT_CHANGE",
                text : "It's currently: " + (new Date()).toTimeString()
            });
        };
    },
    
    view : function(ctrl) {
        var state = store.getState();
        
        return m("div",
            m("p", state.text),
            m("button", { onclick : ctrl.clickText }, "What time is it?")
        );
    }
});
