import { Component, OnInit } from '@angular/core';
import { Conocimiento } from 'src/app/models/conocimiento.model';
import { ConocimientoService } from 'src/app/services/conocimiento.service';


declare var $:any;
declare var Glider:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'

})
export class HomeComponent implements OnInit {

  public conocimientos:Conocimiento[] = [];  

  constructor(private conocimientoService:ConocimientoService) { }

  cargarConocimiento(){

    this.conocimientoService.cargaConocimientos()
    .subscribe(conocimientos=>{
      this.conocimientos = conocimientos;
    })

  }


  ngOnInit(): void {

    this.cargarConocimiento();
    
    let nav = document.getElementById('nav');
    let menu = document.getElementById('enlaces');
    let abrir = document.getElementById('open');
    let abierto = false;

    function animationfadeIn(){

        if(screen.width >= 700){

            $(".text , .h1fade").each(function() {
                var imagePos = $(this).offset().top;
        
                var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow + 600) {
                    $(this).addClass("animated fadeInLeft");
            
                }
            });
            $(".accordian , .h2fade").each(function() {
                var imagePos = $(this).offset().top;
        
                var topOfWindow = $(window).scrollTop();
                if (imagePos < topOfWindow + 600) {
                    $(this).addClass("animated fadeInRight");
                }
            });
            
        }

    }
    
    $(window).scroll(function() {
        menus();
        animationfadeIn();     
    });
    
    
    $(abrir).click(function() {
        abierto=true;
        apertura();
    });
    
    $(window).resize(function() {
    
        if (screen.width >= 700) {
            abierto = true;
            menu.style.removeProperty('overflow');
            menu.style.removeProperty('width');
    
        }
    });
    
    $(window).click(function(e: { target: HTMLSpanElement; }) {
   
        if (abierto == false) {
            let span = document.querySelector('span');
            if (e.target !== span && e.target !== abrir) {
                menu.style.width = '0%';
                menu.style.overflow = 'hidden';
                abierto = true;
                $(".ham-burger").removeClass("active");
            }
        }
    
    });
    
    
    function menus() {
        let desplazamiento_actual = window.pageYOffset;
    
        if (desplazamiento_actual <= 100) {
            nav.classList.remove('nav2');
            nav.className = ('nav1');
            nav.style.transition = '1s';
            menu.style.top = '80px';
    
        } else {
            nav.classList.remove('nav1');
            nav.className = ('nav2')
            nav.style.transition = '1s';
            menu.style.top = '84px';
            abrir.style.color = '#fff';
        }
    }
        
    function apertura() {
        if (abierto==true) {

            menu.style.width = '100vw';
            menu.style.display = 'block';
            menu.style.transition = 'all 0.5s ease-out'
            abierto = false;

        } else {
          
            menu.style.width = '0%';
            menu.style.overflow = 'hidden';
            abierto = true;

        }
    }
    
  
  /*Menu lateral*/
  
  $(document).ready(function() {
  
      $(".ham-burger, .enlaces a").click(function() {
          $(".enlaces").toggleClass("open");
          $(".ham-burger").toggleClass("active");
      })
      $(".accordian-container").click(function() {
          $(".accordian-container").children(".body").slideUp();
          $(".accordian-container").removeClass("active")
          $(".accordian-container").children(".head").children("span").removeClass("fa-angle-down").addClass("fa-angle-up")
          $(this).children(".body").slideDown();
          $(this).addClass("active")
          $(this).children(".head").children("span").removeClass("fa-angle-up").addClass("fa-angle-down")
      })
  
      $(".enlaces a, .go-down").click(function(event: { preventDefault: () => void; }) {
          if (this.hash !== "") {
  
              event.preventDefault();
  
              var hash = this.hash;
  
              $('html,body').animate({
                  scrollTop: $(hash).offset().top
              }, 800, function() {
                  window.location.hash = hash;
              });
  
              // add active class in navigation
              $(".enlaces a").removeClass("active")
              $(this).addClass("active")
          }
      })
  })

  /**/
  window.addEventListener('load', function() {
    animationfadeIn();
    new Glider(document.querySelector('.carousel__lista'), {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: '.carousel__indicadores',
        arrows: {
            prev: '.carousel__anterior',
            next: '.carousel__siguiente'
        },
        responsive: [{
            // screens greater than >= 775px
            breakpoint: 450,
            settings: {
                // Set to `auto` and provide item width to adjust to viewport
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            // screens greater than >= 1024px
            breakpoint: 800,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        }]
      });
    });

  }

}
