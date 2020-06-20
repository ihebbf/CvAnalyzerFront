import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router} from '@angular/router';
import {FormGroup, FormBuilder, NgForm} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {
  public countries = [];
  // maps the local data column to fields property
  public localFields: Object = { text: 'Name', value: 'Name' };
  // set the placeholder to MultiSelect Dropdown input element
  public localWaterMark: string = 'Choisir skills';
  navigationSubscription
  div1: boolean;
  div2: boolean;
  div3: boolean;
  public value: string[] ;
  public closeResult: string;


  constructor(  private modalService: NgbModal,private router: Router,private fb: FormBuilder) {

    this.countries.push(
      { Name: 'Java'},
      { Name: 'Angular' }

    );

  }



  ngOnInit(): void {
    this.showOffrePage()
  }
  showOffrePage()
  {
    this.div1 = true;
    this.div2 = false;
    this.div3 = false;


  }
  showAjout(){

    this.div1=false;
    this.div2=true;
    this.div3=false;

  }
  showModif(){

    this.div1=false;
    this.div2=false;
    this.div3=true;

  }
  onSubmit(form: NgForm): void {
    console.log(form.value.name);
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
      return  `with: ${reason}`;
    }
  }
}
