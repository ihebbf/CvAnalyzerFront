import { Component} from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent  {

  files: any = [];
  pdfs: any = [];

  uploadFile(event) {
    for(let index = 0; index < event.length; index++) {
      const element = event[index];
      if(element.type==="application/pdf"){
        this.files.push(element);

      console.log(this.files.length)}

      else {
        alert("Veuillez importer un fichier pdf")
      }

    }
    this.pdfs.push(event)
  }
  deleteAttachment(index) {
    this.files.splice(index, 1);
    console.log(this.files)}

  Importer() {
    console.log(this.files)  }
}

