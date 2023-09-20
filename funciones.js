// Declarar variables globales
const d = document
let imagenes = [
    {
        "nombre": "Naruto",
        "url": "imagenes/naruto.png"
    },
    {
        "nombre": "Sasuke",
        "url": "imagenes/sasuke.png"
    },
    {
        "nombre": "Boruto",
        "url": "imagenes/boruto3.png"
    },
    {
        "nombre": "Goku",
        "url": "imagenes/goku.png"
    },
    {
        "nombre": "Vegeta",
        "url": "imagenes/vegeta.png"
    },
    {
        "nombre": "Bills",
        "url": "imagenes/bills.png"
    },



    {
        "nombre": "Naruto",
        "url": "imagenes/naruto.png"
    },
    {
        "nombre": "Sasuke",
        "url": "imagenes/sasuke.png"
    },
    {
        "nombre": "Boruto",
        "url": "imagenes/boruto3.png"
    },
    {
        "nombre": "Goku",
        "url": "imagenes/goku.png"
    },
    {
        "nombre": "Vegeta",
        "url": "imagenes/vegeta.png"
    },
    {
        "nombre": "Bills",
        "url": "imagenes/bills.png"
    }
];

let tablero = d.querySelector(".tablero");
let nombreImg = [];
let posImg = [];
let aciertos = 0;
let intentos = 0;
let tiempo = 60;
let tabla = d.querySelector(".table_estadisticas tbody")
let mostrarAciertos = d.querySelector(".aciertos");
let mostrarIntentos = d.querySelector(".intentos");
let mostrarTiempo = d.querySelector(".tiempos");
let mostrarNiveles = d.querySelector(".nivel");
mostrarTiempo.textContent = tiempo;
let btnIniciar = d.querySelector(".boton-iniciar");
let juegoActivo = false;
let nivel = 1;
let tiempoTrancurrido;

/*-------------------------------------TALLER RESUELTO--------------------------------------------------*/
//Agregado Nuevo

let intentosTotales = 0;
let tiempoTotal = 0;

// let NombreUsuario = d.querySelector("#nombre").value;

// let mostrarTotal = d.querySelector("#total");
let DatosUsuario = [];

// if (NombreUsuario){
//     DatosUsuario.push[{nombre: NombreUsuario}];
// }



console.log(DatosUsuario)

let datosGuardados = localStorage.getItem("DatosUsuario")

/*const jugadorExistente = datosGuardados.find((jugador) => jugador.nombre === nombre);

if (jugadorExistente) {
    // Si el jugador ya existe, actualizar sus datos
    jugadorExistente.tiempo = tiempoTotal;
    jugadorExistente.intentos = intentosTotales;
} else {
    // Si el jugador no existe, agregar un nuevo registro
    const jugador = {
        nombre: nombre,
        tiempo: tiempoTotal,
        intentos: intentosTotales,
    };
    datosGuardados.push(jugador);
}*/

if (datosGuardados){
    let datos = localStorage.getItem("DatosUsuario")
    const datosJugador = JSON.parse(datos);
    datosJugador.forEach((DatosUsuario, i) => {
        let mostarNombre = d.querySelector(".player")
        mostarNombre.textContent = DatosUsuario.nombre;
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${i + 1}</td>
            <td>${DatosUsuario.nombre}</td>
            <td>${DatosUsuario.tiempoTotal}</td>
            <td>${DatosUsuario.intentosTotales}</td>
        `;
        tabla.appendChild(fila);
    });
}



/*-------------------------------------------------HASTA AQUI-------------------------------------------*/
// let soundLoser = new Audio("sonido/loser.mp3");

//desorganizar imagenes
imagenes.sort(() => Math.random() - 0.5);


//Iniciar Juego
btnIniciar.addEventListener("click",function () {
    if (juegoActivo == false && nivel == 1) {
        juegoActivo = true;
        agregarImagenes();
        tiempoDejuego();
    }else if (juegoActivo == false && nivel == 2){
        juegoActivo = true;
        agregarImagenes();
        tiempoDejuego();
    }else if(juegoActivo == false && nivel == 3){
        juegoActivo = true;
        agregarImagenes();
        tiempoDejuego();
    }
    let NombreUsuario = d.querySelector("#nombre").value;
    if (NombreUsuario){
        DatosUsuario.push({nombre: NombreUsuario});
    }
} );

//TIEMPO DEL JUEGO
function tiempoDejuego (){
     tiempoTrancurrido = setInterval(function(){
        tiempo--;
        mostrarNiveles.textContent = nivel;
        mostrarTiempo.textContent = tiempo;
        if (tiempo==10){
            //Limpiar Intervalo (tiempotrancurrido);
            mostrarTiempo.setAttribute("style", "color:red; font-size:40px");
        }else if(tiempo == 0){
            clearInterval(tiempoTrancurrido);
            alert("Perdiste  No adivinantes todas las imagenes");
            location.reload();
        }
    },1000 )
}




//Agregar imagenes al tablero
function agregarImagenes(){
    for (let x = 0; x < imagenes.length; x++){
        let div = d.createElement("div");
        let img = d.createElement("img");
        div.setAttribute("class", "col-3");
        img.setAttribute("src","imagenes/ocultar.png");
        img.setAttribute("class", "img-fluid mb-3 altoImg");
        img.setAttribute("id", x);
        img.addEventListener("click", mostrarImagenes);
        div.appendChild(img);
        tablero.appendChild(div);
    }
}
// agregarImagenes();

//Evento Mostrar imagenes
function mostrarImagenes(){
    //Guardar Id de la imagen
    let imgID = this.getAttribute("id");

    // alert("pos Imagen: "+imgID)
    this.setAttribute("src", imagenes[imgID].url);
    nombreImg.push ( imagenes[imgID].nombre );
    posImg.push(imgID);
    // alert(nombreImg[0]+ "" +posImg[0]);

    //Ejecutar la funcion comparar imagenes
    if (nombreImg.length == 2 ) {
       setTimeout(compararImg, 300);
    }

}

//Funcion para comparar las imagenes

//Contador de los intento Totales


function compararImg(){
    let todasImg = d.querySelectorAll(".tablero .col-3 img")
    //Comparamos
    if (nombreImg[0] == nombreImg[1]) {
        if (posImg [0] != posImg[1]){


            todasImg[posImg[0]].setAttribute("src", './imagenes/acertar.jpg')
            todasImg[posImg[1]].setAttribute("src", './imagenes/acertar.jpg')

            todasImg[posImg[0]].removeEventListener('click',mostrarImagenes)
            todasImg[posImg[1]].removeEventListener('click',mostrarImagenes)

            aciertos ++;
            mostrarAciertos.textContent = aciertos;
        }else{
            alert("mano elija otra carta");
            todasImg [posImg[0]].setAttribute("src", './imagenes/ocultar.png');
            intentos++;
            intentosTotales++;
            mostrarIntentos.texcontent = intentos;
        }

    } else {
        todasImg[posImg[0]].setAttribute("src", './imagenes/ocultar.png');
        todasImg[posImg[1]].setAttribute("src", './imagenes/ocultar.png');
        intentos++;
        intentosTotales++;
        mostrarIntentos.textContent = intentos;
    }

    nombreImg = [];
    posImg = [];


    //Logica pasar de niveles 

          while ( aciertos == 6){
        alert("🌟felicidades pasaste al siguiente nivel🌟");
        aciertos = 0;
        intentos = 0;
        clearInterval(tiempoTrancurrido);
    
        if (nivel === 1) {
            tiempo = 45;
            nivel = 2;
        } else if (nivel === 2) {
            tiempo = 35;
            nivel = 3;
        } else if (nivel === 3) {
            alert("🌟felicidades has superado todos los niveles🌟");
        }

        intentosTotales+=intentos;
        tiempoTotal += tiempo;

        imagenes.sort(()=> Math.random() - 0.5 );
        console.log(intentosTotales);
        mostrarNiveles.textContent = nivel;
        mostrarIntentos.textContent = intentos;
        mostrarAciertos.textContent = aciertos;
        mostrarTiempo.textContent = tiempo;
        quitarImagenes();
        juegoActivo = false;


        //Para Guardar Datos en Local
        DatosUsuario.push({
            intentosTotales: intentosTotales,
            tiempoTotal: tiempoTotal,
        })
        localStorage.setItem('DatosUsuario', JSON.stringify(DatosUsuario));
    }
    
    //quitar imagenes del tablero
    function quitarImagenes() {
        let todasLasImg = d.querySelectorAll(".tablero div");
        for(let i = 0; i < todasLasImg.length; i++){
            todasLasImg[i].remove();
        }
    }
        // if(aciertos == 6 && nivel == 1){
        //     alert("🌟felicidades pasaste al siguiente nivel🌟");
        //     aciertos = 0;
        //     intentos = 0;
        //     clearInterval(tiempoTrancurrido);
        //     tiempo = 45;
        //     nivel = 2;
        //     mostrarNiveles.textContent = nivel;
        //     mostrarIntentos.textContent = intentos;
        //     mostrarAciertos.textContent = aciertos;
        //     mostrarTiempo.textContent = tiempo;
        //     quitarImagenes();
        //     juegoActivo = false;
        // }else if(aciertos == 6 && nivel == 2) {
        //     alert("🌟felicidades pasaste al siguiente nivel🌟");
        //     aciertos = 0;
        //     intentos = 0;
        //     clearInterval(tiempoTrancurrido);
        //     tiempo = 35;
        //     nivel = 3;
        //     mostrarNiveles.textContent = nivel;
        //     mostrarIntentos.textContent = intentos;
        //     mostrarAciertos.textContent = aciertos;
        //     mostrarTiempo.textContent = tiempo;
        //     quitarImagenes();
        //     juegoActivo = false;
        // }else if (aciertos == 6 && nivel == 3){
        //     alert("🌟felicidades has superado todos los  nivel🌟");
        //     aciertos = 0;
        //     intentos = 0;
        //     clearInterval(tiempoTrancurrido);
        //     tiempo = 35;
        //     nivel = 1;
        //     mostrarNiveles.textContent = nivel;
        //     mostrarIntentos.textContent = intentos;
        //     mostrarAciertos.textContent = aciertos;
        //     mostrarTiempo.textContent = tiempo;
        //     quitarImagenes();
        //     juegoActivo = false;
        // }
}




    
    

