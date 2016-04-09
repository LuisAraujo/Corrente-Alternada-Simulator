
var Graphic = function(id,Vm, w, o, cor, titulo){


    var instacia = this;

    this.Vm = Vm;
    this.w = w;
    this.o = o;
    this.cor = cor;
    this.arrayAlcaVm = new Array();
    this.arrayAlcaW = new Array();
    this.AlcaO = null;
    //forcando a impressao
    this.Vmchanged = true;
    this.Wchanged = true;

    this.id=id;
    this.idpanel = "Graphic"+this.id;
    this.isVisible = true;
    this.isChange_w = false;
    this.isChange_vm = false;
    this.isChange_o = false;
    this.isEditable = false;
    this.isMove = false;
    this.deleteMe = false;


    //Para o modo Edit
    this.lastValueW=0;
    this.lastValueVm=0;
    this.lastValueO=0;

    if(id==0 || id==1)
     titulo+=" A";
    else if(id==2 || id==3 )
     titulo+=" B";
    else if(id==4 || id==5)
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
            "<div class='col-md-7'>"+
                "<p> <b>Vm </b>(AMPLITUDE MAXIMA) =  <input id='txVm"+id+"' type='text'  value='0' size='3' disabled/> </p>"+
                "<p> <b>&omega; </b> (FREQUENCIA ANGULAR) = <input id='txW"+id+"' type='text'  value='0' size='3' disabled/> </p>"+
                "<p> <b>&theta; </b> (ANGULO DE FASE) = <input id='txO"+id+"' type='text'  value='0' size='3' disabled/> </p>"+
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
            instacia.deleteMe = true;

            if(id%2 == 0){
                $("#panel"+id).remove();
                $("#panel"+(parseInt(id)+1)).remove();
                arrayGraphics.getById(parseInt(id)+1).deleteMe = true;
            }else{
                $("#panel"+id).remove();
                $("#panel"+(parseInt(id)-1)).remove();
                arrayGraphics.getById(parseInt(id)-1).deleteMe = true;

            }


            $("#bt-add-graphic").show();

        });

        $("#cont-bt-refresh-"+id).click(function(){
            instacia.Vm = 100;
			instacia.w = 6.28;
			instacia.o = 0;
			instacia.Vmchanged = true;
			instacia.Wchanged = true;
        });

        $("#cont-bt-resize-v-"+id).click( function(){
            //ativa
            if(instacia.isChange_w == false){
                instacia.isChange_w = true;
                $(this).removeClass(  $(this).attr('labelcor'));
                $(this).addClass(  $(this).attr('labelcor')+"-active");
            //desativa
            }else{
                instacia.isChange_w = false;
                $(this).removeClass( $(this).attr('labelcor')+"-active");
                $(this).addClass( $(this).attr('labelcor'));
            }


            if(instacia.isChange_vm == true){
                instacia.isChange_vm = false;
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
            if(instacia.isChange_vm == false){
                instacia.isChange_vm = true;
                $(this).removeClass($(this).attr('labelcor'));
                $(this).addClass( $(this).attr('labelcor')+"-active");

            //desativa
            }else{
                instacia.isChange_vm = false;
                $(this).removeClass($(this).attr('labelcor')+"-active");
                $(this).addClass( $(this).attr('labelcor'));

            }


            if(instacia.isChange_w == true){
                instacia.isChange_w = false;
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
                instacia.isChange_o = true;
                $(this).removeClass( $(this).attr('labelcor')  );
                $(this).addClass($(this).attr('labelcor')+"-active");
            }else{
                instacia.isChange_o = false;
                instacia.isMove = false;
                $(this).removeClass($(this).attr('labelcor')+"-active");
                $(this).addClass( $(this).attr('labelcor')  );

            }


            if(instacia.isChange_vm == true){
                instacia.isChange_vm = false;
                var elem = document.getElementById("cont-bt-resize-h-"+id);
                $("#cont-bt-resize-h-"+id).removeClass( elem.getAttribute('labelcor')+"-active");
                $("#cont-bt-resize-h-"+id).addClass( elem.getAttribute('labelcor'));
            }


            if(instacia.isChange_w == true){
                instacia.isChange_w = false;
                var elem = document.getElementById("cont-bt-move"+id);
                $("#cont-bt-resize-v-"+id).removeClass(elem.getAttribute('labelcor')+"-active");
                $("#cont-bt-resize-v-"+id).addClass(elem.getAttribute('labelcor'));

            }


        });


        $("#cont-bt-edit-"+id).click(function(){


            if(instacia.isEditable){
                instacia.isEditable = false;

                $(this).removeClass(  $(this).attr('labelcor')+"-active");
                $(this).addClass(  $(this).attr('labelcor'));

                $("#txVm"+instacia.id).attr('disabled',true);
                $("#txW"+instacia.id).attr('disabled', true);
                $("#txO"+instacia.id).attr('disabled', true);


            }else{
                instacia.isEditable = true;
                $(this).removeClass(  $(this).attr('labelcor'));
                $(this).addClass(  $(this).attr('labelcor')+"-active");

                $("#txVm"+instacia.id).removeAttr('disabled');
                $("#txW"+instacia.id).removeAttr('disabled');
                $("#txO"+instacia.id).removeAttr('disabled');

            }
            //forca atualização do panel
            instacia.Vmchanged = true;

        });

        //INPUTS (Vm, W, O)
        $("#txVm"+id).focus(function(){
            instacia.lastValueVm = $(this).val();
        });

        $("#txVm"+id).change(function(){
            if(isNaN($(this).val()) == true ){
                $(this).val(instacia.lastValueVm);
                instacia.Vm = parseFloat(instacia.lastValueVm);
                instacia.Vmchanged = true;
            }else{
                instacia.Vm = parseFloat($(this).val());
                instacia.Vmchanged = true;
            }

        });


        $("#txW"+id).focus(function(){
            instacia.lastValueW = $(this).val();
        });

        $("#txW"+id).change(function(){
            if(isNaN( $(this).val()) == true ){
                console.log("!isNaN  "+$(this).val());
                $(this).val(instacia.lastValueW);
                instacia.w = parseFloat(instacia.lastValueW);
                instacia.Wchanged = true;
            }else{
                console.log("isNaN"+$(this).val());
                instacia.w = parseFloat($(this).val());
                instacia.Wchanged = true;
            }

        });



        $("#txO"+id).change(function(){
            instacia.lastValueO = $(this).val();
        });

        $("#txO"+id).blur(function(){
            if(isNaN( $(this).val()) == true ){
                $(this).val(instacia.lastValueO);
                instacia.o = parseFloat(instacia.lastValueO);
               // instacia.Ochanged = true;
            }else{
                instacia.o = parseFloat($(this).val());
                instacia.Ochanged = true;
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
                this.arrayAlcaVm = new Array();
                this.Vmchanged = false;
                this.changePanel();
            }


           if(this.Wchanged){
               this.arrayAlcaW= new Array();
               this.Wchanged = false;
               this.changePanel();
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

           Context.save();
           Context.translate(0,this.Vm*((HeightCanvas/this.Vm)/2));
           Context.beginPath();

           while(t <= WidthCanvas/1000){

                AtuX =  t*1000;

                /*Transladando 5 pixel a cord x
                / para inicio afastado da margem
                */
                AtuX+=5;

                /* Fórmula do Gráfico da
                 / Corrente Alternada
                 */
                AtuY =  this.Vm * Math.sin( this.w * t + this.o );

                Context.lineTo(AtuX,AtuY);
                Context.stroke();


               //Imprimindo as alças
                if(this.isChange_w){
                    if(subindo && AtuY < AntY){
                        subindo = false;

                        var up = null;

                        if(AtuY>0)
                         up = false;
                        else
                         up = true;

                        var p = new AlcaVm(arrayImgLoad,AntX-5, AntY-5, 10, 16, this.Vm, this.cor,up);
                        this.arrayAlcaVm.push(p);

                    }else  if(!subindo && AtuY > AntY){
                        subindo = true;
                        var p = new AlcaVm(arrayImgLoad,AntX-5, AntY-8, 10, 16, this.Vm, this.cor,up);
                        this.arrayAlcaVm.push(p);

                    }

                }else if(this.isChange_vm){

                    if((AntY > 0 && AtuY-5 < 0) || (AntY < 0 && AtuY+5 > 0)) {

                        var p = new Squere(arrayImgLoad,AntX-5, 0, 16, 10, this.Vm, this.cor);
						if(this.arrayAlcaW.length == 0)
                            this.arrayAlcaW.push(p);
                        else
                            this.arrayAlcaW[1]= p;

                    }
                }else if(this.isChange_o){
                        this.AlcaO = new AlcaO(arrayImgLoad, WidthCanvas/2-10,-10, 20, 20, this.o, this.cor);
                }






                AntX = AtuX;
                AntY = AtuY;


                t+=0.003;

                }

            this.Wchanged = false;
            this.Vmchanged = false;

            Context.restore();


         if(this.isChange_w){
            this.printAlcaVertical();
         }else if (this.isChange_vm){
             this.printAlcaHorizontal();
         }else if(this.isChange_o){
             this.printAlcaMove();
         }
   }

};

//Imprime as Alças Vesticias
Graphic.prototype.printAlcaVertical = function(){

    Context.save();
    Context.translate(0,this.Vm*((HeightCanvas/this.Vm)/2));
    //Printing points
        for(var i=0; i<this.arrayAlcaVm.length;i++)
            Context.drawImage(this.arrayAlcaVm[i].image, this.arrayAlcaVm[i].x, this.arrayAlcaVm[i].y, this.arrayAlcaVm[i].h, this.arrayAlcaVm[i].w);

    Context.restore();
}

Graphic.prototype.printAlcaHorizontal = function(){
    Context.save();
    Context.translate(0,this.Vm*((HeightCanvas/this.Vm)/2));
    //Printing points
    for(var i=0; i<this.arrayAlcaW.length;i++)
        Context.drawImage(this.arrayAlcaW[i].image, this.arrayAlcaW[i].x, this.arrayAlcaW[i].y, this.arrayAlcaW[i].h, this.arrayAlcaW[i].w);

    Context.restore();

}

Graphic.prototype.printAlcaMove = function(){

    Context.save();
    Context.translate(0,this.Vm*((HeightCanvas/this.Vm)/2));
    //Printing points
    Context.drawImage(this.AlcaO.image, this.AlcaO.x, this.AlcaO.y, this.AlcaO.h, this.AlcaO.w);

    Context.restore();

}


Graphic.prototype.printPanel = function(){

    str= "<div class='row'> " +
        "<div class='col-md-4'>"+
        "<p> V = Vm * sen ( &omega; t  +  &theta; )</p>"+
        "</div>" +
        "<div class='col-md-6'>";

      if (!this.isEditable){

            str+="<p> <b>Vm </b>(AMPLITUDE MAXIMA) = <input id='txVm"+this.id+"' type='text'  value='"+this.Vm.toFixed(0)+"' size='3' disable></p>"+
            "<p> <b>&omega; </b> (FREQUENCIA ANGULAR) = <input id='txW"+this.id+"' type='text'  value='"+this.w.toFixed(2)+"' size='3' disabled> </p>"+
            "<p> <b>&theta; </b> (ANGULO DE FASE) =   <input id='txO"+this.id+"' type='text'  value='"+this.o+"' size='3' disabled> </p>"+
            "</div>";
       }else{

            str+="<p> <b>Vm </b>(AMPLITUDE MAXIMA) = <input id='txVm"+this.id+"' type='text'  value='"+this.Vm.toFixed(0)+"' size='3' ></p>"+
            "<p> <b>&omega; </b> (FREQUENCIA ANGULAR) = <input id='txW"+this.id+"' type='text'  value='"+this.w.toFixed(2)+"' size='3' > </p>"+
            "<p> <b>&theta; </b> (ANGULO DE FASE) =   <input id='txO"+this.id+"' type='text'  value='"+this.o+"' size='3' > </p>"+
            "</div>";
      }

    str+="</div>";

    $("#"+this.idpanel).html(str);

};

Graphic.prototype.changePanel = function(){

     $("#txVm"+this.id).val(this.Vm.toFixed(0));
     $("#txW"+this.id).val(this.w.toFixed(2));
     $("#txO"+this.id).val(this.o.toFixed(0));

};