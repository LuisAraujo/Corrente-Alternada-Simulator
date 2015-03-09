
var Graphic = function(id,Vm, w, o, cor){


    var instacia = this;

    this.Vm = Vm;
    this.w = w;
    this.o = o;
    this.cor = cor;
    this.arrayPontos = new Array();
    this.Vmchanged = false;
    this.id=id;
    this.idpanel = "Graphic"+this.id;
    this.isVisible = true;
    this.isResize = false;
    this.isMove = false;


    createPanel = function(){

        typepanel = "";
        labelcor = "";
        if(cor == COR_VERMELHO){
            typepanel="painel_verm";
            labelcor="label-verm";
        }else  if(cor == COR_VERDE){
            typepanel="painel_verd";
            labelcor="label-verd";
        }else if(cor == COR_AZUL){
            typepanel="painel_azul";
            labelcor="label-azul";
        }
        var elem =
            "<div class='panel "+typepanel+"' >"+
            "<div class='panel-heading'>"+
            "<h3 class='panel-title'><b>GRÁFICO "+id+"</b>"+
            "<div style='float: left'></div> "+
            "<div style='float: right'>"+
            "<span id='cont-bt-resize"+id+"'  class='label label-default  "+labelcor+"' labelcor='"+labelcor+"'>"+
            "<span id='bt-resize"+id+"' style='margin: 0px' class='glyphicon glyphicon-resize-vertical' aria-hidden='true'></span>"+
            "</span>"+
            "<span id='cont-bt-move"+id+"' class='label label-default  "+labelcor+"'  labelcor='"+labelcor+"'>"+
            "<span id='bt-move"+id+"' style='margin: 0px' class='glyphicon glyphicon-move' aria-hidden='true'></span>"+
            "</span>"+
            "<span  class='label label-default "+labelcor+"'>"+
            "<span id='bt-visible"+id+"' class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>"+
            "</span>"+
            "<span  class='label label-default "+labelcor+"'>"+
            "<span id='bt-excluir"+id+"' class='glyphicon glyphicon-trash' aria-hidden='true'></span>"+
            "</span>"+

            "</div></h3></div>"+
            "<div id='Graphic"+id+"' class='panel-body'>"+
            "<p> <b>Vm</b>(AMPLITUDE MAXIMA) = </p>"+
            "<p> <b>&omega;</b> (FREQUENCIA ANGULAR) = </p>"+
            "<p> <b>&theta;</b> (ANGULO DE FASE) =  </p>"+
            "</div>";



        $("#panel-graficos").append(elem);

        document.getElementById("bt-visible"+id).onclick = function(){

            if(instacia.isVisible){
                instacia.isVisible = false;
                $("#bt-visible"+id).removeClass("glyphicon-eye-open");
                $("#bt-visible"+id).addClass("glyphicon-eye-close");
            }else{
                instacia.isVisible  = true;
                $("#bt-visible"+id).addClass("glyphicon-eye-open");
                $("#bt-visible"+id).removeClass("glyphicon-eye-close");
            }

        };


        document.getElementById("bt-excluir"+id).onclick = function(){
            instacia = null;
        };



        document.getElementById("bt-resize"+id).onclick = function(){
            if(instacia.isResize == false){
                instacia.isResize = true;
                var elem = document.getElementById("cont-bt-resize"+id);
                $("#cont-bt-resize"+id).removeClass( elem.getAttribute('labelcor'));
                $("#cont-bt-resize"+id).addClass( elem.getAttribute('labelcor')+"-active");
            }

            if(instacia.isMove == true){
                instacia.isMove = false;
                var elem = document.getElementById("cont-bt-move"+id);
 //               var elem = document.getElementById("cont-bt-resize"+id);
                $("#cont-bt-move"+id).removeClass(elem.getAttribute('labelcor')+"-active");
                $("#cont-bt-move"+id).addClass(elem.getAttribute('labelcor'));

            }
        };



        document.getElementById("bt-move"+id).onclick = function(){

            if(instacia.isMove == false){
                instacia.isMove = true;
                var elem = document.getElementById("cont-bt-move"+id);
                $("#cont-bt-move"+id).removeClass( elem.getAttribute('labelcor')  );
                $("#cont-bt-move"+id).addClass(elem.getAttribute('labelcor')+"-active");


            }

            if(instacia.isResize == true){
                instacia.isResize = false;
                var elem = document.getElementById("cont-bt-move"+id);
                $("#cont-bt-resize"+id).removeClass(elem.getAttribute('labelcor')+"-active");
                $("#cont-bt-resize"+id).addClass(elem.getAttribute('labelcor'));

            }


        };




    };




    createPanel();



}


Graphic.prototype.setVm = function(Vm){
    this.Vm = Vm;
    this.Vmchanged = true;
}


Graphic.prototype.print = function(){

   if(this.isVisible){

            if(this.Vmchanged){
                this.arrayPontos = new Array();
                Vmchanged = false;
                this.printPanel();
            }


            var subindo= true;

            //Guarda a posição (ponto) anterior
            var AntX = 0;
            var AntY = 0;
            //Posição (ponto) atual
            var AtuX = -10;
            var AtuY = 100;

            //Tempo-Periodo
            var t = 0;


            /*TRANLADANDO O CANVAS
             **** Vertical => 0
             **** Horizontal => Amplitude * ((o tamanho da tela/Amplitude)*2) <= Essa equação centraliza
             * horizontalmente o gráfico em função da sua amplitude
             */
            Context.save();

            Context.translate(0,this.Vm*((HeightCanvas/this.Vm)/2));
            Context.beginPath();


            //cor vermelha
            Context.strokeStyle = this.cor;

            //sizeline
            Context.lineWidth = 1;

            while( t <= WidthCanvas){

                Context.moveTo(AntX,AntY);

                AtuX = t;

                //Formula do gráfico seno
                AtuY =  this.Vm * Math.sin(this.w*t + this.o);

                Context.lineTo(AtuX,AtuY);
                Context.stroke();

                if(subindo && AtuY < AntY){
                    subindo = false;
                    var p = new Point(arrayImgPoints,AntX-5, AntY-5, 10, 10, this.Vm, this.cor,AntY<0?true:false);
                    this.arrayPontos.push(p);

                }else  if(!subindo && AtuY > AntY){
                    subindo = true;
                    var p = new Point(arrayImgPoints,AntX-5, AntY-5, 10, 10, this.Vm, this.cor,AntY<0?true:false);
                    this.arrayPontos.push(p);

                }

                AntX = AtuX;
                AntY = AtuY;

                t+=10;

            }

            Context.restore();


             if(this.isResize)
                this.printAlcaVertical();

   }

};


Graphic.prototype.printAlcaVertical = function(){

    Context.save();
    Context.translate(0,this.Vm*((HeightCanvas/this.Vm)/2));
    //Printing points
        for(var i=0; i<this.arrayPontos.length;i++)
            Context.drawImage(this.arrayPontos[i].image, this.arrayPontos[i].x, this.arrayPontos[i].y, this.arrayPontos[i].h, this.arrayPontos[i].w);

    Context.restore();
}


Graphic.prototype.printPanel = function(){
    $("#"+this.idpanel).html( "<p> <b>Vm </b>(AMPLITUDE MAXIMA) = "+this.Vm.toFixed(2)+"</p> <p> <b>&omega;</b> (FREQUENCIA ANGULAR) =  "+this.w.toFixed(2)+"" +
        "</p> <p> <b>&theta;</b> (ANGULO DE FASE) =  "+this.o+"</p>");
};

