async function obtenerProductos(){

  const { data, error } = await clienteSupabase
    .from("productos")
    .select("*");

  if(error){
    console.log(error);
    return;
  }

  mostrarProductos(data);
}

async function crearProducto(producto){

  const { error } = await clienteSupabase
    .from("productos")
    .insert(producto);

  if(error){
    alert(error.message);
    return;
  }

  obtenerProductos();

  limpiarFormulario();
}

async function actualizarProducto(id, producto){

  const { error } = await clienteSupabase
    .from("productos")
    .update(producto)
    .eq("id", id);

  if(error){
    alert(error.message);
    return;
  }

  obtenerProductos();

  limpiarFormulario();
}

async function eliminarProducto(id){

  const confirmar = confirm("Eliminar producto?");

  if(!confirmar){
    return;
  }

  const { error } = await clienteSupabase
    .from("productos")
    .delete()
    .eq("id", id);

  if(error){
    alert(error.message);
    return;
  }

  obtenerProductos();
}

function mostrarProductos(productos){

  const contenedor = document.getElementById("lista-productos");

  contenedor.innerHTML = "";

  productos.forEach(function(producto){

    const articulo = document.createElement("article");

    articulo.className = "card-producto";

    articulo.innerHTML = `
      <h3>${producto.nombre}</h3>

      <p>${producto.descripcion}</p>

      <p>Precio: $${producto.precio}</p>

      <p>Cantidad: ${producto.cantidad}</p>

      <button onclick="prepararEdicion(
        ${producto.id},
        '${producto.nombre}',
        '${producto.descripcion}',
        ${producto.precio},
        ${producto.cantidad},
        '${producto.imagen_url}'
      )">
        Editar
      </button>

      <button onclick="eliminarProducto(${producto.id})">
        Eliminar
      </button>
    `;

    contenedor.appendChild(articulo);

  });
}

function prepararEdicion(
  id,
  nombre,
  descripcion,
  precio,
  cantidad,
  imagen
){

  document.getElementById("producto-id").value = id;

  document.getElementById("nombre").value = nombre;

  document.getElementById("descripcion").value = descripcion;

  document.getElementById("precio").value = precio;

  document.getElementById("cantidad").value = cantidad;

  document.getElementById("imagen_url").value = imagen;

}

function limpiarFormulario(){

  document.getElementById("producto-id").value = "";

  document.getElementById("nombre").value = "";

  document.getElementById("descripcion").value = "";

  document.getElementById("precio").value = "";

  document.getElementById("cantidad").value = "";

  document.getElementById("imagen_url").value = "";

}