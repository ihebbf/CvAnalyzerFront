import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './Components/home/home.component';
import { CvsComponent } from './Components/cvs/cvs.component';
import { OffresComponent } from './Components/offres/offres.component';
import { ClassificationComponent } from './Components/classification/classification.component';
import { AuthentificationComponent } from './Components/authentification/authentification.component';
import { ChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { UploadFileComponent } from './Components/upload-file/upload-file.component';
import {DragDropDirective} from './drag-drop.directive';
import { InscriptionComponent } from './Components/inscription/inscription.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MultiSelectAllModule} from '@syncfusion/ej2-angular-dropdowns';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CvsComponent,
    OffresComponent,
    ClassificationComponent,
    AuthentificationComponent,
    UploadFileComponent,
    DragDropDirective,
    InscriptionComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ChartsModule,
    MultiSelectAllModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
