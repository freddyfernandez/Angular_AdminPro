import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { pc } from '../interfaces/cargar-pcs.interfaces';


@Injectable({
  providedIn: 'root'
})
export class PcfireService {
  //declara Coleccion de un array de pcs
  computadoras: Observable<pc[]>;
  listadoPcs:pc[]=[];
  //
  private computadorasColeccion: AngularFirestoreCollection<pc>;

  constructor(private afs:AngularFirestore) {
    this.computadorasColeccion= afs.collection<pc>('PCS');

   }

   getPcs(){
     
     if(this.listadoPcs.length>0){
      console.log('Desde cache: carga Arraylist');
      return this.computadoras;

     }
     else{
      console.log('Desde Internet: carga Inicial')
      return this.computadoras = this.computadorasColeccion.valueChanges().pipe(
        map((resp:pc[])=>{
          return this.listadoPcs=resp;
        }),
        tap(computadoras=> this.computadoras = this.computadoras)
      );
     }
     
   }

   updateVotacion(pc: pc){
     
    return new Promise(async ()=>{
      try {
        const id= pc.id
        const data = {id,...pc};//...pc puede tomar varios valores:id,voto ...
        await this.computadorasColeccion.doc(id).update(data).then(()=>{
            Swal.fire('Gracias,',data.name,'success');
        });

      } catch (err) {
        Swal.fire('No existe Id,',err.message,'error');
        return of(err.message);
        
      }
    })
   }

   onSavePC(pc: pc,pcId:string):Promise<void>{
     return new Promise(async (resolve,reject)=>{
       try {
         const id= pcId || this.afs.createId();
         const data = {id, ...pc};
         const result =  await this.computadorasColeccion.doc(id).set(data);
         resolve(result);

       } catch (err) {
         reject(err.message);
       }
     })
   }

   onDelete(pcId:string):Promise<void>{
     return new Promise(async (resolve,reject) => {
       try {
         const result= await this.computadorasColeccion.doc(pcId).delete();
         resolve(result);
       } catch (error) {

        reject(error.message); 
         
       }
       
     })
   }
}
