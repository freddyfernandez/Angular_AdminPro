import { Component } from '@angular/core';
//LIBRERIA RXJS QUE MANEJA OBSERVABLES Y MAPS
import { interval, Observable } from 'rxjs';
import { filter, map, retry, take } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() { 
     /*
     //PIPE TRASFORMA LA INFORMACION 
     this.retornaObservable().pipe(retry(2)).subscribe(
      valor => console.log('Subs:',valor),
      error => console.warn('Error',error),
      () => console.info('Obs terminado')
    );*/

    this.retornaIntervalo().subscribe(
      (valor) => console.log(valor)
    )


  }
  //INTERVALOS FORMA 1
  retornaIntervalo(): Observable<number>{

    const intervalor = interval(500).pipe(
      //EL ORDEN DE LOS OPERADORES SON SECUENCIALES
      map(valor => valor+1),
      take(10),
      filter(valor=>(valor%2===0)?true:false),
      );
      return intervalor;

  }
  
  //INTERVALOS FORMA 2
  retornaObservable():Observable<number>{

    let i=-1;
     //EL <TIPO> ES OPCIONAL PARA VALIDAR DATOS
    const obs = new Observable<number>(observer =>{

    
      const intervalo = setInterval(()=>{ 
        i++;
        //EL === COMPARA EL VALOR NO EL TIPO
        observer.next(i);
        if(i===4){
          clearInterval(intervalo);
          observer.complete();
        }
        if(i===2){
          observer.error('i llego al valor de 2'); 
        }
      },1000)
    }); 
   return obs;
    
  }


}
