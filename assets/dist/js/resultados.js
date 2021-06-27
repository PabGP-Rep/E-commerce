

var busqueda = sessionStorage.getItem("textoBusqueda");
console.log(busqueda);

const titulo = document.getElementById('titulo-principal');

const imagen1 = document.getElementById('imagen-1');
const nombre1 = document.getElementById('nombre-1');
const condicion1 = document.getElementById('condicion-1');
const disponibles1 = document.getElementById('disponibles-1');
const vendidas1 = document.getElementById('vendidas-1');
const precio1 = document.getElementById('precio-1');

const imagen2 = document.getElementById('imagen-2');
const nombre2 = document.getElementById('nombre-2');
const condicion2 = document.getElementById('condicion-2');
const disponibles2 = document.getElementById('disponibles-2');
const vendidas2 = document.getElementById('vendidas-2');
const precio2 = document.getElementById('precio-2');

const imagen3 = document.getElementById('imagen-3');
const nombre3 = document.getElementById('nombre-3');
const condicion3 = document.getElementById('condicion-3');
const disponibles3 = document.getElementById('disponibles-3');
const vendidas3 = document.getElementById('vendidas-3');
const precio3 = document.getElementById('precio-3');

titulo.innerHTML = "Resultados de busqueda: "+busqueda


class Servicio {
    constructor(url, query) {
        this.url = url;
        this.query = query;   
    }   
}

async function getServicio(url, query){
    let urlServicio = url + query;
    const Respuesta = await fetch(urlServicio);
    const data = await Respuesta.json();    
    return data;
}

async function renderData(OjetoServicio) {
    const data = await getServicio(OjetoServicio.url, OjetoServicio.query);
    var elementos = [];
    elementos = data.results;
    imagen1.setAttribute('src', elementos[0].thumbnail);
    nombre1.innerHTML = elementos[0].title;
    condicion1.innerHTML = "Condicion: " + elementos[0].condition;
    disponibles1.innerHTML = "Disponibilidad: " + elementos[0].available_quantity + " Unidades";
    vendidas1.innerHTML = "Vendidas: " + elementos[0].sold_quantity + " Unidades";
    precio1.innerHTML = elementos[0].price/1000 + " $";    

    imagen2.setAttribute('src', elementos[1].thumbnail);
    nombre2.innerHTML = elementos[1].title;
    condicion2.innerHTML = "Condicion: " + elementos[1].condition;
    disponibles2.innerHTML = "Disponibilidad: " + elementos[1].available_quantity + " Unidades";
    vendidas2.innerHTML = "Vendidas: " + elementos[1].sold_quantity + " Unidades";
    precio2.innerHTML = elementos[1].price/1000 + " $";

    imagen3.setAttribute('src', elementos[2].thumbnail);
    nombre3.innerHTML = elementos[2].title;
    condicion3.innerHTML = "Condicion: " + elementos[2].condition;
    disponibles3.innerHTML = "Disponibilidad: " + elementos[2].available_quantity + " Unidades";
    vendidas3.innerHTML = "Vendidas: " + elementos[2].sold_quantity + " Unidades";
    precio3.innerHTML = elementos[2].price/1000 + " $";


    console.log(data);
}


//Busqueda de producto "xbox s"
const newService = new Servicio('https://api.mercadolibre.com/sites/MLA/search?q=', busqueda)
renderData(newService);