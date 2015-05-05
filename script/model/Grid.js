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
        var posPrint = 0;

        var cor = new Array();
        cor[0] =COR_PRETO;
        cor[1] = COR_CINZA;


        //Horizontal
        for(var i = 0; i< WidthCanvas; i++ ){

            var incrementH = false;

            context.strokeStyle = cor[1];
            context.lineWidth = 0.2;
            context.beginPath();

            var lastPosition = 0;

            while (lastPosition < WidthCanvas){
                context.moveTo(lastPosition, i*this.distanceVesticalLine - (i*0.2));
                context.lineTo(lastPosition+this.sizeLine, i* this.distanceVesticalLine - (i*0.2));
                lastPosition += this.distanceLine+this.sizeLine;
            }


            context.font="9px Arial";
            context.fillText(""+posPrint.toFixed(2),i* this.distanceVesticalLine - (5+i*0.25), 410);
            posPrint+=0.05;


            context.stroke();
          //  console.log(i* this.distanceVesticalLine - (i*0.2));



        }



        posPrint = 400;
        //Vestical
        for(var j = 0; j<HeightCanvas; j++ ){

            context.strokeStyle = this.cor.grades;
            context.lineWidth = 0.2;
            context.beginPath();

            var lastPosition = 0;

            while (lastPosition < HeightCanvas){

                context.moveTo(j*this.distanceHorizontalLine - (j*0.2) , lastPosition);
                context.lineTo( j* this.distanceHorizontalLine - (j*0.2), lastPosition+this.sizeLine);
                lastPosition += this.distanceLine+sizeLine;
            }


            context.font="9px Arial";
            context.fillText(""+posPrint,7, j* this.distanceVesticalLine - (j*0.2)-5);
            posPrint-=50;

            context.stroke();




        }

        context.strokeStyle = this.cor.eixo;
        context.lineWidth = 2;
        context.beginPath();

        context.moveTo(0, HeightCanvas/2 - ((HeightCanvas/this.distanceHorizontalLine/2)*0.2));
        context.lineTo(WidthCanvas, HeightCanvas/2 - ((HeightCanvas/this.distanceHorizontalLine/2)*0.2));

        context.stroke();

        //this.distanceVesticalLine representa a defasagem gerada no gráfico pela espessura da linha
        context.moveTo(3,0);
        //context.moveTo(WidthCanvas/2-(WidthCanvas/ this.distanceVesticalLine*0.2),0);
        context.lineTo(3, HeightCanvas);
        //context.lineTo(WidthCanvas/2-(WidthCanvas/ this.distanceVesticalLine*0.2), HeightCanvas);

        context.stroke();




}