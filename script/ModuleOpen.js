//*********************************************** MÓDULO ABRIR ******************************************


//Exibe a tela com a lista dos projetos armazenados
var openProjectList = function(){

    var elem =  "<div id='panel-open-project'>"+
        "<div class='title'>ABRIR PROJETO</div>"+
        "<div class='bt_close' id='bt_close_open_project' >X</div>"+
        "<div id='container_project_saved'></div></div>"+
        "<div id='background_save'></div>";

    $("#container_main").append(elem);

    var allStoraged = getProjectList();

    $("#container_project_saved").append(allStoraged);
    $("#bt_close_open_project").click(function(){
        $("#panel-open-project").remove();
        $("#background_save").remove();

    });

}

//Obtem a lista de projetos armazenados no "local storage"
var getProjectList = function(){

    var allStoraged = "";

    for(i=0;i < localStorage.length; i++){
        allStoraged += " <p class='project_saved_name'>" + localStorage.key(i) + "<p>";
    }

    return allStoraged;

}