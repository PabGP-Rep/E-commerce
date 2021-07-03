
//una clase para los clientes, que puede devolver la información del cliente si se hace una consulta y su carrito

class Cliente {

    constructor (id) {

        this.id = id;
        this.carrito_compras = new Carrito(id);

    }
    async consultarInfo_cliente () {

        let infoCliente = await fetch('https://api.mercadolibre.com/users/'+this.id);
        let infoCliente_json = await infoCliente.json();
        return infoCliente_json;
    }
    async printInfo_cliente () {

        let Info =  await this.consultarInfo_cliente();
        console.log(Info);

    }

    async mostrar_Carrito () {
        console.log(this.carrito_compras);
    }
}


//una clase para el producto 

class Product {

    constructor (id) {

        this.id = id;

    }
    async consultarInfo_producto () {

        let infoProducto = await fetch('https://api.mercadolibre.com/items?ids='+this.id);
        let infoProducto_json = infoProducto.json();
        return infoProducto_json;

    }

    async printInfo_producto () {
        let Info = await this.consultarInfo_producto();
        console.log(Info);
    }
}

//clase para el carrito

class Carrito {

    constructor (id_cliente) {

        this.cliente = id_cliente;
        this.lista = [];
        this.total = 0;

    }

    async addProducto(id) {

        let producto_adding = new Product(id)
        let producto_adding_data = await producto_adding.consultarInfo_producto()
        .then((resp) => {

            let check = this.lista.findIndex((articulos) => {
                if (articulos.id == resp[0].body.id){
                    return true;
                }
            })
 
            if (check < 0) {
                let producto_nuevo = {id: resp[0].body.id, nombre: resp[0].body.title ,cantidad:1,precio:resp[0].body.price, total: resp[0].body.price};
                this.lista.push(producto_nuevo);
            }else {
                this.lista[check].total+=resp[0].body.price;
                this.lista[check].cantidad+=1;
            }
            this.total+=(resp[0].body.price);
            console.log(this.lista);
            console.log(this.total);
        })
        .catch((reject) => {console.log('err_conexion')});
    }

    async deleteProducto(id) {

        console.log('borrando');
        let producto_deleting = new Product(id);
        let producto_deleting_data = await producto_deleting.consultarInfo_producto()
        .then((resp) => {
            let check = this.lista.findIndex((articulos) => {
                if (articulos.id == resp[0].body.id){
                    return true;
                }
            });

            if (check >= 0) {
                if (this.lista[check].cantidad >= 1) {
                    this.lista[check].cantidad-=1;
                    this.lista[check].total-=this.lista[check].precio;
                }
                if (this.lista[check].cantidad == 0) {
                    this.lista.splice(check);
                }
            }else {
                console.log('err_noproducto_enlista');
            }
        })
        .catch((reject) => {console.log('err_conexion');})
    }
}







