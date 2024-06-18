//Clases representadas en el diagrama implementando la herencia indicada.
export class Animal {
    constructor(nombre, edad, imagen, comentarios, sonido){
        this.nombre = nombre
        this.edad = edad
        this.imagen = imagen
        this.comentarios = comentarios
        this.sonido = sonido
    }
//2. Crear las instancias de las clases utilizando los datos del formulario.   
        getNombre() {
            return this.nombre;
            }

        getEdad() {
            return this.edad;
            }

        setEdad(nuevaEdad){
                this.edad= nuevaEdad;
                }
        getImagen() {
            return this.imagen;
            }

        getComentarios() {
            return this.comentarios;
            }
          
        setComentarios(nuevaComentarios){
            this.comentarios = nuevaComentarios;
            }
            
        getSonido() {
            return this.sonido;
            } 
}
