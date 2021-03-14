import { Component, OnInit } from '@angular/core';


declare var $:any;
declare var Glider:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'
  ]

})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    let nav = document.getElementById('nav');
    let menu = document.getElementById('enlaces');
    let abrir = document.getElementById('open');
    let cerrado = true;
    
    
    $(window).scroll(function() {
        menus();
    });
    
    
    $(abrir).click(function() {
        apertura();
    });
    
    $(window).resize(function() {
    
        if (screen.width >= 700) {
            cerrado = true;
            menu.style.removeProperty('overflow');
            menu.style.removeProperty('width');
    
        }
    });
    
    $(window).click(function(e) {
   
        if (cerrado == false) {
            let span = document.querySelector('span');
            if (e.target !== span && e.target !== abrir) {
                menu.style.width = '0%';
                menu.style.overflow = 'hidden';
                cerrado = true;
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
        if (cerrado) {
            menu.style.width = '70vw';
            menu.style.display = 'block';
            cerrado = false;
        } else {
            menu.style.width = '0%';
            menu.style.overflow = 'hidden';
            cerrado = true;
        }
    
    
    }
    
    
    $(window).scroll(function() {
        $(".text").each(function() {
            var imagePos = $(this).offset().top;
    
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow + 600) {
                $(this).addClass("animated fadeInLeft");
            }
        });
        $(".accordian").each(function() {
            var imagePos = $(this).offset().top;
    
            var topOfWindow = $(window).scrollTop();
            if (imagePos < topOfWindow + 600) {
                $(this).addClass("animated fadeInRight");
            }
        });
    });
  
  /*Menu lateral*/
  
  $(document).ready(function() {
  
      $(".ham-burger, .enlaces a").click(function() {
  
          $(".enlaces").toggleClass("open")
  
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
  
      $(".enlaces a, .go-down").click(function(event) {
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
