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