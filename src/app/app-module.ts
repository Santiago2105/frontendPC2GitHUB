import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CjDeleteConfirmations } from './components/confirmations/cj-delete-confirmations/cj-delete-confirmations';
import { CjPlantsAdd } from './components/plants/cj-plants-add/cj-plants-add';
import { CjPlantsList } from './components/plants/cj-plants-list/cj-plants-list';
import { MaterialModuleModule } from './modules/material-module/material-module-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CjHome } from './components/cj-home/cj-home';
import { Header } from './components/header/header';





@NgModule({
  declarations: [
    App,
    CjDeleteConfirmations,
    CjPlantsAdd,
    CjPlantsList,
    CjHome,
    Header,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModuleModule,
    FormsModule,
    ReactiveFormsModule,
  
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideNativeDateAdapter()


  ],
  bootstrap: [App]
})
export class AppModule { }
