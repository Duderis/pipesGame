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
            pipes[x][y].check();
            console.log(pipes[x][y].checkArround());
        }
    }

}
function main() {
    canvas = document.createElement("canvas");
    timeStamp = 0;
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
        pipes = generatePipes(5,5);
        run();
    }
    img.src = "resources/sheet.png";
}
function generatePipes(sizex,sizey){
    var array2d = [];
    for(x = 0; x < sizex; x++){
        var innerArray = [];
        for(y = 0; y < sizey; y++){
            var pipe = new Pipe(x,y,Math.floor((Math.random()*3)),Math.floor((Math.random()*3)));
            innerArray.push(pipe);
        }
        array2d.push(innerArray);
    }
    return array2d;
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
    for(x = 0; x < pipes.length; x++){
        for(y = 0; y < pipes[x].length; y++){
            pipes[x][y].update();
        }
    }
    var d = new Date();
    var secs = d.getSeconds();
    var incrSecs = 1;
    if(secs >= timeStamp && (!((secs+incrSecs)>=60)||((timeStamp+incrSecs)>=60))){
        timeStamp = (secs+incrSecs)%60;
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
