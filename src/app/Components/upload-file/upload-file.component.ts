import {Component, ViewChild} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CvService} from '../../Services/cv.service';
import {CvsComponent} from '../cvs/cvs.component';
import { NotifierService } from "angular-notifier";

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent  {
  private readonly notifier: NotifierService;

  fd = new FormData();
   Loading: boolean=false;
  @ViewChild('fileInput') fileInput: any;

   verifExtension: boolean=false;
  constructor(notifierService: NotifierService,private cvService:CvService,private router:Router, private modalService: NgbModal) {
  this.notifier=notifierService
  }


  files: any = [];
  pdfs: any = [];

  uploadFile(event) {

    for(let index = 0; index < event.length; index++) {
      const element = event[index];
      if(element.type==="application/pdf"){
        this.files.push(element);

        this.verifExtension=false;
        }


      else {
this.verifExtension=true;      }

    }

  }
  deleteAttachment(index) {

    this.files.splice(index, 1);
    this.fileInput.nativeElement.value = '';




  }


  Importer() {
    this.Loading=true;

    for(let index = 0; index < this.files.length; index++) {


        this.fd.append("files", this.files[index]);
        this.Loading=true;

    }

      this.cvService.upload(this.fd).subscribe(data => {

      this.files=[]
      this.fd.delete('files')
        console.log(data)
          this.Loading=false;
          this.fileInput.nativeElement.value = '';

          this.notifier.notify("success", "L'extraction des CVs a été effectuée avec succès");
          this.notifier.notify("success", "La prediction du domaine des cvs a été effectuée avec succès");


        },
      (err : HttpErrorResponse)=>{
     console.log(err)
        this.files=[]
        this.fd.delete('files')
        this.Loading=false;
        this.fileInput.nativeElement.value = '';

      });




  }


}

