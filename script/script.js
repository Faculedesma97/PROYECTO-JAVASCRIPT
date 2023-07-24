let jugadores = [
    {
        nombre: "Messi",
        club: "psg",
        liga: "ligue 1",
        nacionalidad: "argentina",
        foto: "messi.png",
        id: "messi",
        precio: 80000
    },
    {
        nombre: "Mbappe",
        club: "psg",
        liga: "ligue 1",
        nacionalidad: "francia",
        foto: "mbappe.png",
        id: "mbappe",
        precio: 70000
    },
    {
        nombre: "Ronaldo",
        club: "manchester united",
        liga: "premier league",
        nacionalidad: "portugal",
        foto: "ronaldo.png",
        id: "ronaldo",
        precio: 60000
    }

]


let equipo = []
let juego = document.getElementById("juego")
let mostrarEquipo = document.getElementById("mostrar_equipo")
let equipoElegido = document.getElementById("ver_equipo")
mostrarEquipo.addEventListener("click", verEquipo)
tarjetas(jugadores)

function verEquipo(){
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
        <button id=${element.id}>Eliminar jugador</button>
        `
        equipoElegido.append(contenedor) 
        let eliminar = document.getElementById(element.id)
        eliminar.addEventListener("click", eliminarEquipo)
    
})
    tarjetas(equipo)
}

function eliminarEquipo(e) {
    let enEquipo = equipo.find(element => element.id === e.target.id)
    equipo.splice(enEquipo)
}

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

let buscador = document.getElementById("buscar")

buscador.addEventListener("input", filtrar)

function filtrar() {
    let filtro = jugadores.filter(element => element.id.includes(buscador.value.toLowerCase()) || element.liga.includes(buscador.value.toLowerCase()) || element.club.includes(buscador.value.toLowerCase()))
    tarjetas(filtro)
}


function agregarAlEquipo(e) {
    let seleccionado = jugadores.find(element => element.id === e.target.id)
    let enEquipo = equipo.find(element => element.id === e.target.id)
   
    if(enEquipo !== jugadores.id){
    alert("Este jugador ya esta en el equipo")
    } else{
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
        localStorage.setItem("equipo", JSON.stringify(equipo))
    console.log(equipo)
    }
