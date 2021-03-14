//interaccion Botones Redes Sociales
var red = ["https://github.com/freddyfernandez", "https://www.linkedin.com/in/freddy-fernandez-fc", "https://wa.me/51957490024"];

function redsocial(x) {
    window.open(red[x]);
}


//muestreo de seccciones
var carrousel = document.getElementsByClassName("carrousel");
var seccion1 = document.getElementsByClassName("about");
var seccion2 = document.getElementsByClassName("schedule");
var seccion3 = document.getElementsByClassName("classes");
//var seccion4 = document.getElementsByClassName("schedule");
var seccion5 = document.getElementsByClassName("gallery");
var seccion6 = document.getElementsByClassName("schedule");
var seccion7 = document.getElementsByClassName("price-package");

function mostrar(x) {


    if (x == 1) {
        carrousel[0].style.display = 'none';
        seccion2[0].style.display = 'none';
        seccion3[0].style.display = 'none';
        seccion5[0].style.display = 'none';
        seccion6[1].style.display = 'none';
        seccion7[0].style.display = 'none';

        seccion1[0].style.display = 'block';
    } else if (x == 2) {
        carrousel[0].style.display = 'none';
        seccion1[0].style.display = 'none';
        seccion3[0].style.display = 'none';
        seccion5[0].style.display = 'none';
        seccion6[1].style.display = 'none';
        seccion7[0].style.display = 'none';

        seccion2[0].style.display = 'block';
    } else if (x == 3) {
        carrousel[0].style.display = 'none';
        seccion1[0].style.display = 'none';
        seccion2[0].style.display = 'none';
        seccion5[0].style.display = 'none';
        seccion6[1].style.display = 'none';
        seccion7[0].style.display = 'none';

        seccion3[0].style.display = 'block';
    }
    //else if (x == 4) {

    //seccion4[1].style.display = 'block';
    //} 
    else if (x == 5) {
        carrousel[0].style.display = 'none';
        seccion1[0].style.display = 'none';
        seccion2[0].style.display = 'none';
        seccion3[0].style.display = 'none';
        seccion6[1].style.display = 'none';
        seccion7[0].style.display = 'none';

        seccion5[0].style.display = 'block';
    } else if (x == 6) {
        carrousel[0].style.display = 'none';
        seccion1[0].style.display = 'none';
        seccion2[0].style.display = 'none';
        seccion3[0].style.display = 'none';
        seccion5[0].style.display = 'none';
        seccion7[0].style.display = 'none';

        seccion6[1].style.display = 'block';
    } else if (x == 7) {
        carrousel[0].style.display = 'none';
        seccion1[0].style.display = 'none';
        seccion2[0].style.display = 'none';
        seccion3[0].style.display = 'none';
        seccion5[0].style.display = 'none';
        seccion6[1].style.display = 'none';


        seccion7[0].style.display = 'block';
    } else if (x == 0) {
        carrousel[0].style.display = 'block';
        seccion1[0].style.display = 'none';
        seccion2[0].style.display = 'none';
        seccion3[0].style.display = 'none';
        seccion5[0].style.display = 'none';
        seccion6[1].style.display = 'none';
        seccion7[0].style.display = 'none';



    }
}