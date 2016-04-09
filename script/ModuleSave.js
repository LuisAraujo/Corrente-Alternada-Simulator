//SALVAR

var updateNameBrowser = function(string){
    if(string == undefined || string == null)
        string = "";

    document.title = nameCurrentProject+string;


}


var previewSavingProject = function(){

    var elem = "<div id='panel-save'>"+
        "<div class='title'>Salvar Projeto</div>"+
        "<div id='container_nome'> Nome: <input  id='name_project' type='text'/> </div>"+
        "<input id='bt_saveproject' type='button' value='Salvar' />"+
        "<input id='bt_cancelproject' type='button' value='Cancelar' />"+
        "<div id='alert_mensage' style='display: none'> Informe um nome válido! </div> </div>"+
        "<div id='background_save'></div>"


    $("#container_main").append(elem);

    $("#bt_saveproject").click(function(){
        saveProject($("#name_project").val());
    });

    $("#bt_cancelproject").click(function(){
        $("#panel-save").remove();
        $("#background_save").remove();
    });


    $("#name_project").focus(function(){
        sendMensageSave(-1);
    })

}

//Salva o projeto ou não
var saveProject  = function(name){


    //se o nome for vazio, envia um alerta
    if(name == ""){
        sendMensageSave(0);
        return;
    }
    //atribui o parametro ao nome do projeto atual
    nameCurrentProject = name;

    //verifica se já existe um projeto como o mesmo nome
    if(localStorage.getItem(name) != null){

        alert("já existe!");

    }else{
        //armazena no local storeg (é necessário fazer uma conversao do Array para String ainda)
        localStorage.setItem(name,"teste");
    }

    //atualiza o nome do projeto no navegador
    updateNameBrowser();

    $("#panel-save").remove();
    $("#background_save").remove();

}


//Envia mensagem à tela de Salvamento do Projeto
var sendMensageSave = function(erro){

    if(erro == -1){
        $("#alert_mensage").hide();
        return;
    }

    $("#alert_mensage").show();

    if(erro == 0)
        $("#alert_mensage").html = "Informe um nome válido!";

}
