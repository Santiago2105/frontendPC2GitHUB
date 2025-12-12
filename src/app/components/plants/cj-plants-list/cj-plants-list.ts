import { Component } from '@angular/core';
import { Plant } from '../../../models/Plant';
import { CjPlantService } from '../../../services/cj-plant-service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CjDeleteConfirmations } from '../../confirmations/cj-delete-confirmations/cj-delete-confirmations';

@Component({
  selector: 'app-cj-plants-list',
  standalone: false,
  templateUrl: './cj-plants-list.html',
  styleUrl: './cj-plants-list.css',
})
export class CjPlantsList {

  dsPlants=new MatTableDataSource<Plant>();
  displayedColumns:string[]=['id','name','description','plantingDate','exterior','interior','producesFruit','opciones'];

  constructor(private plantService:CjPlantService, private dialog: MatDialog, private snack: MatSnackBar){}

  ngOnInit(){
    this.CargarLista();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dsPlants.filter = filterValue.trim().toLowerCase();
  }

  CargarLista(){

    this.plantService.getAll().subscribe({
      next: (data:Plant[])=>{
        this.dsPlants=new MatTableDataSource(data);          
        
      },
      error: (err)=>{
          console.log(err);
      }      
    });  
  }

  
  Borrar(id:number){
    let dialogReference = this.dialog.open(CjDeleteConfirmations);

    dialogReference.afterClosed().subscribe(
      opcionSelecionada=>{

        if(opcionSelecionada) {
          this.plantService.deleteById(id).subscribe({
            next:()=>{
                    this.snack.open("Se eliminó correctamente","OK",{duration:2000});
                      this.CargarLista();
                    },
            error: (http_error)=>{
                    this.snack.open("ERROR: No se eliminó el registro solicitado. "+http_error.error.message,"OK",{duration:5000});
                    console.log(http_error);
            }   
          })
        }
      }
    );
    
  }
}
