//es el objeto con el cual voy a operar. Click ne la fila > recupero idlegajo > trabajo con este obj.
let vector = [{idLegajo:8485848458, nombre:"Lautaro", apellido:"Rojas"}]; 

function ordenarLegajo(l1, l2){
    if (l1.idLegajo>l2.idLegajo){
        return 1
    }
    if (l1.idLegajo<l2.idLegajo){
        return -1
    }
    return 0
}

//$ para que sea solo un caracter. Viene de JQuery
function $(id){
    // Se le pasa un string
    return document.getElementById(id);
}

//siempre parado en la estrucutra de la tabla
let tabla = $("tabla");

//creamos la sección de encabezado
//nuevo elemento de tipo encabezado
//todavía no se colgó al DOM
let secEncabezado = document.createElement("thead");

//colgamos como un hijo un nodo (puede ser elemento o texto)
tabla.appendChild(secEncabezado);

let filaEncabezado = document.createElement("tr");

//al th, no a a la tabla
secEncabezado.appendChild(filaEncabezado);

//appendizado al final
let celda1 = document.createElement("th");
filaEncabezado.appendChild(celda1);

//a la celda1 se le pone un nodo de texto
//es importante manejarlo así, porque en la práctica "Nombre", viene de bdd
//que no se sabé de dónde ni cuando se cargo. Para no crear cosas maliciosas.
//Al crearlo como nodo de texto, se crea como texto plano. SEGURIDAD.
let texto1 = document.createTextNode("Nombre");
celda1.appendChild(texto1);

let celda2 = document.createElement("th");
filaEncabezado.appendChild(celda2);

let texto2 = document.createTextNode("Apellido");
celda2.appendChild(texto2);

let tbody = document.createElement("tbody");
tabla.appendChild(tbody);

let fila2 = document.createElement("tr");
fila2.setAttribute("idLegajo","8485848458");
tbody.appendChild(fila2);

let celda3 = document.createElement("td");
fila2.appendChild(celda3);
let texto3 = document.createTextNode("Lautaro");
celda3.appendChild(texto3);

let celda4 = document.createElement("td");
fila2.appendChild(celda4);
let texto4 = document.createTextNode("Rojas");
celda4.appendChild(texto4);

//se crea una función para que genere la fila hasta el tablerow.
//recibe objeto con los atributos con nombre y apellido.

document.getElementById("tabla");

function Vaciar(elemento){
    //devuelve un boolean, de si el nodo tiene hijos
    while(elemento.hasChildNodes()){
        //del padre
        elemento.removeChild(elemento.lastChild);
    }
}

/*
hasta acá podemos armar y desarmar toda la pagina web 
en tiempo de ejecucióncomo querramos.
*/

//manipular los atributos. Los elementos tienen atributos que son manipulables.
//al nivel del elemento tenemos 4 funciones base.
//setattribute, renewattribute , getattribute, hasattribute

console.log($("tabla").hasAttribute("id"));
console.log($("tabla").getAttribute("id"));

console.log($("tabla").getAttribute("inexistente"));//va a ser null

//que atributo le queremos pasar y que valor respetar
console.log($("tabla").setAttribute("tamaño","chico"));

//remover el atributo
$("tabla").removeAttribute("tamaño");

//cuando agregamos las filas, si muestro lineas de una bdc o un objeto
// y lo tenog que manipular y mandar peticiones
filaEncabezado.setAttribute("idObjeto", "853138543");
//Con esto puedo manipular todos los dominios del DOM.

//AGREGAR CONTROLADORES Y EVENTOS

//recupero el elemento por ID.
let cuerpo = $("cuerpo");

//para que el botón haga algo hay que interceptar al evento y al evento darle una fn
let btn = document.createElement("button");
btn.appendChild(document.createTextNode("Mi boton"));
btn.setAttribute("idObjeto","Mi super boton");
cuerpo.appendChild(btn);

function saludar(e){ //e es elemento
    alert("Hola");
    elemento = e.currentTarget; //el elemento que este invocando a la fn en ese momento
    //target es el elemento por el que va a pasando el evento
    
    //accedo a la info de que fila es (bdd)
    console.log(elemento.getAttribute("idObjeto"));
}

btn.addEventListener("click", saludar);

function mostrarLegajo(e){
    elemento = e.currentTarget;
    
    //podría ser un formulario que me permita editar
    //y luego una acción para enviarlo al sv.
    alert(elemento.getAttribute("idLegajo"));
}

//se puede hacer para cada fila que vaya creando.
fila2.addEventListener("dblclick",mostrarLegajo);


let numeros = [1, 61, 3];

let nuevosNumeros = numeros.map( 
    (elemento, indice, vector) => {
	    return elemento;
    }
    );

console.log(numeros);
console.log(nuevosNumeros);


vector = [{idLegajo:8465487645, nombre:"lautaro", apellido:"rojas"},
{idLegajo:8465487646, nombre:"juan", apellido:"perez"}]; 

let arrayFilas = vector.map(
    (elemento)=>{
        let f = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.appendChild(document.createTextNode(elemento.nombre));
        f.appendChild(td1);
        return f;
    }
);