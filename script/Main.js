/**
 * Created by Luis 4raujo on 06/03/15.
 */

var Canvas = null;
//var Context = null;
var distanceVesticalLine = 100;
var distanceHorizontalLine = 100;
var HeightCanvas = 800;
var WidthCanvas = 1000;

var idDisponivel = 0;
var proximaCor = 0;

//Cores
const COR_VERMELHO = "#f99";
const COR_VERDE = "#9f9";
const COR_AZUL = "#99f";

const COR_VERMELHO2 = "#f00";
const COR_VERDE2 = "#0f0";
const COR_AZUL2 = "#00f";


const COR_PRETO = "#000";
const COR_CINZA = "#999";


//Guide
var sizeLine = 20;
var distanceLine = 5;

var printer;
var call_print;

var GraphicTarget = null;
var PointTarget = null;

//resize-h, resize-v ou move
var opcGraphic = null;

var arrayImgLoad = new Array();


var arrayPontos = new Array();
var Functionloaging;

var arrayGraphics = new MyArray();

$(document).ready( function(){


    $("#bt-add-graphic").click(function(){
        createGraphic(300,4,0);
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

   //call_print = setInterval(print,60/1000);
   window.requestAnimationFrame(print);


   Canvas.onmousedown = function(event){

       for(var i = 0; i<arrayGraphics.length; i++){
           if ((arrayGraphics[i].isVisible == false) || ((!arrayGraphics[i].isResize_v ) && ((!arrayGraphics[i].isResize_h )))  )
             continue;
				

                   for(var j = 0; j < arrayGraphics[i].arrayPontos.length; j++){
                        if(arrayGraphics[i].arrayPontos [j].click(event)==true){
                            GraphicTarget = arrayGraphics[i];
                            PointTarget =  arrayGraphics[i].arrayPontos [j];
                          return;
                          //  i = arrayGraphics.length;
                          //  break;
                        }
                    }

                   var rect = Canvas.getBoundingClientRect();

                   posInicial = {
                       x: event.clientX - rect.left,
                       y: event.clientY - rect.top
                   };

		
                   for(var j = 0; j < arrayGraphics[i].arrayQuadrado.length; j++){
                       if(arrayGraphics[i].arrayQuadrado [j].click(event)==true){
                           GraphicTarget = arrayGraphics[i];
                           PointTarget =  arrayGraphics[i].arrayQuadrado [j];
                          return;
                          // i = arrayGraphics.length;
                          // break;
                       }
                   }
        }
    }

    document.onmouseup = function(){

        GraphicTarget = null
        PointTarget = null;
     //   printer.print();
    }

    Canvas.onmousemove = function(event){

          //Se um grafico estive selecionado, pego o y do mouse e modifico o Vm
         if(GraphicTarget != null){

            var rect = Canvas.getBoundingClientRect();

            var pos = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };



            if(GraphicTarget.isResize_v){
                pos.y -= GraphicTarget.Vm*((HeightCanvas/GraphicTarget.Vm)/2);

                if(PointTarget.up)
                    GraphicTarget.setVm(-pos.y);
                else
                   GraphicTarget.setVm(pos.y);

            }else if(GraphicTarget.isResize_h){

                //pos.x -= GraphicTarget.Vm*((HeightCanvas/GraphicTarget.Vm)/2);
                var dif = pos.x -  posInicial.x;

                GraphicTarget.setW(dif/(GraphicTarget.w/2));



            }
        //Senão, vejo se o mouse está em cima do ponto e mudo o mouse para o formato 'resize'
        }else{
                var showPointResizeVertical;
                var showPointResizeHorizontal;

                for(var i = 0; i<arrayGraphics.length; i++){
                    if ((arrayGraphics[i].isVisible == false) || (!arrayGraphics[i].isResize_v ) )
                        continue;

                        for(var j = 0; j < arrayGraphics[i].arrayPontos.length; j++){
                            if(arrayGraphics[i].arrayPontos [j].click(event)==true){
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

    window.requestAnimationFrame(print);
}


var loadFiles = function(){

    var qtdFiles = 6;

    var ponto1;
    var ponto2;
    var ponto3;
    var ponto4;
    var ponto5;
    var ponto6;

    ponto1 = new Image();
    ponto1.src = "resource/img/ponto_azul.png";
    ponto1.onload = function(){  arrayImgLoad[0]=ponto1;  };

    ponto2 = new Image();
    ponto2.src = "resource/img/ponto_verd.png";
    ponto2.onload = function(){  arrayImgLoad[1]=ponto2;  };

    ponto3 = new Image();
    ponto3.src = "resource/img/ponto_verm.png";
    ponto3.onload = function(){  arrayImgLoad[2]=ponto3;  };


    ponto4 = new Image();
    ponto4.src = "resource/img/quadrado_azul.png";
    ponto4.onload = function(){  arrayImgLoad[3]=ponto4;  };

    ponto5 = new Image();
    ponto5.src = "resource/img/quadrado_verd.png";
    ponto5.onload = function(){  arrayImgLoad[4]=ponto5;  };

    ponto6 = new Image();
    ponto6.src = "resource/img/quadrado_verm.png";
    ponto6.onload = function(){  arrayImgLoad[5]=ponto6;  };

    Functionloaging = setInterval(function(){
        if(arrayImgLoad.length >= qtdFiles){
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

    var cor1;
    var cor2

    if(proximaCor==0){
      cor1 = COR_VERMELHO;
      cor2 = COR_VERMELHO2;
      proximaCor++;
    }else if(proximaCor==1){
        cor1 = COR_VERDE;
        cor2 = COR_VERDE2;
        proximaCor++;
    }else if(proximaCor==2){
        cor1 = COR_AZUL;
        cor2 = COR_AZUL2;
        proximaCor=0;
    }

    var gr =new Graphic(idDisponivel++,Vm, w, o, cor1, "TENSAO FASE " );
    arrayGraphics.push(gr);

    var gr2 =new Graphic(idDisponivel++,Vm, w, o, cor2, "CORRENTE FASE ");
    arrayGraphics.push(gr2);
    //printer.graphics.push(g);

    printer.print();


};

