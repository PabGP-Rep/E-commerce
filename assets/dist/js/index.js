
var texto = "Shrek";
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

searchButton.addEventListener('click', () => {
    const inputValue = searchInput.value;
    sessionStorage.setItem("textoBusqueda", inputValue);
    window.location.href = "index_demo_2.html?"
    //alert("buscando "+inputValue);   
});

/*
class Servicio {
    constructor(url,id) {
        this.url = url;
        this.id = id;   
    }   
}

async function getServicio(url, id){
    let urlServicio = url;
    const Respuesta = await fetch(urlServicio);
    const data = await Respuesta.json();    
    return data;
}
*/

/*
async function renderData(OjetoServicio) {
    const data = await getServicio(OjetoServicio.url, OjetoServicio.id);
    
    console.log(data);
    
    console.log(data.name);
    console.log(data.sprites.back_default);

    let datos = document.createElement('h2');
    datos.textContent = `${data.name}`+" #"+`${data.id}`;

    let pokeImagen = document.createElement('img');
    pokeImagen.setAttribute('src', data.sprites.front_default);
    pokeImagen.style.width = '150px';    

    pokemonDiv.appendChild(datos);
    pokemonDiv.appendChild (pokeImagen);
}
*/
//MLA de consolas y videojuegos MLA1144

//Busqueda de Todas las categorias existentes
//const newPokeService = new Servicio('https://api.mercadolibre.com/sites/MLA/categories', 12)

//Busqueda de los atributos de una categoria MLA1144
//const newPokeService = new Servicio('https://api.mercadolibre.com/categories/MLA438566/attributes', 12)

/*Busqueda del dominio segun un query del usuario "xbox"
https://api.mercadolibre.com/sites/MLA/domain_discovery/search?q=xbox
category_id: "MLA438566"    category_name: "Consolas"   domain_id: "MLA-GAME_CONSOLES"
domain_name: "Consolas de juegos"*/
//const newPokeService = new Servicio('https://api.mercadolibre.com/sites/MLA/domain_discovery/search?q=xbox', 12)

//Busqueda de tendencias
//const newPokeService = new Servicio('https://api.mercadolibre.com/trends/MLA/MLA438566', 12)

//////////////////////////////*******************************//////////////////////////////////
//const newPokeService = new Servicio('', 12)

//Busqueda de producto "xbox s"
//const newPokeService = new Servicio('https://api.mercadolibre.com/sites/MLA/search?q=xbox s', 12)


//renderData(newPokeService);
