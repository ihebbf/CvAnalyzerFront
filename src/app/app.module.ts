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
import {HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './Helpers/auth.guard.ts';
import { ProfilComponent } from './Components/profil/profil.component';
import { ErrorComponent } from './error/error.component';
import {CvService} from './Services/cv.service';
import {NotifierModule, NotifierOptions} from 'angular-notifier';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'right',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 10000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
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
    ProfilComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ChartsModule,
    MultiSelectAllModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotifierModule.withConfig(customNotifierOptions),



  ],
  providers: [HttpClientModule, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
