import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CjPlantsList } from './components/plants/cj-plants-list/cj-plants-list';
import { CjPlantsAdd } from './components/plants/cj-plants-add/cj-plants-add';
import { CjHome } from './components/cj-home/cj-home';


const routes: Routes = [
  {path:"", component:CjHome},
  {path:"home", component:CjHome},
  {path:"plants-list", component: CjPlantsList},
  {path:"plants-add", component:CjPlantsAdd},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
