import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationEnd, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {CvService} from '../../Services/cv.service';
import {User} from '../../Models/User';
import {Cv} from '../../Models/Cv';
import {dateComparator} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools';
import {HttpErrorResponse} from '@angular/common/http';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.component.html',
  styleUrls: ['./cvs.component.css']
})
export class CvsComponent implements OnInit{
  navigationSubscription
  private readonly notifier: NotifierService;
  public closeResult: string;
  div1: boolean;
  div2: boolean;
   cvs: Array<Cv> = []
  OneCv: Cv
  modifCV:Cv

  constructor(notifierService: NotifierService,private modalService: NgbModal, private router: Router, private fb: FormBuilder,private cvService:CvService) {
    this.notifier = notifierService;

  }

  ngOnInit(): void{

    this.cvs=[]
    this.OneCv=new Cv()
    this.modifCV=new Cv()

    this.cvService.getAllCv().subscribe(data=>{

    this.cvs=data
      console.log(this.cvs)


      }, err => {



    });

    this.div1 = true;
    this.div2 = false;

  }

  showModif(id) {


    this.div1 = false;
    this.div2 = true;
    this.cvService.getCv(id).subscribe(data=>{

      this.modifCV=data





    },error => {






    })
  }

  showAjout() {

    this.div1 = true;
    this.div2 = false;

  }

  public openDetails(content,id) {
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

  public open(content,id) {
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
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  isCollaborateur() {
    return localStorage.getItem("isNotCollaborateur") === "true";}


  reloadCom(){

      this.ngOnInit();




  }


  update(id) {


      this.cvService.editCv(this.modifCV, id).subscribe((data) => {
window.location.reload()

        },
        (err: HttpErrorResponse) => {


        });
    }


  archiverCv() {

    this.OneCv.etat="Archivé"
    this.cvService.editCv(this.OneCv, this.OneCv.id).subscribe((data) => {
        window.location.reload()

      },
      (err: HttpErrorResponse) => {


      });
  }

}

