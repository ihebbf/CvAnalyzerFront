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
import {AuthGuard} from './Helpers/auth.guard.ts';
import {ProfilComponent} from './Components/profil/profil.component';
import {ErrorComponent} from './error/error.component';

const routes: Routes = [{path: 'home', component: HomeComponent,canActivate:[AuthGuard],data: { roles: localStorage.getItem("isNotCollaborateur")}},
  {path: 'inscription', component: InscriptionComponent},

  {path: 'cvs', component: CvsComponent,canActivate:[AuthGuard]},
  {path: 'offres', component: OffresComponent,canActivate:[AuthGuard]},

  {path: 'profil', component: ProfilComponent,canActivate:[AuthGuard]},
  {path: 'error', component: ErrorComponent,canActivate:[AuthGuard]},

  {path: 'matching', component: ClassificationComponent,canActivate:[AuthGuard],data: { roles: localStorage.getItem("isNotCollaborateur")}},
  {path: 'login', component: AuthentificationComponent},
  {path:'', redirectTo:'/cvs',canActivate:[AuthGuard], pathMatch: 'full'},
  {path:'**', redirectTo:'/error',canActivate:[AuthGuard], pathMatch: 'full'}


];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
})

export class AppRoutingModule { }
