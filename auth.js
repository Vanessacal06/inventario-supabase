async function registrarUsuario(email, contrasena){

  const { error } = await clienteSupabase.auth.signUp({
    email: email,
    password: contrasena
  });

  if(error){
    mostrarMensaje("error-auth", error.message);
    return;
  }

  mostrarMensaje(
    "exito-auth",
    "Usuario registrado"
  );
}

async function iniciarSesion(email, contrasena){

  const { error } = await clienteSupabase.auth.signInWithPassword({
    email: email,
    password: contrasena
  });

  if(error){
    mostrarMensaje(
      "error-auth",
      "Datos incorrectos"
    );
    return;
  }

  window.location.href = "inventario.html";
}

async function cerrarSesion(){

  await clienteSupabase.auth.signOut();

  window.location.href = "login.html";
}

async function verificarSesion(){

  const { data } = await clienteSupabase.auth.getSession();

  if(!data.session){
    window.location.href = "login.html";
  }
}

function mostrarMensaje(id, texto){

  const elemento = document.getElementById(id);

  if(elemento){
    elemento.textContent = texto;
    elemento.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", function(){

  const btnLogin = document.getElementById("btn-login");

  if(btnLogin){

    btnLogin.addEventListener("click", function(){

      const email = document.getElementById("email").value;

      const contrasena = document.getElementById("contrasena").value;

      iniciarSesion(email, contrasena);

    });
  }

  const btnRegistro = document.getElementById("btn-registro");

  if(btnRegistro){

    btnRegistro.addEventListener("click", function(){

      const email = document.getElementById("email").value;

      const contrasena = document.getElementById("contrasena").value;

      registrarUsuario(email, contrasena);

    });
  }

  const btnSalir = document.getElementById("btn-salir");

  if(btnSalir){
    btnSalir.addEventListener("click", cerrarSesion);
  }

});