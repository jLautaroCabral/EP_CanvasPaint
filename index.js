let colores = [
    "#c91a1a",
    "#f1e31c",
    "#5ac91a",
    "#1ac9ac",
    "#1a3ac9",
    "#7a1ac9",
    "#c91a71"
]

//#region Referencias
let canvas = document.getElementById("area_de_dibujo");
let canvasContext = canvas.getContext("2d");
let btnLimpiar = document.getElementById("botonLimpiar");
let btnColores = document.getElementsByClassName("boton-color");
console.log(btnColores);
//#endregion

//#region Estados
let lapizActivo = true;
let dibujando = false;
//#endregion

//#region Eventos
document.addEventListener("click", punto);
document.addEventListener("mousedown", apoyar);
document.addEventListener("mouseup", levantar);
document.addEventListener("mousemove", dibujar);

// Menú
btnLimpiar.addEventListener("click", limpiarLienzo);
for (let i = 0; i < btnColores.length; i++) {
    btnColores[i].addEventListener("click", () => cambiarColor(colores[i]));
}
//#endregion

//#region Conf Pincel
canvasContext.lineJoin = 'round';
canvasContext.lineCap = 'round';
canvasContext.strokeStyle = colores[0];
canvasContext.lineWidth = 10;
//#endregion

let mouseX = -1;
let mouseY = -1;
let tmpMouseX = -1;
let tmpMouseY = -1;

function toggleDibujar() {
    return dibujando = !dibujando;
}

function apoyar(event) {
    if (lapizActivo) {
        if (toggleDibujar()) {
            let y = event.layerY;
            let x = event.layerX;
            console.log(y + ";" + x)
        }
    }
}

function dibujar(event) {
    if (dibujando) {
        if (tmpMouseX == -1) {

            mouseX = event.layerX;
            mouseY = event.layerY;
            dibujarLinea(mouseX, mouseY, mouseX, mouseY);
            tmpMouseX = mouseX;
            tmpMouseY = mouseY;

        } else {

            mouseX = event.layerX;
            mouseY = event.layerY;
            dibujarLinea(tmpMouseX, tmpMouseY, mouseX, mouseY)
            tmpMouseX = mouseX;
            tmpMouseY = mouseY;

        }
    }
}

function levantar(event) {
    if (dibujando) {
        toggleDibujar();
        tmpMouseX = -1;
        tmpMouseY = -1;
    }
}

function punto(event) {
    mouseX = event.layerX;
    mouseY = event.layerY;
    dibujarLinea(mouseX - 1, mouseY - 1, mouseX + 1, mouseY + 1);
}

function dibujarLinea(xinicial, yinicial, xfinal, yfinal, ctx = canvasContext) {
    ctx.beginPath();
    ctx.moveTo(xinicial, yinicial);
    ctx.lineTo(xfinal, yfinal);
    ctx.stroke();
    ctx.closePath();
}

function cambiarColor(color) {
    canvasContext.strokeStyle = color;
}

function limpiarLienzo() {
    let w = canvas.width;

    let tmpColor = canvasContext.strokeStyle;
    canvasContext.strokeStyle = "white";

    for (let i = 0; i < w; i++) {
        dibujarLinea(i, 0, i, 1200);
    }

    canvasContext.strokeStyle = tmpColor;
}