var canvas, height, width, ctx, evt, factor, gridSize, marginY;
var pipes;


function onpress(evt){
    var rect = canvas.getBoundingClientRect();
    if((evt.x > rect.left && evt.x < rect.right) && (evt.y > rect.top)  && (evt.y < rect.bottom)){
        var x = evt.x-(Math.floor(rect.left));
        var y = evt.y-(Math.floor(rect.top))-marginY;
        x = Math.floor(x/factor); y=Math.floor(y/factor);
        pipes[x][y].rotate();
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
