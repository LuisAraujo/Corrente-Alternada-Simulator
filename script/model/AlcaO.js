var AlcaO = function(img,x, y, h, w, Vm, cor, up){

    this.x=x;
    this.y=y;
    this.image = img;
    if(cor == COR_AZUL || cor == COR_AZUL2)
        this.image=img[6];
    else if(cor == COR_VERDE || cor == COR_VERDE2)
        this.image=img[7];
    else if(cor == COR_VERMELHO || cor == COR_VERMELHO2)
        this.image = img[8];
    this.h =h;
    this.w =w;
    this.Vm = Vm;
    this.up = up;

};


AlcaO.prototype.click = function(event){

    var rect = Canvas.getBoundingClientRect();

    var pos = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };


    //Conta necessário pelo fato do transladdo do canvas
    pos.y -= this.Vm*((HeightCanvas/this.Vm)/2);

    if( (pos.x > this.x) && (pos.x<(this.x+this.w)) && (pos.y>this.y) && (pos.y<(this.y+this.h)) ){
        return true;
    }

    return false;
};

