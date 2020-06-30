import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router} from '@angular/router';
import {FormGroup, FormBuilder, NgForm} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {HttpErrorResponse} from '@angular/common/http';
import {User} from '../../Models/User';
import {Offre} from '../../Models/Offre';
import {OffreService} from '../../Services/offre.service';
import {MultiSelectComponent} from '@syncfusion/ej2-angular-dropdowns';
import {Cv} from '../../Models/Cv';
import {delay} from 'rxjs/operators';
@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {


  public skills = [];
  public managers=[];
  offres: Array<Offre> = []
  // maps the local data column to fields property
  public localFields: Object = { text: 'Name', value: 'Name' };
  // set the placeholder to MultiSelect Dropdown input element
  public localWaterMark: string = 'Choisir skills';
  div1: boolean;
  div2: boolean;
  div3: boolean;
  public value: [] ;
  public closeResult: string;
  offre:Offre
  modifOffre:Offre
   showEquipe: boolean=false;
  equipes:[]
   errorAdd: boolean=false;
   OneOffre: Offre;


  constructor(private modalService: NgbModal,private router: Router,private fb: FormBuilder,private offreService:OffreService) {



  }



  ngOnInit(): void {
    this.offres=[]
    this.OneOffre=new Offre()

    this.offreService.getAllOffre().subscribe((data)=>{
      this.offres=data
    },(err)=>{


    })

    this.showOffrePage()
  }
  showOffrePage()
  {
    this.modifOffre=new Offre()
    this.offre=new Offre();
        this.value=null

    this.errorAdd=false
    this.div1 = true;
    this.div2 = false;
    this.div3 = false;


  }
  showAjout(){
    this.offreService.getAllSkills().subscribe((data)=>{
      this.skills=data
    },(err)=>{

    });

    this.offreService.getAllManager().subscribe((data)=>{
      this.managers=data
    },(err)=>{

    });


    this.div1=false;
    this.div2=true;
    this.div3=false;

  }
  showModif(id){
    this.offreService.getOffre(id).subscribe((data)=>{

      this.modifOffre=data

      },
      (error :HttpErrorResponse) => {


      })

    this.div1=false;
    this.div2=false;
    this.div3=true;

  }


  public openDetails(content,id) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${OffresComponent.getDismissReason(reason)}`;
    });
    this.offreService.getOffre(id).subscribe(data=>{


      this.OneOffre=data
      this.offreService.getUser(this.OneOffre.manager).subscribe((data)=>{


        this.OneOffre.manager=data.prenom+" "+data.nom

      },(error) => {})

    }, err => {



    });
  }

  public openArchive(content,id) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${OffresComponent.getDismissReason(reason)}`;
    });

    this.offreService.getOffre(id).subscribe(data=>{


      this.OneOffre=data


    }, err => {



    });

  }
  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  AjoutOffre(){

    this.offre.skills=this.value

    if (!this.offre.skills || !this.offre.manager || !this.offre.equipe )
    {

      this.errorAdd=true
    }
    else {
      this.offreService.add(this.offre).subscribe(data => {
          this.errorAdd=false
          this.value=null



          setTimeout(()=>{this.ngOnInit() }, 2000)        },
        (err : HttpErrorResponse)=>{
          if(err.status===422)
          {          console.log(err)

            this.errorAdd=true

          }


        });
    }



}



  setReplyTypeValue() {

    console.log(this.offre.manager)
    this.offre.equipe=""
    this.offreService.getEquipesByManager(this.offre.manager).subscribe((data)=>{
  this.equipes=data
      this.showEquipe=true

    },(err)=>{})

  }

  archiverOffre() {
    console.log("ok")

    this.OneOffre.etat="archivé"
    this.offreService.editOffre(this.OneOffre, this.OneOffre.id).subscribe((data) => {
      console.log(data)
      window.location.reload()
      },
      (err: HttpErrorResponse) => {


      });
  }


  updateOffre(id)
  {

    this.offreService.editOffre(this.modifOffre,id).subscribe((data)=>{

      this.errorAdd=true
      this.showOffrePage()

      setTimeout(()=>{this.ngOnInit() }, 1000)



    },(err:HttpErrorResponse)=>{



      if(err.status===422)
      {
        this.errorAdd=true

      }


    })


  }
  isCollaborateur() {
    return localStorage.getItem("isNotCollaborateur") === "true";}

}
