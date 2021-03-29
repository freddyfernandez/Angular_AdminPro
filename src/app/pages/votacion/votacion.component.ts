import { Component, OnInit } from '@angular/core';
import { pc } from 'src/app/interfaces/cargar-pcs.interfaces';
import { PcfireService } from 'src/app/services/pcfire.service';

@Component({
  selector: 'app-votacion',
  templateUrl: './votacion.component.html',
  styleUrls: ['./votacion.component.css']
})
export class VotacionComponent implements OnInit {
  pcs: pc[]=[];
  constructor(private pcfireService: PcfireService) { }

  ngOnInit(){

    this.pcfireService.getPcs().subscribe(respuesta =>{
      this.pcs=respuesta;
  });
    
  }
  
  votar(objPC:pc){
        objPC.votos+=1;
        this.pcfireService.updateVotacion(objPC);
  }

}
