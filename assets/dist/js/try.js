/*let division = document.createDocumentFragment();
function hola(){
    for (let i=0;i<3;i++){
        let nuevo = document.createElement('h1');
        nuevo.textContent = 'hola';
        division.appendChild(nuevo.cloneNode(true));
        console.log('nuevo')
    }
    document.getElementById('division').appendChild(division);
}

hola();*/
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

var texto = "";
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

searchButton.addEventListener('click', () => {
    const inputValue = searchInput.value;
    sessionStorage.setItem("textoBusqueda", inputValue);
    window.location.href = "index_demo_2.html?"       
});


Categorias_fotos();
