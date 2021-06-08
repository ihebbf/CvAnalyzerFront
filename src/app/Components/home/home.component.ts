import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import {  Label } from 'ng2-charts';
import {AuthentificationService} from '../../Services/authentification.service';
import {NavigationEnd, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {OffreService} from '../../Services/offre.service';
import {StatistiquesService} from '../../Services/statistiques.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  navigationSubscription
  public type: ChartType = 'line';
  public doughnutChartLabels = [];
  public doughnutChartData = [];
  public doughnutChartType = 'doughnut';
  public labels: Label[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin','Juillet','Aout',"Septembre","Octobre","Novembre","Décembre"];


  public datasets: ChartDataSets[] = []


  public datasetOffre: ChartDataSets[] = []

  public options: ChartOptions = {
    legend: {
      display: false
    }
  };
   showPieCVs: boolean=false;
  showPieOffre: boolean=false;

  allCount= []
   OffrePerMounth=[];

  constructor(private authService: AuthentificationService,private router:Router,private statService: StatistiquesService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.statService.countAll().subscribe((data)=>{
      this.allCount=data


    },(err)=>{})

    this.pieOffre()
    if(localStorage.getItem('userToken')){

    this.authService.getCurrentUser().subscribe(data => {

    console.log(data)
      },
      (err : HttpErrorResponse)=>{

      });
    }
  }

  pieOffre() {

  this.statService.countOffrePerMonth().subscribe((data)=>{

    this.OffrePerMounth=data
    console.log(this.OffrePerMounth)

  },(err)=>{})
    this.datasets=[{
      label: 'Offre',
      data: this.OffrePerMounth,
      backgroundColor: [
        'rgba(0, 0, 0, 0)',
      ],
      borderColor: [

        'rgb(42,128,255)',

      ],
      borderWidth: 1
    }]
    this.showPieOffre=true
    this.showPieCVs=false
    this.doughnutChartLabels = ['Active', 'Archivé'];
    this.statService.countOffreCategory().subscribe((data)=>{
      this.doughnutChartData=data


    },(err)=>{})
    this.datasetOffre = [{
      data: this.doughnutChartData,
      backgroundColor: [
        'rgba(242,112,28,1)',
        'rgba(135,206,250,1)',


      ],
      borderColor: [
        'rgba(242,112,28,1)',
        'rgba(135,206,250,1)',



      ],
      borderWidth: 1
    }];


  }

  pieCVs() {

    this.statService.countCVPerMonth().subscribe((data)=>{

      this.OffrePerMounth=data
      console.log(this.OffrePerMounth)

    },(err)=>{})
    this.datasets=[{
      data: this.OffrePerMounth,
      backgroundColor: [
        'rgba(0, 0, 0, 0)',
      ],
      borderColor: [

        'rgb(42,128,255)',

      ],
      borderWidth: 1
    }]
    this.showPieOffre=false
    this.showPieCVs=true
    this.doughnutChartLabels = ['En cours','Archivé',"Recruté"];
    this.statService.countCvsCategory().subscribe((data)=>{
      this.doughnutChartData=data


    },(err)=>{})
    this.datasetOffre = [{
      data: this.doughnutChartData,
      backgroundColor: [
        'rgb(255,104,29)',
        'rgba(54, 162, 235, 1)',
        'rgba(193,216,48,1)'

      ],
      borderColor: [
        'rgb(255,104,29)',
        'rgba(54, 162, 235, 1)',
        'rgba(193,216,48,1)'


      ],
      borderWidth: 1
    }];


  }

}
