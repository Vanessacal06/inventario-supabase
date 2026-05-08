document.addEventListener("DOMContentLoaded", function(){

  verificarSesion();
  obtenerProductos();

  const btnGuardar = document.getElementById("btn-guardar");

  btnGuardar.addEventListener("click", async function(){ // <-- Agregamos async aquí

    const id = document.getElementById("producto-id").value;
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const precio = document.getElementById("precio").value;
    const cantidad = document.getElementById("cantidad").value;
    const imagen_url = document.getElementById("imagen_url").value;

    // OBTENER EL CORREO DEL USUARIO ACTUAL
    const { data: { user } } = await clienteSupabase.auth.getUser();
    const correoUsuario = user ? user.email : "Desconocido";

    const producto = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      cantidad: cantidad,
      imagen_url: imagen_url,
      correo: correoUsuario // <-- AGREGAMOS EL CORREO AQUÍ
    };

    if(id){
      actualizarProducto(id, producto);
    }else{
      crearProducto(producto);
    }

  });

  const btnCancelar = document.getElementById("btn-cancelar");
  btnCancelar.addEventListener("click", limpiarFormulario);

});