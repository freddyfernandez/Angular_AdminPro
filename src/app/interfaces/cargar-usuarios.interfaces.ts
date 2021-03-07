import { Usuario } from "../models/usuario.model";
//DATOS ADICIONALES A LA CLASE 
export interface cargaUsuarios{
    total: number;
    usuarios: Usuario[]; 
}