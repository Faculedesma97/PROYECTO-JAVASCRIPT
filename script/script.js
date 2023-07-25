const datos = "./jugadores.json"
let jugadores = []
let equipo = []
let juego = document.getElementById("juego")
let mostrarEquipo = document.getElementById("mostrar_equipo")
let equipoElegido = document.getElementById("ver_equipo")
let cancha = document.getElementById("cancha")
let error = false

mostrarEquipo.addEventListener("click", verEquipo)
let buscador = document.getElementById("buscar")

buscador.addEventListener("input", filtrar)

let confirmar = document.getElementById("confirmarEquipo")

confirmar.addEventListener("click", confirmarEquipo)


if (buscador.value === "") {
    tarjetas(jugadores)
}
fetch(datos)
  .then((response) => response.json())
  .then((data) => {
    jugadores = data.jugadores;
    tarjetas(jugadores);
  });
tarjetas(jugadores)







/* FUNCION PARA VER EL EQUIPO SELECCIONADO HASTA EL MOMENTO */



function verEquipo() {
    if (juego.style.display === "none") {
        juego.style.display = "flex";
        cancha.style.display = "none";
    } else {
        juego.style.display = "none";
        cancha.style.display = "flex";
    }
    juego.classList.toggle("ocultar")
    equipoElegido.innerHTML = ""
    equipo.forEach(element => {
        let contenedor = document.createElement("div")
        contenedor.className = "tarjetas_estilos"
        contenedor.innerHTML = `
        <h4>${element.nombre}</h4>
        <img class="img_tarjetas" src="./media/${element.foto}">
        <h5>Club: ${element.club}</h5>
        <h5>Nacionalidad: ${element.nacionalidad}</h5>
        <h5>Precio: ${element.precio}</h5>
        <button id="eliminar-${element.id}" class="btn-eliminar">Eliminar</button>
        
        `
        let btnEliminar = contenedor.querySelector(`#eliminar-${element.id}`);
        btnEliminar.addEventListener("click", () => eliminarDelEquipo(element.id));
        
        equipoElegido.append(contenedor)
        
        
    })
    contadorActualizado()
    if (mostrarEquipo.textContent === "Ver tu equipo") {
        mostrarEquipo.textContent = "Volver a seleccionar jugador"
    } else {
        mostrarEquipo.textContent = "Ver tu equipo"
    }
        equipo.innerHTML = ""
    }
    tarjetas(equipo)







 /*    FUNCION PARA CREAR TARJETAS */


    function tarjetas(array) {
        
        juego.innerHTML = ""
        array.forEach(element => {
            let contenedor = document.createElement("div")
            contenedor.className = "tarjetas_estilos"
            contenedor.innerHTML = `
            <h4>${element.nombre}</h4>
            <img class="img_tarjetas" src="./media/${element.foto}">
            <h5>Club: ${element.club}</h5>
            <h5>Nacionalidad: ${element.nacionalidad}</h5>
            <h5>Precio: ${element.precio}</h5>
            <button id=${element.id}>Seleccionar Jugador</button>
            `
            juego.append(contenedor)
            let agregar = document.getElementById(element.id)
            agregar.addEventListener("click", agregarAlEquipo)
        })
    }
    




/*      FUNCION PARA FILTRAR JUGADORES POR NOMBRE/CLUB/LIGA */


    function filtrar() {
        let filtro = jugadores.filter(element => element.id.includes(buscador.value.toLowerCase()) || element.liga.includes(buscador.value.toLowerCase()) || element.club.includes(buscador.value.toLowerCase()))
        tarjetas(filtro)
    }
    





    /* FUNCION PARA AGREGAR JUGADORES A TU EQUIPO */


    function agregarAlEquipo(e) {
        let seleccionado = jugadores.find(element => element.id === e.target.id)
        let enEquipo = equipo.find(element => element.id === e.target.id)
        error = false

    if (enEquipo !== jugadores.id) {
        Toastify({
            text: "Este Jugador ya esta en su equipo",
            className: "info",
            duration: 3000,
            close: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    } else if(equipo.length === 5){
        Toastify({
            text: "Ya tiene el equipo completo",
            className: "info",
            duration: 3000,
            close: true,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    } else {
        equipo.push({
            nombre: seleccionado.nombre,
            club: seleccionado.club,
            liga: seleccionado.liga,
            nacionalidad: seleccionado.nacionalidad,
            foto: seleccionado.foto,
            id: seleccionado.id,
            precio: seleccionado.precio
        })
    }
    sessionStorage.setItem("equipo", JSON.stringify(equipo))
contadorActualizado()
}





/* FUNCION PARA ELIMINAR JUGADOR DEL EQUIPO */



function eliminarDelEquipo(id) {
    equipo = equipo.filter(jugador => jugador.id !== id);
    sessionStorage.setItem("equipo", JSON.stringify(equipo))
    verEquipo();
    contadorActualizado()
}




/* FUNCION QUE CALCULA EL PRECIO TOTAL DEL EQUIPO */

function contador() {
    let total = equipo.reduce((accumulator, jugador) => accumulator + jugador.precio, 0);
    return total
}




/* FUNCION PARA MANTENER TOTAL ACTUALIZADO */

function contadorActualizado() {
    let totalJugador = document.getElementById("contador")
    let totalAcumulado = contador()
    let total = 300000

    totalJugador.textContent = `Valor del equipo: ${totalAcumulado} $`
    if (totalAcumulado > total) {
        totalJugador.classList.add("fondo-rojo")
    } else {
        totalJugador.classList.remove("fondo-rojo")
    }

    if(totalAcumulado > total && !error){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Has superado el limite de valor del equipo',
          })
          error = true
    }
}



/* FUNCION PARA CONFIRMAR EL EQUIPO */



function confirmarEquipo() {
let totalAcumulado = contador()
let total = 300000
    if (equipo.length < 4 ) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Te faltan jugadores para completar el equipo',
          })
          error = true
    } else{
        Swal.fire({
            icon: 'sucess',
            title: 'Completado!',
            text: 'Has completado tu equipo, gracias por jugar!',
          })
          equipo = []
          sessionStorage.setItem("equipo", JSON.stringify(equipo))
          verEquipo()
          contadorActualizado()
    }
    if(totalAcumulado > total){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Has superado el limite de valor permitido',
          })
          error = true
    }
    
    } 

