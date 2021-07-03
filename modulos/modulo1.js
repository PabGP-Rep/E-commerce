export function AgregarProducto(lista, cliente, index) {
  console.log("DESDE EL MODULO ACTIONS")
  console.log("agregando producto "+ lista[index].title+ " para el cliente "+cliente.id+" con precio "+lista[index].price);
  cliente.carrito_compras.addProducto(lista[index].id);
}

export async function crearCategorias(lista,cliente){  
  lista = [];
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
                    crearFotosProductos(lista, response_categoria,cliente);
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

export async function crearFotosProductos(lista, categoria, cliente) {
  document.getElementById('division').innerHTML='';
  let resultados = categoria.results;
  let division = document.createDocumentFragment();
  resultados.forEach((element,index) => {
      lista.push(element);
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
      let In_put = document.createElement('button');
      In_put.textContent = 'Comprar';      
      In_put.setAttribute('id',`${index}`);
      In_put.setAttribute('type','reset');
      In_put.setAttribute('target','blank');
      In_put.addEventListener('click', () =>{        
        AgregarProducto(lista, cliente, In_put.id);
      })
      formato.appendChild(In_put);
      new_division.appendChild(formato);
      division.appendChild(new_division);
  })
  let boton_atras = document.createElement('button');
  boton_atras.addEventListener('click', () =>{    
    crearCategorias(lista,cliente)
  })
  boton_atras.textContent = 'Atras';
  division.appendChild(boton_atras);
  document.getElementById('division').appendChild(division);
}

export async function nuevo(cliente){
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
}

