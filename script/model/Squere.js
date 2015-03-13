/**
 * Created by Luis 4raujo on 09/03/15.
 */
var Squere = function(img,x, y, h, w, Vm, cor){

    this.x=x;
    this.y=y;
    this.image = img;
    if(cor == COR_AZUL || cor == COR_AZUL2)
        this.image=img[3];
    else if(cor == COR_VERDE || cor == COR_VERDE2)
        this.image=img[4];
    else if(cor == COR_VERMELHO || cor == COR_VERMELHO2)
        this.image = img[5];
    this.h =h;
    this.w =w;
    this.Vm = Vm;
};


Squere.prototype.click = function(event){


    var rect = Canvas.getBoundingClientRect();

    var pos = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
    console.log(this.y);
    pos.y -= this.Vm*((HeightCanvas/this.Vm)/2);

    if( (pos.x > this.x) && (pos.x<(this.x+this.w)) && (pos.y>this.y) && (pos.y<(this.y+this.h)) ){

        return true;
    }

    return false;
};

/**
 * Created by Luis 4raujo on 07/03/15.
 */
