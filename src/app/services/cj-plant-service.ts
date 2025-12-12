import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plant } from '../models/Plant';

@Injectable({
  providedIn: 'root'
})
export class CjPlantService {
  ruta_servidor:string = "http://localhost:8080/upc";
  recurso:string="plants";

  constructor(private http:HttpClient){}
  
  getAll(){
    return this.http.get<Plant[]>(this.ruta_servidor+"/"+this.recurso);
  }

  getById(id: number){
    return this.http.get<Plant>(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  deleteById(id: number){
    return this.http.delete(this.ruta_servidor+"/"+this.recurso+"/"+id.toString());
  }

  new(faculty: Plant){
    return this.http.post<Plant>(this.ruta_servidor+"/"+this.recurso,faculty);
  }

  edit(faculty: Plant){
    return this.http.put<Plant>(this.ruta_servidor+"/"+this.recurso,faculty);
  }
  
}
