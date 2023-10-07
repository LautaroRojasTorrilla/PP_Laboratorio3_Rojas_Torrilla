class Animal{
    patas = 0;
    constructor(p_patas){
        this.patas=p_patas;
    }
    cantidadPatas(){
        console.log(this.patas);
    }
}

class Perro extends Animal{
    color = "negro";
    #altura = "bajito"; // private
    static orejas= 2; 
    constructor(p_color,p_patas){
        super(p_patas);
        this.color=p_color
    }
    ladrar(){
        console.log("woof");
    }
    miColor(){
        console.log(this.color);
    }
    static saltar(){
        console.log("El perro salta");
    }
}

/*
let miPerro = new Perro("blanco", 4);

miPerro.ladrar();
miPerro.miColor();
miPerro.cantidadPatas();

console.log(Perro.orejas);

//pregunto si hereda o es instancia de.
console.log(miPerro instanceof Perro);
console.log(miPerro instanceof Animal);

let miAnimal = new Animal(2);
console.log(miAnimal instanceof Perro);

Perro.saltar();

console.log(miPerro);

//Reflexión
//pregunto si el objeto tiene la propiedad que le pasamos como string
console.log(miPerro.hasOwnProperty("color"));


let o = new Object();//ES UNA FUNCION CONSTRUCTORA (que a la vez es un objeto)
o.saludar = "hola";
console.log(o);

function Mueble(p_color){
    this.patas = 4;
    this.color = p_color;
    this.romper = function(){console.log("rompi el mueble")};
}

let miMueble = new Mueble("blanco");
console.log(miMueble.patas);
miMueble.romper();
//verifica que se haya creado con la función Mueble
console.log(miMueble instanceof Mueble);


//CADENA DE PROTOTIPOS
let padre = {espadre:true};

//Estos haciendo que herede del objeto padre
let hijo = {__proto__:padre};

padre.espadre=false;

console.log(hijo.espadre);
*/

function Mueble(p_peso){
    this.peso = p_peso;
}
Mueble.prototype.altura = 30;

function Mesa(p_color){
    this.patas = 4;
    this.color = p_color;
    this.romper = function(){console.log("rompi mesa")}
    this.__proto__ = new Mueble(10);
}


let mesa = {__proto__: new Mesa("blanco")};
console.log(mesa.patas);
console.log(mesa.peso);
console.log(mesa instanceof Mesa);//cheque que el prototype tenga como creador a la fn. Da false acá
console.log(mesa instanceof Mueble);
console.log(mesa.__proto__ instanceof Mueble);
console.log(mesa);

let m = new Mesa("Blanco");
console.log(m.altura);


