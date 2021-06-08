import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthentificationService} from '../../Services/authentification.service';
import {User} from '../../Models/User';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
user:User
  userUpdate:User
   isEditError: boolean=false;
   EmptyField: boolean=false;
  constructor(private authService:AuthentificationService, private router:Router) {
    this.user=new User()
  this.userUpdate=new User()

  }

  ngOnInit() :void
  {    if(localStorage.getItem('userToken')){
      this.authService.getCurrentUser().subscribe(data => {

        this.user=data
        this.user.password=null

        },
        (err : HttpErrorResponse)=>{

        });
    }}

    update(id) {
      if (this.user.currentPassword =="" || this.user.password == "" || this.user.nom === "" || this.user.dateNaissance === null || this.user.prenom === "") {


        this.EmptyField = true;
        this.isEditError = false;


      } else {

        this.userUpdate.role = this.user.role
        console.log(this.user)
        this.authService.editProfil(this.user, id).subscribe(data => {

            this.router.navigate(['/cvs'])

          },
          (err: HttpErrorResponse) => {
            if (err.status === 400) {

              this.isEditError = true;
              this.EmptyField = false;
            }

            if (err.status === 422) {

              this.isEditError = false;
              this.EmptyField = true;
            }


          })
      }
    }

  annuler() {
    this.router.navigate(['/cvs'])
  }
}
