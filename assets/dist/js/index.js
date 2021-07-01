/*Javascript para las funcionalidades de la pagina principal*/

////////////////////Barra de Busqueda
var texto = "";
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

searchButton.addEventListener('click', () => {
    const inputValue = searchInput.value;
    sessionStorage.setItem("textoBusqueda", inputValue);
    window.location.href = "index_demo_2.html?"       
});

/*Pruebas Consumo de la API Mercado Libre
class Servicio {
    constructor(url) {
        this.url = url;
    }   
}

async function getServicio(url){
    let urlServicio = url;
    const Respuesta = await fetch(urlServicio);
    const data = await Respuesta.json();    
    return data;
}

async function renderData(OjetoServicio) {
    const data = await getServicio(OjetoServicio.url);    
    console.log(data);
}

//MLA de consolas y videojuegos MLA1144
//Busqueda de Todas las categorias existentes
//const newService = new Servicio('https://api.mercadolibre.com/sites/MLA/categories')

//Busqueda de los atributos de una categoria MLA1144
//const newService = new Servicio('https://api.mercadolibre.com/categories/MLA438566/attributes')

/*Busqueda del dominio segun un query del usuario "xbox"
//const newService = new Servicio('https://api.mercadolibre.com/sites/MLA/domain_discovery/search?q=xbox')
RESULTADOS
category_id: "MLA438566"    category_name: "Consolas"   domain_id: "MLA-GAME_CONSOLES"
domain_name: "Consolas de juegos"*/

//Busqueda de tendencias
//const newService = new Servicio('https://api.mercadolibre.com/trends/MLA/MLA438566')

//Busqueda de producto "xbox s"
//const newService = new Servicio('https://api.mercadolibre.com/sites/MLA/search?q=xbox s')

//renderData(newService);

////////////////////Fin Barra de Busqueda
////////////////////Inicio Muestra de Tendencias
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
//el renderizador de la primera página

async function Productos_fotos_precios(Categoria){
    let items = await Categoria.getlink();
    console.log(items);
    console.log(items.results);
    for (let i=0;i<9;i++) {

        let imagen = document.getElementById(`imagen${i}`);
        imagen.setAttribute('src',items.results[i].thumbnail);
        let texto = document.getElementById(`titulo${i}`);
        texto.textContent = items.results[i].title;
        let boton = document.getElementById(`boton${i}`);
        boton.setAttribute('herf',items.results[i].permalink);
        console.log(items.results[i].permalink);
    } 

    for(let j=0;j<3;j++) {

        let a = Math.floor(Math.random()*items.results.length);
        let texto = document.getElementById(`carusel${j}`);
        texto.textContent = items.results[a].title;
        let imagen = document.getElementById(`imagencar${j}`);
        imagen.setAttribute('src',items.results[a].thumbnail);
        let busqueda = document.getElementById(`buscar${j}`);
        busqueda.setAttribute('href',items.results[a].permalink);

    }
}

class Producto{
    constructor(buscar){
        this.buscar = buscar;
    }
    async getproducto(){
        let productos = await fetch(`https://api.mercadolibre.com/items/${this.buscar}`);
        let productos_json = productos.json();
        return productos_json;
    }
    async getatributos(){
        let atributos = await this.getproducto();
        console.log(atributos);
    }
}

class Carrito{
    constructor(){
        this.productos = [];
    }
    async getorden(producto){
        let precio = producto.installments.amount;
        let nombre = producto.id;
        this.productos.push({'precio':precio,'nombre':nombre});
    }
}

let mercado = new Categoria("MLA438566");
Productos_fotos_precios(mercado);

////////////////////Fin Muestra de Tendencias