
var Graphic = function(id,Vm, w, o, cor, titulo){


    var instacia = this;

    this.Vm = Vm;
    this.w = w;
    this.o = o;
    this.cor = cor;
    this.arrayPontos = new Array();
    this.arrayQuadrado = new Array();
    //forcando a impressao
    this.Vmchanged = true;
    this.Wchanged = true;

    this.id=id;
    this.idpanel = "Graphic"+this.id;
    this.isVisible = true;
    this.isResize_v = false;
    this.isResize_h = false;
    this.isMove = false;
    this.deleteMe = false;

    if(id==0 || id==1)
     titulo+=" A";
    else if(id==2 || id==3 )
     titulo+=" B";
    else if(id=4 || id==5)
     titulo+=" C";

    createPanel = function(){

        typepanel = "";
        labelcor = "";
        if(cor == COR_VERMELHO || cor == COR_VERMELHO2){
            typepanel="painel_verm";
            labelcor="label-verm";
        }else  if(cor == COR_VERDE || cor == COR_VERDE2){
            typepanel="painel_verd";
            labelcor="label-verd";
        }else if(cor == COR_AZUL ||cor == COR_AZUL2){
            typepanel="painel_azul";
            labelcor="label-azul";
        }
        var elem =
            "<div id='panel"+id+"' class='panel "+typepanel+"' >"+
            "<div class='panel-heading'>"+
            "<h3 class='panel-title'><b>"+titulo+"</b>"+
            "<div style='float: left'></div> "+
            "<div style='float: right'>"+

            "<span id='cont-bt-edit-"+id+"'  class='label label-default  "+labelcor+"' labelcor='"+labelcor+"'>"+
            "<span id='bt-edit-"+id+"' style='margin: 0px' class='glyphicon glyphicon-pencil' aria-hidden='true'></span>"+
            "</span>"+

            "<span id='cont-bt-refresh-"+id+"'  class='label label-default  "+labelcor+"' labelcor='"+labelcor+"'>"+
            "<span id='bt-resize-v-"+id+"' style='margin: 0px' class='glyphicon glyphicon-refresh' aria-hidden='true'></span>"+
            "</span>"+

            "<span id='cont-bt-resize-v-"+id+"'  class='label label-default  "+labelcor+"' labelcor='"+labelcor+"'>"+
            "<span id='bt-resize-v-"+id+"' style='margin: 0px' class='glyphicon glyphicon-resize-vertical' aria-hidden='true'></span>"+
            "</span>"+

            "<span id='cont-bt-resize-h-"+id+"'  class='label label-default  "+labelcor+"' labelcor='"+labelcor+"'>"+
            "<span id='bt-resize-h-"+id+"' style='margin: 0px' class='glyphicon glyphicon-resize-horizontal' aria-hidden='true'></span>"+
            "</span>"+

            "<span id='cont-bt-move"+id+"' class='label label-default  "+labelcor+"'  labelcor='"+labelcor+"'>"+
            "<span id='bt-move"+id+"' style='margin: 0px' class='glyphicon glyphicon-move' aria-hidden='true'></span>"+
            "</span>"+

            "<span id='cont-bt-visible"+id+"' class='label label-default  "+labelcor+"'  labelcor='"+labelcor+"'>"+
            "<span id='bt-visible"+id+"' class='glyphicon glyphicon-eye-open' aria-hidden='true'></span>"+
            "</span>"+

            "<span id='cont-bt-excluir"+id+"' class='label label-default  "+labelcor+"'  labelcor='"+labelcor+"'>"+
            "<span id='bt-excluir"+id+"' class='glyphicon glyphicon-trash' aria-hidden='true'></span>"+
            "</span>"+

            "</div>" +
            "</h3>" +
            "</div>"+

         //   "<div id='Graphic"+id+"' class='panel-body'>"+
            "<div id='Graphic"+id+"' class='panel-body'>"+
            "<div class='row'> " +
            "<div class='col-md-4'>"+
            "<p> V = Vm * sen ( &omega; t  +  &theta; )</p>"+
            "</div>" +
            "<div class='col-md-6'>"+
                "<p> <b>Vm </b>(AMPLITUDE MAXIMA) =  <input type='text'  value='0' size='3' > </p>"+
                "<p> <b>&omega; </b> (FREQUENCIA ANGULAR) = <input type='text'  value='0' size='3' > </p>"+
                "<p> <b>&theta; </b> (ANGULO DE FASE) = <input type='text'  value='0' size='3' > </p>"+
            "</div>"+
            "</div></div>";


            var a = this;
        $("#panel-graficos").append(elem);

        $("#cont-bt-visible"+id).click(function(){

            if(instacia.isVisible){
                instacia.isVisible = false;
                $("#bt-visible"+id).removeClass("glyphicon-eye-open");
                $("#bt-visible"+id).addClass("glyphicon-eye-close");
            }else{
                instacia.isVisible  = true;
                $("#bt-visible"+id).addClass("glyphicon-eye-open");
                $("#bt-visible"+id).removeClass("glyphicon-eye-close");
            }

        });


        $("#cont-bt-excluir"+id).click(function(){
            console.log("delete")
            instacia.deleteMe = true;
            $("#panel"+id).remove();


        });

        $("#cont-bt-refresh-"+id).click(function(){
            instacia.Vm = 100;
			instacia.w = 4;
			instacia.o = 0;
			instacia.Vmchanged = true;
			instacia.Wchanged = true;
        });

        $("#cont-bt-resize-v-"+id).click( function(){
            //ativa
            if(instacia.isResize_v == false){
                instacia.isResize_v = true;
                $(this).removeClass(  $(this).attr('labelcor'));
                $(this).addClass(  $(this).attr('labelcor')+"-active");
            //desativa
            }else{
                instacia.isResize_v = false;
                $(this).removeClass( $(this).attr('labelcor')+"-active");
                $(this).addClass( $(this).attr('labelcor'));
            }


            if(instacia.isResize_h == true){
                instacia.isResize_h = false;
                var elem = document.getElementById("cont-bt-resize-h-"+id);
                $("#cont-bt-resize-h-"+id).removeClass( elem.getAttribute('labelcor')+"-active");
                $("#cont-bt-resize-h-"+id).addClass( elem.getAttribute('labelcor'));
            }

            if(instacia.isMove == true){
                instacia.isMove = false;
                var elem = document.getElementById("cont-bt-move"+id);
                $("#cont-bt-move"+id).removeClass(elem.getAttribute('labelcor')+"-active");
                $("#cont-bt-move"+id).addClass(elem.getAttribute('labelcor'));

            }
        });


        $("#cont-bt-resize-h-"+id).click(function(){

            //ativa
            if(instacia.isResize_h == false){
                instacia.isResize_h = true;
                $(this).removeClass($(this).attr('labelcor'));
                $(this).addClass( $(this).attr('labelcor')+"-active");

            //desativa
            }else{
                instacia.isResize_h = false;
                $(this).removeClass($(this).attr('labelcor')+"-active");
                $(this).addClass( $(this).attr('labelcor'));

            }


            if(instacia.isResize_v == true){
                instacia.isResize_v = false;
                var elem = document.getElementById("cont-bt-resize-v-"+id);
                $("#cont-bt-resize-v-"+id).removeClass( elem.getAttribute('labelcor')+"-active");
                $("#cont-bt-resize-v-"+id).addClass( elem.getAttribute('labelcor'));
            }


            if(instacia.isMove == true){
                instacia.isMove = false;
                var elem = document.getElementById("cont-bt-move"+id);
                //               var elem = document.getElementById("cont-bt-resize"+id);
                $("#cont-bt-move"+id).removeClass(elem.getAttribute('labelcor')+"-active");
                $("#cont-bt-move"+id).addClass(elem.getAttribute('labelcor'));

            }
        });



        $("#cont-bt-move"+id).click(function(){

            if(instacia.isMove == false){
                instacia.isMove = true;
                $(this).removeClass( $(this).attr('labelcor')  );
                $(this).addClass($(this).attr('labelcor')+"-active");
            }else{
                instacia.isMove = false;
                $(this).removeClass($(this).attr('labelcor')+"-active");
                $(this).addClass( $(this).attr('labelcor')  );

            }


            if(instacia.isResize_h == true){
                instacia.isResize_h = false;
                var elem = document.getElementById("cont-bt-resize-h-"+id);
                $("#cont-bt-resize-h-"+id).removeClass( elem.getAttribute('labelcor')+"-active");
                $("#cont-bt-resize-h-"+id).addClass( elem.getAttribute('labelcor'));
            }


            if(instacia.isResize_v == true){
                instacia.isResize_v = false;
                var elem = document.getElementById("cont-bt-move"+id);
                $("#cont-bt-resize-v-"+id).removeClass(elem.getAttribute('labelcor')+"-active");
                $("#cont-bt-resize-v-"+id).addClass(elem.getAttribute('labelcor'));

            }


        });




    };




    createPanel();



}


Graphic.prototype.setVm = function(Vm){
    this.Vm = Vm;
    this.Vmchanged = true;
}


Graphic.prototype.setW = function(w){

    this.w += w;

    if( this.w > 360){
        this.w = 360;
    }else if( this.w < 0){
      this.w = 0;
    }
this.Wchanged = true;
}


Graphic.prototype.print = function(){

   if(this.isVisible){

            if(this.Vmchanged){
                console.log("a");
                this.arrayPontos = new Array();
             //   this.Vmchanged = false;
                this.printPanel();
            }


           if(this.Wchanged){
               console.log("a");
               this.arrayQuadrado= new Array();
              // this.Wchanged = false;
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

            //implementação futura do Zoom
            var zoom = 1;


            /*TRANLADANDO O CANVAS
             **** Vertical => 0
             **** Horizontal => Amplitude * ((o tamanho da tela/Amplitude)*2) <= Essa equação centraliza
             * horizontalmente o gráfico em função da sua amplitude
             */


            //cor vermelha
            Context.strokeStyle = this.cor;

            //sizeline
            Context.lineWidth = 1;

       //melhorando o desempenho
       if((this.Wchanged) || (this.Vmchanged)){

           Context.save();
           Context.translate(0,this.Vm*((HeightCanvas/this.Vm)/2));
           Context.beginPath();

            while( t <= WidthCanvas){

                //Context.moveTo(AntX,AntY);

                AtuX = t;

                AtuX/zoom;

                //Formula do gráfico seno
               // AtuY =  this.Vm * Math.sin( ( (this.w*Math.PI/180)*AtuX/zoom + this.o ))/zoom;
                AtuY =  this.Vm * Math.sin( ( (this.w*Math.PI/180)*t + this.o ));

                Context.lineTo(AtuX,AtuY);
                Context.stroke();

                if(this.isResize_v){
                    if(subindo && AtuY < AntY){
                        subindo = false;
                        var p = new Point(arrayImgLoad,AntX-5, AntY-5, 10, 10, this.Vm, this.cor,AntY<0?true:false);
                        this.arrayPontos.push(p);

                    }else  if(!subindo && AtuY > AntY){
                        subindo = true;
                        var p = new Point(arrayImgLoad,AntX-5, AntY-5, 10, 10, this.Vm, this.cor,AntY<0?true:false);
                        this.arrayPontos.push(p);

                    }

                }else if(this.isResize_h){

                    if((AntY > 0 && AtuY-5 < 0) || (AntY < 0 && AtuY+5 > 0)) {

                        var p = new Squere(arrayImgLoad,AntX-5, 0, 10, 10, this.Vm, this.cor);
						if(this.arrayQuadrado.length == 0)
                            this.arrayQuadrado.push(p);
                        else
                            this.arrayQuadrado[1]= p;

                    }
                }



                AntX = AtuX;
                AntY = AtuY;

                //Resolvendo o problema de curva
                //Se t+=2 para cada ponto o tempo de cálco iria almentar significantemente
                //No entanto t+=10 causa curvas brusca, sendo assim analiso se o ponto está próximo
                //Ao limite e façp t+=2;
                if ( (AntY > this.Vm - 50) || (AntY < -this.Vm + 50))
                t+=2;
                else
                t+=10;

                }

            this.Wchanged = false;
            this.Vmchanged = false;

           }

           Context.restore();


         if(this.isResize_v){
            this.printAlcaVertical();
         }else if (this.isResize_h){
             this.printAlcaHorizontal();
         }

   }

};

//Imprime as Alças Vesticias
Graphic.prototype.printAlcaVertical = function(){

    Context.save();
    Context.translate(0,this.Vm*((HeightCanvas/this.Vm)/2));
    //Printing points
        for(var i=0; i<this.arrayPontos.length;i++)
            Context.drawImage(this.arrayPontos[i].image, this.arrayPontos[i].x, this.arrayPontos[i].y, this.arrayPontos[i].h, this.arrayPontos[i].w);

    Context.restore();
}

Graphic.prototype.printAlcaHorizontal = function(){
    Context.save();
    Context.translate(0,this.Vm*((HeightCanvas/this.Vm)/2));
    //Printing points
    for(var i=0; i<this.arrayQuadrado.length;i++)
        Context.drawImage(this.arrayQuadrado[i].image, this.arrayQuadrado[i].x, this.arrayQuadrado[i].y, this.arrayQuadrado[i].h, this.arrayQuadrado[i].w);

    Context.restore();

}
Graphic.prototype.printPanel = function(){



    $("#"+this.idpanel).html("<div class='row'> " +
        "<div class='col-md-4'>"+
        "<p> V = Vm * sen ( &omega; t  +  &theta; )</p>"+
        "</div>" +
        "<div class='col-md-6'>"+
        "<p> <b>Vm </b>(AMPLITUDE MAXIMA) = <input type='text'  value='"+this.Vm.toFixed(0)+"' size='3' ></p>"+
        "<p> <b>&omega; </b> (FREQUENCIA ANGULAR) = <input type='text'  value='"+this.w.toFixed(0)+"' size='3' > </p>"+
        "<p> <b>&theta; </b> (ANGULO DE FASE) =   <input type='text'  value='"+this.o+"' size='3' > </p>"+
        "</div>"+
    "</div>");


  //  $("#"+this.idpanel).html( "<p> V = Vm  + sen(&omega;t + &theta;)</p><p><b>Vm </b>(AMPLITUDE MAXIMA) = "+this.Vm.toFixed(2)+"</p> <p> <b>&omega;</b> (FREQUENCIA ANGULAR) =  "+this.w.toFixed(0)+"" +
  //      "</p> <p> <b>&theta;</b> (ANGULO DE FASE) =  "+this.o+"</p>");
};

