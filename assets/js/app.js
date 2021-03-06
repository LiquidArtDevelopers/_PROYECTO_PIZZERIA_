import loadAnimation from "./preload.js";
import formulario from "./form.js";
import componentes from "./components.js";
import pedido from "./orders.js";
import dataCookies from "./dataCookies.js";
import carousel from "./carousel.js";
import ofertas from "./ofertas.js";
import grafica from "./grafica.js";
import modales from "./modales.js";

const d=document;
d.addEventListener('DOMContentLoaded',()=>{
    //Llamar a la animación de carga  .
    loadAnimation();
    //Script que gestiona las cookies.
    dataCookies();
    //carrousel
    carousel();
    //Validación de formulario.
    formulario();
    //pedido
    pedido();
    //ofertas
    ofertas();
    //grafica
    grafica();
    //ventanas modales
    modales();
    //Llamar a componentes.
    componentes();
});
