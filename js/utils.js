//Snake Ver.1.1 by Roberto Zanardo
//Based on JS Snake by Marco Palladino www.marcopalladino.it

//Some utils for better code management and optional further improvements

function res(){
    //Background
    field_bg = new Image();
    field_bg.src = './img/grass.jpg';

    //Wall
    wall = new Image();
    wall.src = './img/wall.png';

    //Wood/Tree
    wood = new Image();
    wood.src = './img/tree.png';

    //Wood/Tree
    star = new Image();
    star.src = './img/star.png';

    //Death img (not sure to use it)
    death = new Image();
    death.src = './img/death.png';

    //Snake start sprites
    snake_sprite = new Image();
    snake_sprite.src = './img/s_head_down.png';
    body_sprite = new Image();
    body_sprite.src = './img/s_body_small.png';

    // Set some sounds
    apple_sound = new Howl({src: ['./sound/apple.mp3'],preload: true,volume: 0.5,});
    star_sound = new Howl({src: ['./sound/star.mp3'],preload: true,volume: 0.5,});
    game_over = new Howl({src: ['./sound/death.wav'],preload: true,volume: 0.7,});
    game_music = new Howl({src: ['./sound/music.mp3'],preload: true,volume: 0.3,loop: true,});
}

function new_apple(){
    ax=Math.floor(Math.random()*tc);
    ay=Math.floor(Math.random()*tr);
}

function apples(){
    if(ax==px && ay==py) { //check apple collision
        //apple is EAT!
        apple_sound.play();
        tail++;
        ax=Math.floor(Math.random()*tc);
        ay=Math.floor(Math.random()*tr);
        score+=10;
    }

    //draw the apple
    var apple_sprite = new Image();
    apple_sprite.src = './img/apple_small.png';
    if (!((ax>2) && (ax<tc-2) && (ay>2) && (ay<tr-2))) //check if are in game area else make a new apple
    {
        new_apple();
    }
    ctx.drawImage(apple_sprite, ax*gs, ay*gs,gs-2,gs-2);
}

function mushrooms(){
    if (mushroom_frequency == game_cycle){
        mx=Math.floor(Math.random()*tc);
        my=Math.floor(Math.random()*tr);
        game_cycle=0;
    }

    var mushroom = new Image();
    mushroom.src = './img/mushroom.png';
    if ((mx>2) && (mx<tc-2) && (my>2) && (my<tr-2)) //check if are in game area else we wait the next time to draw
    {
    ctx.drawImage(mushroom, mx*gs, my*gs,gs+5,gs+5);
    }
    //mushroom (here we can add a venomus mushroom)
    if(mx==px && my==py) { //check mushroom collision
        //mushroom is EAT!
        gameover();
    }
}

function stars(){
    if (star_frequency == game_cycle){
        sx=Math.floor(Math.random()*tc);
        sy=Math.floor(Math.random()*tr);
        //game_cycle=0;
    }

    if(sx==px && sy==py) { //check star collision
        //a star is EAT!
        star_sound.play();
        tail+=5;
        sx=Math.floor(Math.random()*tc);
        sy=Math.floor(Math.random()*tr);
        //setInterval(game,1000/13);
        score+=50;
    }
    if ((sx>2) && (sx<tc-2) && (sy>2) && (sy<tr-2)) //check if are in game area else we wait the next time to draw
    {
    ctx.drawImage(star, sx*gs,sy*gs,gs,gs);
    }
}

function snakeHead(){
    if (direction=='L'){
        snake_sprite.src = './img/s_head_left.png';
    }
    if (direction=='U'){
        snake_sprite.src = './img/s_head_up.png';
    }
    if (direction=='R'){
        snake_sprite.src = './img/s_head_right.png';
    }
    if (direction=='D'){
        snake_sprite.src = './img/s_head_down.png';
    }
}

function drawSnake(){
    for(var i=0;i<trail.length;i++) {
        //we try to determine head and end of snake
        if (i==1) { //body
            ctx.fillStyle="green";
            }
        if (i==trail.length-1) { //head direction
            snakeHead();
            }
        //draw an image for every element of the tail array
        if (i==trail.length-1) {
            //head
            ctx.drawImage(snake_sprite, trail[i].x*gs,trail[i].y*gs,gs+2,gs+2);
        }
        else {
            //body
            ctx.drawImage(body_sprite, trail[i].x*gs,trail[i].y*gs,gs,gs);
        }
        
        //check if element  position match with head(bite itself) and reset tail
        if(trail[i].x==px && trail[i].y==py && trail.length>5) {
            //tail = 5;
            gameover();
        }
    }
    trail.push({x:px,y:py}); //add coords rect to tail (push:add element to array)

    //check for array lenght > tail limit
    while(trail.length>tail) {
        trail.shift(); //remove first(0) element from list and shift the remaining
    }
}

function drawWalls(){
        if(px<0) {
            px= tc-1; //wall collision bottom
            gameover();
        }
        if(px>tc-1) {
            px= 0;  //wall collision top
            gameover();
        }
        if(py<0) {
            py= tr-1; //wall collision right
            gameover();
        }
        if(py>tr-1) {
            py= 0;   //wall collision left
            gameover();
        }
        //draw top wall
        for(var c=0;c<tc*gs;c+=gs) {
            ctx.drawImage(wall, c,0,gs,gs);
        }
        //draw bottom wall
        for(var c=0;c<tc*gs;c+=gs) {
            ctx.drawImage(wall, c,canv.height-gs,gs,gs);
        }
        //draw right wall
        for(var c=0;c<tr*gs;c+=gs) {
            ctx.drawImage(wall, canv.width-gs,c,gs,gs);
        }
        //draw left wall
        for(var c=0;c<tr*gs;c+=gs) {
            ctx.drawImage(wall, 0,c,gs,gs);
        }
}

function show_debug(){
    ctx.fillStyle="white";
    ctx.font = gs - 4 + "px Arial";

    ctx.fillText("trail length: " + trail.length, gs,canv.height-gs*7);
    ctx.fillText("clientX: " + clickX + " - clientY: " + clickY + " - Direction: " + direction, gs,canv.height-gs*6);
    ctx.fillText('gc:'+ game_cycle, gs,canv.height-gs*5);
    ctx.fillText('tc:'+ tc + ' tr:' + tr, gs,canv.height-gs*4);
    ctx.fillText('snake x:'+ px + ' snake y:'+ py , gs,canv.height-gs*3);
    ctx.fillText('apple x:'+ ax + ' apple y:'+ ay + ' star x:'+ sx + ' star y:'+ sy, gs,canv.height-gs*2);
    ctx.fillText('gs:'+ gs + ' canv.width:'+ canv.width + ' canv.height:' + canv.height, gs,canv.height-gs);
}

function mainScreen(){
    //fill the main canvas
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canv.width,canv.height);
}

function drawField(){
    ctx.beginPath();
    for(var n=0;n<100;n++){
        var x=parseInt(Math.random()*canv.width);
        var y=parseInt(Math.random()*canv.height);
        var radius=Math.random()*3;
        //ctx.arc(x,y,radius,0,Math.PI*2,false);
        ctx.moveTo(x,y);
        ctx.lineTo(x+radius,y+radius);
        ctx.lineWidth = radius;
        ctx.closePath();
    }
    ctx.fillStyle="green";
    ctx.fill();
    ctx.strokeStyle = 'lime';
    ctx.stroke();
    }

function walls() {
        //woods generation
        if (woods_frequency == game_cycle){
            woods=[]
            wx=Math.floor(Math.random()*tc);
            wy=Math.floor(Math.random()*tr);
            game_cycle=0;
        }
        //draw random woods
        for(var c=gs;c<7*gs;c+=gs) {
            woods.push({x:wx,y:wy});
            ctx.drawImage(wood, c+wx*gs,0+wy*gs,gs,gs);
        }

        //check woods collision (not working)
        for(var i=0;i<woods.lenght;i++) {
            console.log(woods[i].x)
            if(woods[i].x == px && woods[i].y == py) {
                console.log(woods[i].x)
                score+=1;
            }
        }
}
