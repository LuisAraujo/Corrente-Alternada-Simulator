/**
 * Created by Luis 4raujo on 06/03/15.
 */

var Canvas = null;
//var Context = null;
var distanceVesticalLine = 100;
var distanceHorizontalLine = 100;
var HeightCanvas = 800;
var WidthCanvas = 1000;

var idDisponivel = 1;
var proximaCor = 0;

//Cores
const COR_VERMELHO = "#f99";
const COR_VERDE = "#4f4";
const COR_AZUL = "#44f";
const COR_PRETO = "#000";
const COR_CINZA = "#999";


//Guide
var sizeLine = 20;
var distanceLine = 5;

var printer;
var call_print;

var GraphicTarget = null;
var PointTarget = null;

var arrayImgPoints = new Array();

var arrayPontos = new Array();
var Functionloaging;

var arrayGraphics = new Array();

$(document).ready( function(){


    $("#bt-add-graphic").click(function(){
        createGraphic(100, Math.PI/100, 0);
    });

    Canvas = document.getElementById("canvas");
    loadFiles();

});


var init = function(){

    Canvas = document.getElementById("canvas");
    Canvas.setAttribute("width", WidthCanvas);
    Canvas.setAttribute("height", HeightCanvas);
    Context = Canvas.getContext("2d");


    g = new Grid();

   printer = new Printer(g,arrayGraphics);

   call_print = setInterval(print,0.1);

   Canvas.onmousedown = function(evt){

       for(var i = 0; i<arrayGraphics.length; i++){
           if ((arrayGraphics[i].isVisible == false) || (!arrayGraphics[i].isResize ) )
             continue;

                   for(var j = 0; j < arrayGraphics[i].arrayPontos.length; j++){
                        if(arrayGraphics[i].arrayPontos [j].click(evt)==true){
                            GraphicTarget = arrayGraphics[i];
                            PointTarget =  arrayGraphics[i].arrayPontos [j];
                            i = arrayGraphics.length;
                            break;
                        }
                    }
        }
    }

    Canvas.onmouseup = function(){

        GraphicTarget = null
        PointTarget = null;
        printer.print();
    }

    Canvas.onmousemove = function(evt){

         if(GraphicTarget != null){

            var rect = Canvas.getBoundingClientRect();

            var pos = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };

            pos.y -= GraphicTarget.Vm*((HeightCanvas/GraphicTarget.Vm)/2);

            if(PointTarget.up)
                GraphicTarget.setVm(-pos.y);
            else
               GraphicTarget.setVm(pos.y);

        }else{
                var showPointResizeVertical;
                var showPointResizeHorizontal;

                for(var i = 0; i<arrayGraphics.length; i++){
                    if ((arrayGraphics[i].isVisible == false) || (!arrayGraphics[i].isResize ) )
                        continue;

                        for(var j = 0; j < arrayGraphics[i].arrayPontos.length; j++){
                            if(arrayGraphics[i].arrayPontos [j].click(evt)==true){
                                showPointResizeVertical = true;
                                i=arrayGraphics.length;
                                break;
                            }
                        }
                }

                if(showPointResizeVertical)
                  Canvas.style.cursor = "n-resize";
                else
                    Canvas.style.cursor = "default";

                }
       }
};



var print = function(){
    printer.print();
}


var loadFiles = function(){

    var qtdFiles = 3;

    var ponto1;
    var ponto2;
    var ponto3;

    ponto1 = new Image();
    ponto1.src = "resource/img/ponto_azul.png";
    ponto1.onload = function(){  arrayImgPoints[0]=ponto1;  };

    ponto2 = new Image();
    ponto2.src = "resource/img/ponto_verd.png";
    ponto2.onload = function(){  arrayImgPoints[1]=ponto2;  };

    ponto3 = new Image();
    ponto3.src = "resource/img/ponto_verm.png";
    ponto3.onload = function(){  arrayImgPoints[2]=ponto3;  };



    Functionloaging = setInterval(function(){
        if(arrayImgPoints.length >= qtdFiles){
            init();
            clearInterval(Functionloaging);
        }
        return;
    }, 0.1);

}


/* Cria um Gráfico novo
*  Adiciona ao arrayGraphics
*  Cria o panel do Graphics
*/
var createGraphic = function(Vm, w, o){

    var cor;

    if(proximaCor==0){
      cor = COR_VERMELHO;
      proximaCor++;
    }else if(proximaCor==1){
        cor = COR_VERDE;
        proximaCor++;
    }else if(proximaCor==2){
        cor = COR_AZUL;
        proximaCor=0;
    }

    var gr =new Graphic(idDisponivel++,Vm, w, o, cor);
    arrayGraphics.push(gr);
    //printer.graphics.push(g);

    printer.print();


};

