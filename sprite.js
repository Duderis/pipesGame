var s_pipe;
function Sprite(img, x, y, width, height) {
    this.img = img,
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}

Sprite.prototype.draw = function(ctx, x, y, rotation, fc){
    var X = x*(fc*100);
    var Y = y*(fc*100);
    ctx.save();
    ctx.translate(X+this.width*fc/2,Y+this.height*fc/2)
    ctx.rotate(rotation*Math.PI/180);
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height, -(this.width*fc/2), -(this.height*fc/2), this.width*fc, this.height*fc);
    ctx.restore();
}

function initSprites(img) {
    s_pipe = [
        new Sprite(img, 0, 0, 100, 100),
        new Sprite(img, 0, 100, 100, 100),
        new Sprite(img, 0, 200, 100, 100),
        new Sprite(img, 0, 300, 100, 100)
    ];
}
