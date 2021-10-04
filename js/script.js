//Snake Ver.1.1 by Roberto Zanardo
//Based on JS Snake by Marco Palladino www.marcopalladino.it

var px = py =10; //snake start position and direction - will be updated by game function
var direction = 'N';
var gs = 20; //square size
var ax = ay=15; //apple pos
var xv = yv = mx =my = wx = wy = sx = sy =0;  //snake pos and other start positions
var trail=woods=[]; //snake array
var tail = 5; //tail lenght
var pause = gamend = debug =mute =false;
var score = game_cycle = clickX = clickY =0;
var mushroom_frequency = 100;
var star_frequency = 50;

window.onload = function() {
    preload();
}

function gameover() {
    for(var i=0;i<trail.length;i++) {
        ctx.drawImage(death, trail[i].x*gs,trail[i].y*gs,gs,gs);
    }
    if (!debug) {
        gamend = true;
        game_over.play();
        // reset start values
        trail=[];
        tail=5;
        px=py=10;
        xv=yv=0;  //snake pos
        ax=ay=15; //apple
    }
}

function game() {
    // check if game is paused
    if ((!pause) && (!gamend)) {
        game_cycle++;
        px+=xv; //upd pos snake
        py+=yv; //upd pos snake

        //check if we have still integers (to manage collisions on redim screen)
        px = Math.floor(px)
        py = Math.floor(py)

        //draw background
        ctx.drawImage(field_bg, 0,0,canv.width,canv.height);

        //draw wall and check collisions
        drawWalls();
        //draw controls if mobile
        controls();
        //draw and update the snake
        drawSnake();
        //draw and update apple
        apples();
        //mushroom generation and collision
        mushrooms();
        //stars generation and collision
        stars();

        //We update the score and  make a fresh new apple
        ctx.fillStyle="white";
        ctx.font = gs +4 + "px Arial";
        ctx.fillText('Score:'+ score,canv.width - gs*6, gs+5);

        //for debug on screen (comment/uncomment for debug)
        if (debug){
            show_debug();
        }
    }
    else {
            if (gamend){
                ctx.fillStyle="red";
                ctx.font = gs + 4 +"px Arial";
                ctx.fillText('GAME OVER',canv.width/2-gs*5,canv.height/2);
            }
            if (pause) {
                ctx.fillStyle="white";
                ctx.font = gs + 4 +"px Arial";
                ctx.fillText('PAUSED',canv.width/2-gs*5,canv.height/2);
            }
        }
}
