
//*******************************************************  MODULO EXPORTAR *******************************************


//Exibe a tela como o canvas exportado como imagem
//É necessário que o usuário salve a imagem
var exportProject_asImage = function(){

    var image = Canvas.toDataURL("image/png");

    var elem = "<div id='panel-exportimage'>"+
        "<div class='title'>PROJETO EXPORTADO</div>"+
        "<div class='bt_close' id='bt_close_export'>X </div>"+
        "<div class='subtitle'>Salve a imagem clicando com o botão direito do mouse " +
        "sobre ela e selecionando a opção <i>Salvar Imagem Como</i></div>"+
        "<img src="+image+"></div>"+
        "<div id='background_save'></div>";

    $("#container_main").append(elem);

    $("#bt_close_export").click(function(){
        $("#panel-exportimage").remove();
        $("#background_save").remove();

    });

}
