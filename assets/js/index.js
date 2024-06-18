// Importación las clases de animales
import { Leon } from '../src/Leon.js';
import { Lobo } from '../src/Lobo.js';
import { Oso } from '../src/Oso.js';
import { Serpiente } from '../src/Serpiente.js';
import { Aguila } from '../src/Aguila.js';

// IIFE para manejar el formulario y la tabla
(function() {
  document.addEventListener('DOMContentLoaded', () => {
    const selectAnimal = document.querySelector("#animal");
    const selectEdad = document.querySelector("#edad");
    const comentarios = document.getElementById("comentarios");
    const btnRegistrar = document.querySelector("#btnRegistrar");
    const preview = document.getElementById("preview");
    const animalesContainer = document.getElementById("Animales");
    const formulario = document.querySelector("form");

    // Función para reproducir el sonido del animal
    const playSound = (soundSrc) => {
      const audioPlayer = new Audio(soundSrc);
      audioPlayer.play();
      console.log(`Reproduciendo sonido: ${soundSrc}`);
    };

    // Función asíncrona para obtener la imagen del animal
    const imagenAnimal = async (nombreAnimal) => {
      console.log(`Obteniendo imagen de ${nombreAnimal}...`);
      const response = await fetch('./animales.json');
      const data = await response.json();
      return data.animales.find(a => a.name === nombreAnimal);
    };

    // Evento 'change' para actualizar la imagen de vista previa
    selectAnimal.addEventListener('change', async (event) => {
      const animalDato = await imagenAnimal(event.target.value);
      if (animalDato) {
        preview.innerHTML = `<img src="./assets/imgs/${animalDato.imagen}" alt="${animalDato.name}" class="rounded mx-auto d-block" height="200" width="200px">`; 
      }
    });

    // Evento 'click' para registrar el animal
    btnRegistrar.addEventListener('click', async (event) => {
      event.preventDefault();
      const animalName = selectAnimal.value;
      const edad = selectEdad.value;
      const comentarioTexto = comentarios.value;

      if (animalName) {
        const animalDato = await imagenAnimal(animalName);
        const imgSrc = animalDato ? `./assets/imgs/${animalDato.imagen}` : '';
        const audioSrc = `../assets/sounds/${animalDato.sonido}`;

        // Instancia del animal
        let animalInstancia;
        switch (animalName) {
          case 'Leon':
            animalInstancia = new Leon();
            break;
          case 'Lobo':
            animalInstancia = new Lobo();
            break;
          case 'Oso':
            animalInstancia = new Oso();
            break;
          case 'Serpiente':
            animalInstancia = new Serpiente();
            break;
          case 'Aguila':
            animalInstancia = new Aguila();
            break;
          default:
            break;
        }

        // Limpiar edad y comentario de la búsqueda anterior
        selectEdad.value = '';
        comentarios.value = '';

        // Crear tabla del animal y agregar al DOM
        const animalCard = document.createElement('div');
        animalCard.classList.add('animal-card');
        animalCard.innerHTML = `
          <div class="card text-light bg-secondary" style="width: 8rem;">
            <img src="${imgSrc}" class="card-img-top animal-image" alt="${animalInstancia.nombre}" style="width: 127px; height: 190px;">
            <div class="card-body">
              <button class="sound-button" data-sound="${audioSrc}">🔊</button>
            </div>
          </div>
        `;
        
        animalesContainer.appendChild(animalCard);

        // Evento para reproducir sonido
        animalCard.querySelector('.sound-button').addEventListener('click', () => {
          playSound(audioSrc);
        });

        // Modal con información del animal
        const modalBody = document.querySelector('#exampleModal .modal-body'); // Selecciona el elemento con la clase '.modal-body' dentro del elemento con el ID 'exampleModal' y lo almacena en la variable 'modalBody'.
        modalBody.innerHTML = `
          <div style="text-align: center; color: white;">
            <img src="${imgSrc}" alt="${animalInstancia.nombre}" class="img-fluid width="200px">
            <p style="text-align: center;">Edad: ${edad}</p>
            <p style="text-align: center;">Comentarios: ${comentarioTexto}</p>
          </div>
        `;
        $('#exampleModal').modal('show');

        // Resetear el formulario y mostrar mensaje de confirmación
        formulario.reset();
        preview.innerHTML = '';
        console.log(`Animal registrado: ${animalInstancia.nombre}, Edad: ${edad}, Comentarios: ${comentarioTexto}`);
      } else {
        alert("Por favor, selecciona un animal.");
      }
    });
  });
})();
