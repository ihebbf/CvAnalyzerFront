import { Component, OnInit } from '@angular/core';
import {OffreService} from '../../Services/offre.service';
import {Offre} from '../../Models/Offre';
import {User} from '../../Models/User';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {Cv} from '../../Models/Cv';
import {CvService} from '../../Services/cv.service';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css']
})
export class ClassificationComponent implements OnInit {
  public closeResult: string;

  managers: Array<User> = []
  equipes:[]
  equipe:any
  manager:any
  showEquipe: boolean=false;
   offres:  Array<Offre> = []
  offresSearch:  Array<Offre> = []
  CvMatching:  Array<Cv> = []
  OneCv: Cv

  offre: Offre;
   showStep2: boolean=false;
  showStep1: boolean=false;
  showStep3: boolean=false;
   OneOffre: Offre;
  radioId: any;


  constructor(private offreService:OffreService,private cvService:CvService,private modalService: NgbModal,private router: Router) { }

  ngOnInit(): void {
    this.OneCv=new Cv()

    this.showStep1=true
    this.showStep2=false
    this.showStep3=false
    this.offre =new Offre()
    this.OneOffre =new Offre()

    this.offreService.getAllManager().subscribe((data)=>{
      this.managers=data
    },(err)=>{

    });

    this.offres=[]

    this.offreService.getAllActif().subscribe((data)=>{
      this.offres=data
    },(err)=>{


    })
  }


  setReplyTypeValue() {

    this.offreService.getEquipesByManager(this.offre.manager).subscribe((data)=>{
      this.equipes=data
      this.showEquipe=true

    },(err)=>{})
  }
  public openDetails(content,id) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.offreService.getOffre(id).subscribe(data=>{


      this.OneOffre=data
      this.offreService.getUser(this.OneOffre.manager).subscribe((data)=>{


        this.OneOffre.manager=data.prenom+" "+data.nom

      },(error) => {})

    }, err => {



    });
  }





  recherche() {
    this.offreService.search(this.offre).subscribe((data)=>{
      this.offresSearch=data
      console.log(this.offresSearch)
      this.showStep1=false
      this.showStep2=true
      this.showStep3 =false

    },(err)=>{})
  }

  match() {
this.offreService.matching(this.radioId).subscribe((data)=>{

  this.CvMatching=data
  this.showStep1=false
  this.showStep2=false
  this.showStep3 =true
},(err)=>{})
  }

  retourStep1() {
    this.showStep1=true
    this.showStep2=false
    this.showStep3 =false
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  public openDetailsCVs(content,id) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.cvService.getCv(id).subscribe(data=>{

      this.OneCv=data



    }, err => {



    });


  }

  retourStep2() {
    this.showStep1=false
    this.showStep2=true
    this.showStep3 =false
  }


}

