export async function obtenerDatos(query){
  try {
    let resultados = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
    let resultadosJson = await resultados.json();
    let data = resultadosJson.results;
    return data;
  } catch (error) {
    console.log('error '+error);
  }  
}

export async function crearResultados(query){
  const contenedor = document.querySelector('.row.row-cols-1.row-cols-sm-2.row-cols-md-5.g-3');
  const datos = await obtenerDatos(query);
  console.log("DESDE EL MODULO 2");
  let vista = '';
  datos.forEach(element => {  
    vista += `
    <div class="col">
      <div class="card" >
        <img class="card-img-top" src=${element.thumbnail} alt="Card image cap" height="220">            
        <div class="card-body" >
          <ul class="list-group list-group-flush">
            <li class="list-group-item ">${element.title.substring(0,30)}</li>
            <li class="list-group-item">Condicion: ${element.condition} </li>
            <li class="list-group-item">Disponibilidad: ${element.available_quantity} unidades</li>
            <li class="list-group-item">Unidades Vendidas: ${element.sold_quantity} unidades</li>
          </ul>
          <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">Precio: $${(element.price).toString().substring(0,7)}</small>
            <div class="btn-group ">
              <a href=${element.permalink} class="btn btn-xsm btn-warning" role="button" aria-pressed="true">Mas Información</a>              
            </div>          
          </div>
        </div>
      </div>
    </div>      
    `
  });
  contenedor.innerHTML = vista;
}

export function buscarProductos(query){
  console.log("Buscando"+query)
  let busqueda = sessionStorage.getItem("textoBusqueda");
  if (query != busqueda){ busqueda = sessionStorage.setItem("textoBusqueda",query);  }
   
  crearResultados(query);
}
