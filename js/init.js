//Snake Ver.1.1 by Roberto Zanardo
//Based on JS Snake by Marco Palladino www.marcopalladino.it

//init and preload

function preload(){
    canv=document.getElementById("gc");
    //proviamo a impostare automaticamente le dimensioni
    ch = window.innerHeight-gs*4
    cy = window.innerWidth-gs*2

    canv.height = ch
    canv.width = cy
    tc=Math.floor(cy/gs); //total number of grid cols
    tr=Math.floor(ch/gs); //total number of grid rows

    //set default snake and resize all elements upon screen size
    if ((tc<gs)||(tr<gs)) {
        px=py=Math.floor(tc/2);
        ax=ay=Math.floor(tr/2);
        gs=gs/2;
        //update total col and total rows for new gs value
        tc=Math.floor(cy/gs); //total number of grid cols
        tr=Math.floor(ch/gs); //total number of grid rows
    }

    //We adapt canvas size to cell numbers to not have 'shadow' zone
    canv.height = tr*gs
    canv.width = tc*gs

    ctx=canv.getContext("2d");
    document.addEventListener("keydown",keyPush);
    document.addEventListener("click",scrTap);
    setInterval(game,1000/15);

    //load some resources
    res();
    //play music
    game_music.play()
    //start direction
    direction = 'D';
}


