//PRINTER
var Printer = function(grid, graphics){
    this.grid = grid;
    this.graphics = graphics;

};

Printer.prototype.print = function(){

    Context.clearRect(0,0,WidthCanvas, HeightCanvas);

    this.grid.print(Canvas);
    /* padrão
    //Optimização para 3 graficos
    for(var i=this.graphics.length-1; i >= 0 ; i--){

        if(this.graphics[i].deleteMe){
            this.graphics.popByIndex(i);
            continue;
        }

        this.graphics[i].print();
    }
     */

    for(var i=this.graphics.length-1; i >= 0 ; i--){

        if(this.graphics[i].deleteMe){
            this.graphics.popByIndex(i);
            continue;
        }

        this.graphics[i].print();
    }



}