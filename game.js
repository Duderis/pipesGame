var canvas, height, width, ctx, evt, factor, gridSize, marginY, timeStamp;
var pipes;


function onpress(evt){
    var rect = canvas.getBoundingClientRect();
    if((evt.x > rect.left && evt.x < rect.right) && (evt.y > rect.top)  && (evt.y < rect.bottom)){
        var X = evt.x-(Math.floor(rect.left));
        var Y = evt.y-(Math.floor(rect.top));
        var x = Math.floor(X/factor); var y = Math.floor((Y-marginY)/factor);
        if(Y>marginY&&Y<(Math.floor(rect.bottom))-marginY*2){
            pipes[x][y].rotate();
        }
    }

}
function main() {
    canvas = document.createElement("canvas");
    gridSize = 5;
    width = window.innerWidth;
    height = window.innerHeight;
    var evt = "touchstart";
    if(width >= 500){
        width  = 320;
        height = 480;
        canvas.style.border = "1px solid #000";
        evt = "mousedown";
    }
    factor = width/gridSize;
    marginY = (height - factor*gridSize)/2;
    document.addEventListener(evt, onpress);
    canvas.width = width;
    canvas.height = height;
    ctx = canvas.getContext("2d");

    document.body.appendChild(canvas);
    var img = new Image();
    img.onload = function () {
        initSprites(this);
        ctx.fillStyle = s_pipe.color;
        pipes = generatePipes(gridSize,gridSize,1,1);
        run();
    }
    img.src = "resources/sheet.png";
}
function generatePipes(sizex,sizey,startPipeNum,endPipeNum){
    var array2d = [];
    for(x = 0; x < sizex; x++){
        var innerArray = [];
        for(y = 0; y < sizey; y++){
            var pipe = new Pipe(x,y,Math.floor((Math.random()*4)),Math.floor((Math.random()*3)));
            innerArray.push(pipe);
        }
        array2d.push(innerArray);
    }
    var i = 0;
    while(i < startPipeNum){
        var randomX = Math.floor((Math.random()*array2d.length));
        var randomY = Math.floor((Math.random()*array2d[randomX].length));
        if(array2d[randomX][randomY].spriteNum!=4){
            var direction = checkSides(randomX,randomY,array2d);
            var pipe = new Pipe(randomX,randomY,4,direction,true);
            array2d[randomX][randomY] = pipe;
            i++;
        }
    }
    i = 0;
    while(i < endPipeNum){
        var randomX = Math.floor((Math.random()*array2d.length));
        var randomY = Math.floor((Math.random()*array2d[randomX].length));
        if(array2d[randomX][randomY].spriteNum!=4){
            var direction = checkSides(randomX,randomY,array2d);
            var pipe = new Pipe(randomX,randomY,4,direction,false);
            array2d[randomX][randomY] = pipe;
            i++;
        }
    }
    return array2d;
}
function checkSides(randomX,randomY,array2d){
    var direction;
    if(randomX==0){
        if(randomY==0){
            direction = Math.floor((Math.random()*2));
        } else if (randomY==(array2d[randomX].length-1)){
            switch (Math.floor((Math.random()*2))){
                case 0:{
                    direction = 3;
                    break;
                }
                case 1:{
                    direction = 0;
                    break;
                }
            }
        } else {
            switch (Math.floor((Math.random()*3))){
                case 0:{
                    direction = 3;
                    break;
                }
                case 1:{
                    direction = 0;
                    break;
                }
                case 2:{
                    direction = 1;
                    break;
                }
            }
        }
    } else if (randomX == array2d.length-1){
        if(randomY==0){
            switch (Math.floor((Math.random()*2))){
                case 0:{
                    direction = 2;
                    break;
                }
                case 1:{
                    direction = 1;
                    break;
                }
            }
        } else if (randomY==(array2d[randomX].length-1)){
            switch (Math.floor((Math.random()*2))){
                case 0:{
                    direction = 3;
                    break;
                }
                case 1:{
                    direction = 2;
                    break;
                }
            }
        } else {
            switch (Math.floor((Math.random()*3))){
                case 0:{
                    direction = 3;
                    break;
                }
                case 1:{
                    direction = 2;
                    break;
                }
                case 2:{
                    direction = 1;
                    break;
                }
            }
        }
    } else if(randomY==0){
        direction = (Math.floor((Math.random()*3)));
    } else if (randomY==(array2d[randomX].length-1)){
        switch (Math.floor((Math.random()*3))){
            case 0:{
                direction = 0;
                break;
            }
            case 1:{
                direction = 2;
                break;
            }
            case 2:{
                direction = 3;
                break;
            }
        }
    } else {
        direction = (Math.floor((Math.random()*4)));
    }
    return direction;
}
function run(){
    var loop = function() {
        update();
        render();
        window.requestAnimationFrame(loop,canvas);
    }
    window.requestAnimationFrame(loop,canvas);
}

function update(){
    var filledArray = [];
    for(x = 0; x < pipes.length; x++){
        for(y = 0; y < pipes[x].length; y++){
            if(pipes[x][y].update()){
                filledArray.push({x:x,y:y})
            }
        }
    }
    var d = new Date();
    var secs = d.getSeconds();
    var incrSecs = 1;
    if(typeof timeStamp == "undefined"){
        timeStamp = secs+incrSecs;
    }
    if(secs >= timeStamp && (!((secs+incrSecs)>=60)||((timeStamp+incrSecs)>=60))){
        timeStamp = (secs+incrSecs)%60;
        if(secs%5==0){
            for(var i in filledArray){
                pipes[filledArray[i].x][filledArray[i].y].fillArround();
                console.log("splash!!");
            }
        }
    }
}

function render(){
    ctx.clearRect(0, 0, width, height);
    for(x = 0; x < pipes.length; x++){
        for(y = 0; y < pipes[x].length; y++){
            pipes[x][y].draw(ctx,factor/100,marginY);
        }
    }

}

main();
