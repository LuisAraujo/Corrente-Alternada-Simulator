var AlcaVm = function(img,x, y, h, w, Vm, cor, up){

    this.x=x;
    this.y=y;
    this.image = img;
    if(cor == COR_AZUL || cor == COR_AZUL2)
        this.image=img[0];
    else if(cor == COR_VERDE || cor == COR_VERDE2)
        this.image=img[1];
    else if(cor == COR_VERMELHO || cor == COR_VERMELHO2)
        this.image = img[2];
    this.h =h;
    this.w =w;
    this.Vm = Vm;
    this.up = up;

};


AlcaVm.prototype.click = function(event){

    var rect = Canvas.getBoundingClientRect();

    var pos = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };


    //Conta necessário pelo fato do transladdo do canvas
    pos.y -= this.Vm*((HeightCanvas/this.Vm)/2);

    if( (pos.x > this.x) && (pos.x<(this.x+this.w)) && (pos.y>this.y) && (pos.y<(this.y+this.h)) ){
        console.log(this.up);
        return true;
    }

    return false;
};

/**
 * Created by Luis 4raujo on 07/03/15.
 */
