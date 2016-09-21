
function Pipe(x,y,spriteNum,state){
    this.filled = false;
    this.x = x;
    this.y = y;
    this.spriteNum = spriteNum;
    this.state = state; // state of the pipe e.g: 0 is an unturned pipe, while 1 is a sideways turned pipe (if sprite is 0);
    var rotation = 0;
    switch(state){
        case 0:{
            rotation = 0;
            break;
        }
        case 1:{
            rotation = 90;
            break;
        }
        case 2:{
            rotation = 180;
            break;
        }
        case 3:{
            rotation = 270;
            break;
        }
    }
    this.rotation = rotation;
    this.rotationLeft = 0;
    this.sprite = s_pipe[spriteNum];
    this.accept = function (){
        var accepts = [];
        switch(this.spriteNum){
            case 0:{
                switch(this.state){
                    case 0: {accepts = [{x:"x",y:"y-1"},{x:"x",y:"y+1"}]; break;}
                    case 1: {accepts = [{x:"x+1",y:"y"},{x:"x-1",y:"y"}]; break;}
                    case 2: {accepts = [{x:"x",y:"y-1"},{x:"x",y:"y+1"}]; break;}
                    case 3: {accepts = [{x:"x+1",y:"y"},{x:"x-1",y:"y"}]; break;}
                }
                break;
            }
            case 1:{
                switch(this.state){
                    case 0: {accepts = [{x:"x",y:"y-1"},{x:"x",y:"y+1"},{x:"x+1",y:"y"}]; break;}
                    case 1: {accepts = [{x:"x+1",y:"y"},{x:"x-1",y:"y"},{x:"x",y:"y+1"}]; break;}
                    case 2: {accepts = [{x:"x",y:"y-1"},{x:"x",y:"y+1"},{x:"x-1",y:"y"}]; break;}
                    case 3: {accepts = [{x:"x+1",y:"y"},{x:"x-1",y:"y"},{x:"x",y:"y-1"}]; break;}
                }
                break;
            }
            case 2:{
                accepts = [{x:"x",y:"y-1"},{x:"x",y:"y+1"},{x:"x+1",y:"y"},{x:"x-1",y:"y"}];
                break;
            }
            case 3:{
                switch(this.state){
                    case 0: {accepts = [{x:"x",y:"y+1"},{x:"x+1",y:"y"}]; break;}
                    case 1: {accepts = [{x:"x",y:"y+1"},{x:"x-1",y:"y"}]; break;}
                    case 2: {accepts = [{x:"x",y:"y-1"},{x:"x-1",y:"y"}]; break;}
                    case 3: {accepts = [{x:"x",y:"y+1"},{x:"x+1",y:"y"}]; break;}
                }
                break;
            }
        }
        this.accepts = accepts;
    }
    this.accept();
}

Pipe.prototype.draw = function(ctx,fc){
    this.sprite.draw(ctx, this.x, this.y, this.rotation, fc);
}
Pipe.prototype.rotate = function(degree){
    this.rotationLeft = degree;
}
Pipe.prototype.update = function(){
    if(this.rotationLeft!=0){
        this.rotation += 5;
        this.rotationLeft -= 5;
        if(this.rotation == 360){
            this.rotation = 0;
        }
        this.state = this.rotation/90;
    }
}
