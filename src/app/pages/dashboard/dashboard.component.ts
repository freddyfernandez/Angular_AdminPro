import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { pc } from 'src/app/interfaces/cargar-pcs.interfaces';
import { PcfireService } from 'src/app/services/pcfire.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [ './dashboard.component.css'
  ]
})

//CUANDO NO SEA VISIBLE ESTA PAGINA DEL COMPONENTE LLAMA A LA FUNCION ONDESTROY
export class DashboardComponent  implements OnDestroy, OnInit{

  @Input() results:any[]=[];
  pcs: any[]=[];
  
  /*
  results: any[]=[
    
    {
      "name": "Juego 1",
      "value": 8940000
    },
    {
      "name": "Juego 2",
      "value": 5000000
    },
    {
      "name": "Juego 3",
      "value": 7200000
    }
  ];;

  */

  view:any[]=[600,400]; 

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Juegos';
  showYAxisLabel = true;
  yAxisLabel = 'Votos';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  onSelect(event) {
     console.log(event);
  }
  
  intervalo;

  constructor(private pcfireService: PcfireService,private db:AngularFirestore){
    /*
    this.intervalo=setInterval(()=>{
      console.log('tick');
      const newResults = [...this.results];
      for(let i in newResults){
        newResults[i].value = Math.round(Math.random()*500) 
      }

      this.results = [...newResults];
    },1500);
    */
  
  }
  ngOnInit() :void {
    
    this.db.collection('PCS').valueChanges().pipe(map((resp:pc[])=> resp.map(({name,votos})=>({name:name,value:votos}))))
    .subscribe(resp=>{
      this.pcs=resp;
    })

  }
  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }

}
