var Grid = function(){

   this.cor = {
       eixo: COR_PRETO,
       grades: COR_CINZA
   };

   this.distanceVesticalLine = 50;
   this.distanceHorizontalLine = 50;
   this.sizeLine = 10;
   this.distanceLine = 5;

}


Grid.prototype.print = function(canvas){

        var context = canvas.getContext("2d");
        var HeightCanvas = canvas.height;
        var WidthCanvas = canvas.width;


        var cor = new Array();
        cor[0] =COR_PRETO;
        cor[1] = COR_CINZA;


        //Horizontal
        for(var i = 0; i< HeightCanvas; i++ ){

            context.strokeStyle = cor[1];
            context.lineWidth = 0.2;
            context.beginPath();

            var lastPosition = 0;
            while (lastPosition < WidthCanvas){
                context.moveTo(lastPosition, i*this.distanceVesticalLine);
                context.lineTo(lastPosition+this.sizeLine, i* this.distanceVesticalLine);
                lastPosition += this.distanceLine+this.sizeLine;
            }


            context.stroke();
        }

        //Vestical
        for(var j = 0; j<HeightCanvas; j++ ){
            context.strokeStyle = this.cor.grades;
            context.lineWidth = 0.2;
            context.beginPath();

            var lastPosition = 0;
            while (lastPosition < WidthCanvas){
                context.moveTo(j*this.distanceHorizontalLine , lastPosition);
                context.lineTo( j* this.distanceHorizontalLine , lastPosition+this.sizeLine);
                lastPosition += this.distanceLine+sizeLine;
            }
            context.stroke();
        }

        context.strokeStyle = this.cor.eixo;
        context.lineWidth = 2;
        context.beginPath();

        context.moveTo(0, HeightCanvas/2);
        context.lineTo(WidthCanvas, HeightCanvas/2);

        context.stroke();


        context.moveTo(WidthCanvas/2,0);
        context.lineTo(WidthCanvas/2, HeightCanvas);

        context.stroke();



}