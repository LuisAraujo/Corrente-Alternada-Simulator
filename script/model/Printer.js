//PRINTER
var Printer = function(grid, graphics){
    this.grid = grid;
    this.graphics = graphics;

};

Printer.prototype.print = function(){

    Context.clearRect(0,0,WidthCanvas, HeightCanvas);

    this.grid.print(Canvas);

    for(var i=this.graphics.length-1; i >= 0 ; i--){
        this.graphics[i].print();
    }

}