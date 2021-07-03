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

const tuscompras = document.getElementById('tuscompras');
tuscompras.addEventListener('click',() =>{
    Categorias_fotos();
})
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

async function Categorias_fotos(){
    let division = document.getElementById('division');
    division.innerHTML = '';
    let categorias = await fetch('https://api.mercadolibre.com/sites/MLM/categories');
    let categorias_json = await categorias.json()
    .then((response) => {
        let division = document.createDocumentFragment();
        response.forEach((element) => {
    
            let new_division = document.createElement('div');
            new_division.setAttribute('style','background:#D4FF33;height:250px; width:200px; border:1px solid black; margin:5px; text-align:center; padding:10px');
            let fotoCategoria = fetch(`https://api.mercadolibre.com/sites/MLM/search?category=${element.id}`)
            .then((response_json) =>{
                let fotoCategoria_json = response_json.json()
                .then((response_categoria) =>{
                    let imagen = document.createElement('img');
                    imagen.setAttribute('src',response_categoria.results[0].thumbnail);
                    imagen.setAttribute('style','height:40%;width:60%')
                    new_division.appendChild(imagen);
                    let boton = document.createElement('button');
                    boton.textContent = 'Ver más';
                    boton.setAttribute('style','margin:5px; border:2px solid black; font-size:large; cursor: pointer');
                    boton.setAttribute('target','blank');
                    boton.setAttribute('type','button');
                    boton.addEventListener('click', () =>{
                        Productos_fotos(response_categoria);
                    })
                    new_division.appendChild(boton);
                })
            })
            let name = document.createElement('h4');
            name.textContent = element.name;
            new_division.appendChild(name);
            division.appendChild(new_division);
        });
        document.getElementById('division').appendChild(division)
    })
    .catch((reject) =>{
        console.log('err');
    })
    
}

async function Productos_fotos(categoria,cliente_id) {
    document.getElementById('division').innerHTML='';
    let resultados = categoria.results;
    let division = document.createDocumentFragment();
    resultados.forEach((element) => {
        let new_division = document.createElement('div');
        new_division.setAttribute('style','background:#D4FF33;height:300px; width:200px; border:1px solid black; margin:5px; text-align:center; padding:10px');
        let imagen = document.createElement('img');
        imagen.setAttribute('src',element.thumbnail);
        imagen.setAttribute('style','height:30%;width:60%')
        new_division.appendChild(imagen);
        let name = document.createElement('h6');
        name.textContent = element.title;
        new_division.appendChild(name);
        let precio = document.createElement('h5');
        precio.setAttribute('style','color:black');
        precio.textContent = '$'+element.price.toString();
        new_division.appendChild(precio);
        let formato = document.createElement('form');
        formato.setAttribute('action',element.permalink);
        formato.setAttribute('target','_blank');
        let In_put = document.createElement('button');
        In_put.textContent = 'Comprar';
        In_put.setAttribute('target','blank');
        formato.appendChild(In_put);
        new_division.appendChild(formato);
        division.appendChild(new_division);
    })
    let boton_atras = document.createElement('button');
    boton_atras.setAttribute('onclick','Categorias_fotos()');
    boton_atras.textContent = 'Atras';
    division.appendChild(boton_atras);
    document.getElementById('division').appendChild(division);
}

let cliente = new Cliente(2233345);
Categorias_fotos();

const clientes = document.getElementById('cliente');
clientes.addEventListener('click',nuevo = async function()  {
    document.getElementById('division').innerHTML = '';
    let tarjeta_presentacion = document.createElement('div');
    tarjeta_presentacion.setAttribute('style','text-algin:center;width:70%;height:300px;border:5px solid black;background:yellow');
    let foto = document.createElement('div');
    foto.setAttribute('style','width:100px;height:100px; background:white;border:1px solid black;margin:1px');
    tarjeta_presentacion.appendChild(foto);
    document.getElementById('division').appendChild(tarjeta_presentacion);
    let Info = await cliente.consultarInfo_cliente();
    console.log(Info);
    let id = document.createElement('h7');
    id.textContent = 'ID: '+Info.id;
    id.setAttribute('style','display:block;overflow:auto;color:black;font-weight:bold');
    tarjeta_presentacion.appendChild(id);
    let nombre = document.createElement('h7');
    nombre.textContent = 'NOMBRE: '+Info.nickname;
    nombre.setAttribute('style','display:block;overflow:auto;color:black;font-weight:bold');
    tarjeta_presentacion.appendChild(nombre);
    let pagina = document.createElement('form');
    pagina.setAttribute('action',Info.permalink);
    pagina.setAttribute('target','_blank');
    let pagina_input = document.createElement('button');
    pagina_input.setAttribute('target','blank')
    pagina_input.textContent = 'Mi pagina';
    pagina.appendChild(pagina_input);
    tarjeta_presentacion.appendChild(pagina);
    console.log(cliente.carrito_compras);
})

