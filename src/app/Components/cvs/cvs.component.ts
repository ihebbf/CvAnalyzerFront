import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NavigationEnd, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {CvService} from '../../Services/cv.service';
import {User} from '../../Models/User';
import {Cv} from '../../Models/Cv';

@Component({
  selector: 'app-cvs',
  templateUrl: './cvs.component.html',
  styleUrls: ['./cvs.component.css']
})
export class CvsComponent implements OnInit{
  navigationSubscription
  public closeResult: string;
  div1: boolean;
  div2: boolean;
   cvs: Array<Cv> = []
  OneCv: Cv

  constructor(private modalService: NgbModal, private router: Router, private fb: FormBuilder,private cvService:CvService) {

  }

  ngOnInit(): void{
    this.cvs=[]
    this.OneCv=new Cv()

    this.cvService.getAllCv().subscribe(data=>{

    this.cvs=data
      console.log(this.cvs)


      }, err => {



    });

    this.div1 = true;
    this.div2 = false;

  }

  showModif() {

    this.div1 = false;
    this.div2 = true;

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

  public open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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
}

