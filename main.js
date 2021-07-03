import * as Funciones from './modulos/modulo1.js';

let cliente = new Cliente(2233345);
cliente.mostrar_Carrito();
let elementos = [];

var texto = "";
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

searchButton.addEventListener('click', () => {
    const inputValue = searchInput.value;
    sessionStorage.setItem("textoBusqueda", inputValue);
    window.location.href = "../Pagina_Resultados/Resultados.html";
});

const tuscompras = document.getElementById('tuscompras');
tuscompras.addEventListener('click',() =>{
    Funciones.crearCategorias(elementos, cliente);
})

class Categoria{
  constructor(categorie){
      this.categorie = categorie;
  }
  async getlink(){
      let mercadourl = await fetch(`https://api.mercadolibre.com/sites/MLA/search?category=${this.categorie}`);
      let respuesta = await mercadourl.json();
      return respuesta;
  }
}

Funciones.crearCategorias(elementos, cliente);

const clientes = document.getElementById('cliente');
clientes.addEventListener('click', () =>{        
  Funciones.nuevo(cliente);
})
