
let carritoDeCompras = []

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const selecTalles = document.getElementById('selecTalles')

selecTalles.addEventListener('change',()=>{
    console.log(selecTalles.value)
    if(selecTalles.value == 'all'){
        mostrarProductos(stockProductos)
    }else{
        mostrarProductos(stockProductos.filter(elemento => elemento.talle == selecTalles.value))
    }
})


mostrarProductos(stockProductos)

function mostrarProductos(array){
    contenedorProductos.innerHTML= ''
    array.forEach(producto => {
        let div = document.createElement('div')
        div.classList.add('producto')
        div.innerHTML += `<div class="card">
                            <div class="card-image">
                            <img src=${producto.img}>
                            <span class="card-title">${producto.nombre}</span>
                            <a id="boton${producto.id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add_shopping_cart</i></a>
                            </div>
                            <div class="card-content">
                                <p>${producto.desc}</p>
                                <p>Talle: ${producto.talle}</p>
                                <p> $${producto.precio}</p>
                            </div>
                        </div>`
        contenedorProductos.appendChild(div)

        let boton = document.getElementById(`boton${producto.id}`)

        boton.addEventListener('click', ()=>{
            agregarAlCarrito(`${producto.id}`);
            Toastify({
                text: "🤑 Producto Agregado",
                className: "info",
                style: {
                  background: "green",
                }
              }).showToast();
        })

    });
    
}


function agregarAlCarrito(id) {
    let repetido = carritoDeCompras.find(elemento => elemento.id == id)
    if(repetido){
        repetido.cantidad = repetido.cantidad + 1
        document.getElementById(`cantidad${repetido.id}`).innerHTML = `<p id="cantidad${repetido.id}">Cantidad: ${repetido.cantidad}</p>`
        console.log(repetido);
        actualizarCarrito()
    }else{
        let productoAgregar = stockProductos.find(elemento => elemento.id == id)

        carritoDeCompras.push(productoAgregar)

        actualizarCarrito()

        let div = document.createElement('div')
        div.classList.add('productoEnCarrito')
        div.innerHTML = `<p>${productoAgregar.nombre}</p>
                        <p>Precio:$${productoAgregar.precio}</p>
                        <p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>
                        <button class="boton-eliminar" id="eliminar${productoAgregar.id}"><i class="fas fa-trash-alt"></i></button>`
        contenedorCarrito.appendChild(div)

        let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)

        botonEliminar.addEventListener('click', ()=>{
            if(productoAgregar.cantidad == 1){
              botonEliminar.parentElement.remove()
            carritoDeCompras = carritoDeCompras.filter(elemento => elemento.id != productoAgregar.id)
            Toastify({
                text: "💀Producto Eliminado",
                className: "info",
                style: {
                  background: "red",
                }
              }).showToast(); 
            }else{
                productoAgregar.cantidad = productoAgregar.cantidad - 1
                document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = `<p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>`  
            }
            
            
            actualizarCarrito()
        })
    }
    
       
}




function  actualizarCarrito (){
    contadorCarrito.innerText = carritoDeCompras.reduce((acc, el)=> acc + el.cantidad, 0)
    precioTotal.innerText = carritoDeCompras.reduce((acc , el)=> acc + (el.precio * el.cantidad), 0)
}



