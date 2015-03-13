/**
 * Created by Luis 4raujo on 12/03/15.
 */
var MyArray = function(){};
MyArray.prototype = new Array();

MyArray.prototype.popByIndex = function(index){

    var arrayAux = new MyArray();

    for(var i=0; i < this.length; i++)
        if(i != index)
            arrayAux.push(this[i]);

    while(this.length)
        this.pop();

    for(var i=0; i < arrayAux.length; i++)
        this.push(arrayAux[i]);

    return;

};