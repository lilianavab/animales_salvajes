import { Animal } from '../src/Animal.js';

export class Oso extends Animal {
    constructor(nombre, edad, imagen, comentarios, sonido){
        super(nombre, edad, imagen, comentarios, sonido);
    }    
    gruñir(){
        return this.sonido();
    }
 
}