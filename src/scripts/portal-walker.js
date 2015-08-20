var events = require('./utils/events');
var container = document.querySelector('article.container');
var stage    = document.querySelector('section.stage');
var containerStyle = window.getComputedStyle(container) || {};
var stageStyle = window.getComputedStyle(stage) || {};
var perspective = parseInt(containerStyle.perspective,10);
var transform = containerStyle.transform;
var zoom = transform.indexOf('scale')>-1 ? /\(([^)]+)\)/.exec(transform)[1] : 1;
var perspectiveOrigin = containerStyle.perspectiveOrigin;
perspectiveOrigin = perspectiveOrigin ? parseInt(perspectiveOrigin.split(' ')[1],10) : 0;
var rotation = -45;//parseInt(stageStyle.transform.split(' ')[1],10); matrix ?
var verticalJump = 100;
var horizonJump = 100;
var zoomJump = 0.1;
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
        zoom += zoomJump;
        container.style.transform = 'scale(' + zoom + ')';
    },
    out: function(){
        zoom -= zoomJump;
        container.style.transform = 'scale(' + zoom + ')';
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