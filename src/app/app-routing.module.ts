import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './Components/home/home.component';
import {CvsComponent} from './Components/cvs/cvs.component';
import {OffresComponent} from './Components/offres/offres.component';
import {ClassificationComponent} from './Components/classification/classification.component';
import { ChartsModule } from 'ng2-charts';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import {AuthentificationComponent} from './Components/authentification/authentification.component';
import {InscriptionComponent} from './Components/inscription/inscription.component';

const routes: Routes = [{path: 'home', component: HomeComponent},
  {path: 'inscription', component: InscriptionComponent},

  {path: 'cvs', component: CvsComponent},
  {path: 'offres', component: OffresComponent,
    runGuardsAndResolvers: 'always'},
  {path: 'matching', component: ClassificationComponent},
  {path: 'login', component: AuthentificationComponent},
  {path: '', component: HomeComponent}];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
})

export class AppRoutingModule { }
