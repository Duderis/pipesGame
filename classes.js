
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
                    case 0: {accepts = [{x:this.x,y:this.y-1},{x:this.x,y:this.y+1}]; break;}
                    case 1: {accepts = [{x:this.x+1,y:this.y},{x:this.x-1,y:this.y}]; break;}
                    case 2: {accepts = [{x:this.x,y:this.y-1},{x:this.x,y:this.y+1}]; break;}
                    case 3: {accepts = [{x:this.x+1,y:this.y},{x:this.x-1,y:this.y}]; break;}
                }
                break;
            }
            case 1:{
                switch(this.state){
                    case 0: {accepts = [{x:this.x,y:this.y-1},{x:this.x,y:this.y+1},{x:this.x+1,y:this.y}]; break;}
                    case 1: {accepts = [{x:this.x+1,y:this.y},{x:this.x-1,y:this.y},{x:this.x,y:this.y+1}]; break;}
                    case 2: {accepts = [{x:this.x,y:this.y-1},{x:this.x,y:this.y+1},{x:this.x-1,y:this.y}]; break;}
                    case 3: {accepts = [{x:this.x+1,y:this.y},{x:this.x-1,y:this.y},{x:this.x,y:this.y-1}]; break;}
                }
                break;
            }
            case 2:{
                accepts = [{x:this.x,y:this.y-1},{x:this.x,y:this.y+1},{x:this.x+1,y:this.y},{x:this.x-1,y:this.y}];
                break;
            }
            case 3:{
                switch(this.state){
                    case 0: {accepts = [{x:this.x,y:this.y+1},{x:this.x+1,y:this.y}]; break;}
                    case 1: {accepts = [{x:this.x,y:this.y+1},{x:this.x-1,y:this.y}]; break;}
                    case 2: {accepts = [{x:this.x,y:this.y-1},{x:this.x-1,y:this.y}]; break;}
                    case 3: {accepts = [{x:this.x,y:this.y+1},{x:this.x+1,y:this.y}]; break;}
                }
                break;
            }
        }
        this.accepts = accepts;
    }
    this.accept();
}

Pipe.prototype.draw = function(ctx,fc,mY){
    this.sprite.draw(ctx, this.x, this.y, this.rotation, fc, mY);
}
Pipe.prototype.rotate = function(){
    this.rotationLeft += 90;
}
Pipe.prototype.update = function(){
    var newState = this.state;
    if(this.rotationLeft!=0){
        this.rotation += 5;
        this.rotationLeft -= 5;
        if(this.rotation == 360){
            this.rotation = 0;
        }
        newState = Math.floor(this.rotation/90);
    }
    if(newState != this.state){
        this.state = newState;
        this.accept();
    }
}
Pipe.prototype.checkArround = function(){
    var candidates = [];
    for(var i in this.accepts){
        if(this.accepts[i].x>=0 && this.accepts[i].x<pipes.length){
            if(this.accepts[i].y>=0 && this.accepts[i].y<pipes[this.accepts[i].x].length){
                if(pipes[this.accepts[i].x][this.accepts[i].y].check){
                    candidates.push( this.accepts[i] );
                }
            }
        }
    }
    return candidates;
}
Pipe.prototype.check = function(otherX, otherY){
    if(this.filled || otherX<0 || otherY<0){
        return false;
    }
    for(var i in this.accepts){
        if(this.accepts[i].x==otherX && this.accepts[i].y==otherY){
            return true;
        }
    }
    return false;
}
