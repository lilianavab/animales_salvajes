import { Animal } from '../src/Animal.js';

export class Lobo extends Animal {
    constructor(nombre, edad, imagen, comentarios, sonido){
        super(nombre, edad, imagen, comentarios, sonido);
    }   
    
    aullar(){
        return this.sonido();
    }
    
}