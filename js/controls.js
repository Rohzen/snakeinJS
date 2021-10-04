//Snake Ver.1.1 by Roberto Zanardo
//Based on JS Snake by Marco Palladino www.marcopalladino.it

//Controls

function controls() {
        //draw controls
        l1 = document.getElementById("l1");
        r1 = document.getElementById("r1");
        u1 = document.getElementById("u1");
        d1 = document.getElementById("d1");
        p1 = document.getElementById("p1");

        l1.style.position="absolute";
        l1.style.left= canv.width - gs*9 + "px"
        l1.style.top= canv.height - gs*6 + "px"
        l1.style.width= gs*3 + "px"
        l1.style.height= gs*3 + "px"
        l1.addEventListener("click",btnLeft);

        r1.style.position="absolute";
        r1.style.left= canv.width - gs*3 + "px"
        r1.style.top= canv.height - gs*6 + "px"
        r1.style.width= gs*3 + "px"
        r1.style.height= gs*3 + "px"
        r1.addEventListener("click",btnRight);

        u1.style.position="absolute";
        u1.style.left= canv.width - gs*6 + "px"
        u1.style.top= canv.height - gs*9 + "px"
        u1.style.width= gs*3 + "px"
        u1.style.height= gs*3 + "px"
        u1.addEventListener("click",btnUp);

        d1.style.position="absolute";
        d1.style.left= canv.width - gs*6 + "px"
        d1.style.top= canv.height - gs*6 + "px"
        d1.style.width= gs*3 + "px"
        d1.style.height= gs*3 + "px"
        d1.addEventListener("click",btnDown);

        p1.style.position="absolute";
        p1.style.left= canv.width - gs*7 + "px"
        p1.style.top= canv.height - gs*3-5 + "px"
        p1.style.width= gs*5 + "px"
        p1.style.height= gs*2 + "px"
        p1.addEventListener("click",btnPause);
}

function keyPush(evt) {
    switch(evt.keyCode) {
        case 32: //space
            if ((pause) || (gamend)) {
                if (gamend) {score=0;}
                pause = false
                gamend = false
            }
            else
            {
                pause = true
            }
            break;

        case 37://left
            if (direction!='R'){xv=-1;yv=0;direction = 'L';}
            break;
        case 38://up
            if (direction!='D'){xv=0;yv=-1;direction = 'U';}
            break;
        case 39://right
            if (direction!='L'){xv=1;yv=0;direction = 'R';}
            break;
        case 40://down
            if (direction!='U'){xv=0;yv=1;direction = 'D';}
            break;
        case 68://d for debug
            if (debug) {
                debug = false
            }
            else
            {
                debug = true
            }
        case 77://m for mute music
            if (mute) {
                game_music.play()
                mute = false
            }
            else
            {
                game_music.stop()
                mute = true
            }
    }
}

function scrTap(evt) {
        //Placeholder to manage Tap(to do...)
        clickX= Math.floor(evt.clientX/gs)
        clickY= Math.floor(evt.clientY/gs)
}

function btnLeft(evt) {
            xv=-1;yv=0;
            direction = 'L';
}

function btnRight(evt) {
            xv=1;yv=0;
            direction = 'R';
}
function btnUp(evt) {
            xv=0;yv=-1;
            direction = 'U';
}
function btnDown(evt) {
            xv=0;yv=1;
            direction = 'D';
}

function btnPause(evt) {
            if ((pause) || (gamend)) {
                pause = false
                gamend = false
            }
            else
            {
                pause = true
            }
}