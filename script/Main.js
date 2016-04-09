/**
 * Created by Luis 4raujo on 06/03/15.
 */

var nameCurrentProject = "";

var projectOpen = false;


var Canvas = null;
//var Context = null;
var distanceVesticalLine = 100;
var distanceHorizontalLine = 100;
var HeightCanvas = 800;
var WidthCanvas = 1030;

var idDisponivel = 0;
var proximaCor = 0;

//Cores
const COR_VERMELHO = "#f55";
const COR_VERDE = "#afa";
const COR_AZUL = "#aaf";

const COR_VERMELHO2 = "#d00";
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

    $("#new_proj").click(function(){
            createProject();
            loadFiles();
    });

    $("#save_proj").click(function(){
        if(projectOpen)
            previewSavingProject();
    });

    $("#open_proj").click(function(){
        openProjectList();
    });


    $("#export_proj_asimage").click(function(){
        exportProject_asImage();
    });


    $("#closeCAs").click(function(){
        $(window).close();
    });

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
           if ((arrayGraphics[i].isVisible == false) || ((!arrayGraphics[i].isChange_w ) && ((!arrayGraphics[i].isChange_vm )))  )
             continue;
				

                   for(var j = 0; j < arrayGraphics[i].arrayAlcaVm.length; j++){
                        if(arrayGraphics[i].arrayAlcaVm [j].click(event)==true){
                            GraphicTarget = arrayGraphics[i];
                            PointTarget =  arrayGraphics[i].arrayAlcaVm [j];
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

		
                   for(var j = 0; j < arrayGraphics[i].arrayAlcaW.length; j++){
                       if(arrayGraphics[i].arrayAlcaW [j].click(event)==true){
                           GraphicTarget = arrayGraphics[i];
                           PointTarget =  arrayGraphics[i].arrayAlcaW [j];
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



            if(GraphicTarget.isChange_w){

                pos.y -= GraphicTarget.Vm*((HeightCanvas/GraphicTarget.Vm)/2);

                if(PointTarget.y < 0 && pos.y < 0 )
                    GraphicTarget.setVm(-pos.y);
                else if (PointTarget.y > 0 && pos.y > 0 )
                   GraphicTarget.setVm(pos.y);

            }else if(GraphicTarget.isChange_vm){

                //pos.x -= GraphicTarget.Vm*((HeightCanvas/GraphicTarget.Vm)/2);
                var dif = pos.x - posInicial.x;

                GraphicTarget.setW(-dif/1000);



            }
        //Senão, vejo se o mouse está em cima do ponto e mudo o mouse para o formato 'resize'
        }else{
                var showPointResizeVertical;
                var showPointResizeHorizontal;
                var showPointResizeMove;

                for(var i = 0; i<arrayGraphics.length; i++){
                    if ((arrayGraphics[i].isVisible == false) || (!arrayGraphics[i].isChange_w ) )
                        continue;

                        for(var j = 0; j < arrayGraphics[i].arrayAlcaVm.length; j++){
                            if(arrayGraphics[i].arrayAlcaVm [j].click(event)==true){
                                showPointResizeVertical = true;
                                i=arrayGraphics.length;
                                break;
                            }
                        }
                }


                 for(var l = 0; l<arrayGraphics.length; l++){
                     if ((arrayGraphics[l].isVisible == false) || (!arrayGraphics[l].isChange_vm ) )
                         continue;

                     for(var m = 0; m < arrayGraphics[l].arrayAlcaW.length; m++){
                         if(arrayGraphics[l].arrayAlcaW [m].click(event)==true){
                             showPointResizeHorizontal= true;
                             l=arrayGraphics.length;
                             break;
                         }
                     }
                 }



                 for(var o = 0; o <arrayGraphics.length; o++){
                  //   if ((arrayGraphics[o].isVisible == false) || (!arrayGraphics[o].isChange_o ) )
                     if ((arrayGraphics[o].isVisible == false) )
                         continue;

                         if(arrayGraphics[o].AlcaO.click(event)==true){
                             showPointResizeMove = true;
                             o=arrayGraphics.length;
                             break;
                         }

                 }

                if(showPointResizeVertical)
                  Canvas.style.cursor = "n-resize";
                else  if(showPointResizeHorizontal)
                    Canvas.style.cursor = "e-resize";
                else  if(showPointResizeMove)
                    Canvas.style.cursor = "e-resize";
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

    var qtdFiles = 9;

    var ponto1;
    var ponto2;
    var ponto3;
    var ponto4;
    var ponto5;
    var ponto6;
    var ponto7;
    var ponto8;
    var ponto9;

    ponto1 = new Image();
    ponto1.src = "resource/img/vm_azul.png";
    ponto1.onload = function(){  arrayImgLoad[0]=ponto1;  };

    ponto2 = new Image();
    ponto2.src = "resource/img/vm_verd.png";
    ponto2.onload = function(){  arrayImgLoad[1]=ponto2;  };

    ponto3 = new Image();
    ponto3.src = "resource/img/vm_verm.png";
    ponto3.onload = function(){  arrayImgLoad[2]=ponto3;  };


    ponto4 = new Image();
    ponto4.src = "resource/img/w_azul.png";
    ponto4.onload = function(){  arrayImgLoad[3]=ponto4;  };

    ponto5 = new Image();
    ponto5.src = "resource/img/w_verd.png";
    ponto5.onload = function(){  arrayImgLoad[4]=ponto5;  };

    ponto6 = new Image();
    ponto6.src = "resource/img/w_verm.png";
    ponto6.onload = function(){  arrayImgLoad[5]=ponto6;  };


    ponto7= new Image();
    ponto7.src = "resource/img/o_azul.png";
    ponto7.onload = function(){  arrayImgLoad[6]=ponto7;  };

    ponto8 = new Image();
    ponto8.src = "resource/img/o_verd.png";
    ponto8.onload = function(){  arrayImgLoad[7]=ponto8;  };


    ponto9 = new Image();
    ponto9.src = "resource/img/o_verm.png";
    ponto9.onload = function(){  arrayImgLoad[8]=ponto9;  };



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
var createGraphics = function(Vm, w, o){

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




//Fecha a aba (ainda não funciona!)
function tabClose() {
    window.close();
}



