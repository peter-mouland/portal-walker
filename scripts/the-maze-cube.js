require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* globals NodeList,HTMLCollection */
var eventRegistry = {};
var state = {    };
var browserSpecificEvents = {
    'transitionend': 'transition',
    'animationend': 'animation'
};
NodeList.prototype.isNodeList = HTMLCollection.prototype.isNodeList = true;

function capitalise(str) {
    return str.replace(/\b[a-z]/g, function () {
        return arguments[0].toUpperCase();
    });
}

function check(eventName) {
    var type = '';
    if (browserSpecificEvents[eventName]){
        eventName =  browserSpecificEvents[eventName];
        type = 'end';
    }
    var result = false,
        eventType = eventName.toLowerCase() + type.toLowerCase(),
        eventTypeCaps = capitalise(eventName.toLowerCase()) + capitalise(type.toLowerCase());
    if (state[eventType]) {
        return state[eventType];
    }
    ['ms', 'moz', 'webkit', 'o', ''].forEach(function(prefix){
        if (('on' + prefix + eventType in window) ||
            ('on' + prefix + eventType in document.documentElement)) {
            result = (!!prefix) ? prefix + eventTypeCaps : eventType;
        }
    });
    state[eventType] = result;
    return result;
}

function dispatchEvent(el, eventName){
    eventName = check(eventName) || eventName;
    var event;
    if (document.createEvent) {
        event = document.createEvent('CustomEvent'); // MUST be 'CustomEvent'
        event.initCustomEvent(eventName, false, false, null);
        el.dispatchEvent(event);
    } else {
        event = document.createEventObject();
        el.fireEvent('on' + eventName, event);
    }
}

function addEventListener(el, eventName, eventHandler, useCapture){
    eventName = check(eventName) || eventName;
    if (el.addEventListener) {
        el.addEventListener(eventName, eventHandler, !!useCapture);
    } else {
        el.attachEvent('on' + eventName, eventHandler);
    }
}

function removeEventListener(el, eventName, eventHandler){
    eventName = check(eventName) || eventName;
    if (el.removeEventListener) {
        el.removeEventListener(eventName, eventHandler, false);
    } else {
        el.detachEvent('on' + eventName, eventHandler);
    }
}

function dispatchLiveEvent(event) {
    var targetElement = event.target;

    eventRegistry[event.type].forEach(function (entry) {
        var potentialElements = document.querySelectorAll(entry.selector);
        var hasMatch = false;
        Array.prototype.forEach.call(potentialElements, function(el){
            if (el.contains(targetElement) || el === targetElement){
                hasMatch = true;
                return;
            }
        });

        if (hasMatch) {
            entry.handler.call(targetElement, event);
        }
    });

}

function attachEvent(eventName, selector, eventHandler){
    if (!eventRegistry[eventName]) {
        eventRegistry[eventName] = [];
        addEventListener(document.documentElement, eventName, dispatchLiveEvent, true);
    }

    eventRegistry[eventName].push({
        selector: selector,
        handler: eventHandler
    });
}


module.exports = {
    dispatchEvent: dispatchEvent,
    attachEvent: attachEvent,
    addEventListener: addEventListener,
    removeEventListener: removeEventListener
};
},{}],2:[function(require,module,exports){
var utils = require('../utils/event-helpers');

function ready(exec) {
    if (/in/.test(document.readyState)) {
        setTimeout(function () {
            ready(exec);
        }, 9);
    } else {
        exec();
    }
}

function trigger(el, eventName) {
    utils.dispatchEvent(el, eventName);
}

function live(events, selector, eventHandler){
    events.split(' ').forEach(function(eventName){
        utils.attachEvent(eventName, selector, eventHandler);
    });
}

function off(el, eventNames, eventHandler) {
    eventNames.split(' ').forEach(function(eventName) {
        if (el.isNodeList) {
            Array.prototype.forEach.call(el, function (element, i) {
                utils.removeEventListener(element, eventName, eventHandler);
            });
        } else {
            utils.removeEventListener(el, eventName, eventHandler);
        }
    });
}

function on(el, eventNames, eventHandler, useCapture) {
    eventNames.split(' ').forEach(function(eventName) {
        if (el.isNodeList){
            Array.prototype.forEach.call(el, function(element, i){
                utils.addEventListener(element, eventName, eventHandler, useCapture);
            });
        } else {
            utils.addEventListener(el, eventName, eventHandler, useCapture);
        }
    });
}

module.exports = {
    live: live,
    on: on,
    off: off,
    trigger: trigger,
    ready: ready
};
},{"../utils/event-helpers":1}],"the-maze-cube":[function(require,module,exports){
var events = require('./utils/events');
var container = document.querySelector('article.container');
var stage    = document.querySelector('section.stage');
var containerStyle = window.getComputedStyle(container) || {};
var stageStyle = window.getComputedStyle(stage) || {};
var perspective = parseInt(containerStyle.perspective,10);
var perspectiveOrigin = containerStyle.perspectiveOrigin;
perspectiveOrigin = perspectiveOrigin ? parseInt(containerStyle.perspectiveOrigin.split(' ')[1],10) : 0;
var rotation = -45;//parseInt(stageStyle.transform.split(' ')[1],10); matrix ?
var verticalJump = 100;
var horizonJump = 100;
var rotateJump = 1;

function moveCamera(e){
    var direction = e.srcElement.getAttribute('data-controls');
    move[direction]();
}

var move = {
    down: function(){
        perspective += verticalJump/3;
        container.style.perspective = perspective + 'px';

        perspectiveOrigin += verticalJump;
        container.style.perspectiveOrigin = '50% ' + perspectiveOrigin + 'px';
    },
    up: function(){
        perspective -= verticalJump/3;
        container.style.perspective = perspective + 'px';

        perspectiveOrigin -= verticalJump;
        container.style.perspectiveOrigin = '50% ' + perspectiveOrigin + 'px';
    },
    in: function(){
        perspective -= horizonJump;
        container.style.perspective = perspective + 'px';

        perspectiveOrigin += horizonJump/3;
        container.style.perspectiveOrigin = '50% ' + perspectiveOrigin + 'px';
    },
    out: function(){
        perspective += horizonJump;
        container.style.perspective = perspective + 'px';

        perspectiveOrigin -= verticalJump/3;
        container.style.perspectiveOrigin = '50% ' + perspectiveOrigin + 'px';
    },
    left: function(){
        rotation += rotateJump;
        stage.style.transform = 'rotateY(' +rotation+ 'deg)';
    },
    right: function(){
        rotation -= rotateJump;
        stage.style.transform = 'rotateY(' +rotation+ 'deg)';
    }
};

events.live('click', '[data-controls]', moveCamera);
},{"./utils/events":2}]},{},["the-maze-cube"]);
