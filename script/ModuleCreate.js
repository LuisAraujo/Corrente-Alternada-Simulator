
//CRIAR
var createProject  = function(){

    projectOpen = true;

    Canvas = document.getElementById("canvas");

    var elem = "<div id='panel-graficos'> </div>" +
        "<button id='bt-add-graphic' type='button' class='btn btn-default btn-sm'>" +
        "<span class='glyphicon glyphicon-plus' aria-hidden='true'></span> </button>";

    $("#painel_main").append(elem);

    //adicionando evento no botão
    $("#bt-add-graphic").click(function(){
        if(arrayGraphics.length>=4)
            $(this).hide();

        if(arrayGraphics.length<=4)
            createGraphics(100,6.28,0);

    });



    var elem2 = "<canvas  id='canvas' height='800' width='1000'>Your Browser not suport HTML Canvas </canvas>";

    $("#cnv_grafico").append(elem2);

    nameCurrentProject = "untitle";

    updateNameBrowser("*");

}



