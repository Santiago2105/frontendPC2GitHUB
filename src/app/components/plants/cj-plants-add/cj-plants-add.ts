import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { CjPlantService } from '../../../services/cj-plant-service';
import { Plant } from '../../../models/Plant';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-cj-plants-add',
  standalone: false,
  templateUrl: './cj-plants-add.html',
  styleUrl: './cj-plants-add.css',
})
export class CjPlantsAdd {

  crudForm!:FormGroup;
  plantId:number=0;


  constructor(private plantService:CjPlantService, private formBuilder: FormBuilder,
              private snack: MatSnackBar, private router: Router, private activatedRoute:ActivatedRoute){}

  ngOnInit(){
    this.CargarFormulario();
  }

  

  CargarFormulario() {
    this.crudForm = this.formBuilder.group(
      {
        id:[""],
        name:["",[Validators.required, Validators.minLength(4)]],
        description:["",[Validators.required, Validators.minLength(4), Validators.maxLength(200)]],
        plantingDate:[""],
        exterior:[""],
        interior:[""],
        producesFruit:[""],
      }
    );

    this.plantId = parseInt(this.activatedRoute.snapshot.params["id"]);

    if (this.plantId>0 && this.plantId!=undefined) {

        this.plantService.getById(this.plantId).subscribe({
            next:(data:Plant)=>{
              this.crudForm.get("id")?.setValue(data.id);
              this.crudForm.get("name")?.setValue(data.name);
              this.crudForm.get("description")?.setValue(data.description);
              this.crudForm.get("plantingDate")?.setValue(data.plantingDate+"T00:00:00");
              this.crudForm.get("exterior")?.setValue(data.exterior);
              this.crudForm.get("interior")?.setValue(data.interior);
              this.crudForm.get("producesFruit")?.setValue(data.producesFruit);
            }
        })

    }


  }

  Grabar(){

    if (this.crudForm.valid) {


      const plant:Plant= {
        id: this.crudForm.get("id")?.value,
        name: this.crudForm.get("name")?.value,
        description: this.crudForm.get("description")?.value,
        plantingDate: this.crudForm.get("plantingDate")?.value,
        exterior: this.crudForm.get("exterior")?.value,
        interior: this.crudForm.get("interior")?.value,
        producesFruit: this.crudForm.get("producesFruit")?.value,
      };


        if (plant.id>0) {
          this.plantService.edit(plant).subscribe({
              next:(data:Plant)=>{
                this.snack.open("Se actualizó la facultad con el Id "+data.id.toString(),"OK",{duration:2000});
                this.router.navigate(["/plants-list"]);
              },
                error: (http_error)=>{
                        this.snack.open("ERROR: No se actualizó el registro solicitado. "+http_error.error.message,"OK",{duration:5000});
                        console.log(http_error);
              }  
          })
        } else {
            this.plantService.new(plant).subscribe({
            next:(data:Plant)=>{
              this.snack.open("Se agregó la Planta y se asignó el Id "+data.id.toString(),"OK",{duration:2000});
              this.router.navigate(["/plants-list"]);
            },
                error: (http_error)=>{
                        this.snack.open("ERROR: No se agregó el registro solicitado. "+http_error.error.message,"OK",{duration:5000});
                        console.log(http_error);
            }  
          })
        }
    } else {
      this.crudForm.markAllAsTouched();
    }

  }

}
