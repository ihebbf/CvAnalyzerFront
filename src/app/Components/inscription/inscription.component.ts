import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../Services/authentification.service';
import {Router} from '@angular/router';
import {User} from '../../Models/User';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  user: User;
  isRegisterError: boolean=false;
   emailExists: boolean=false;
   invalidEmail: boolean=false;
   prefixEmail:string;

  constructor(private authService: AuthentificationService,private router:Router) { }

  ngOnInit(): void {
    this.user=new User();
    if(localStorage.getItem("userToken"))
    {

      this.router.navigate( ["/cvs"])
    }
    const string = "foo";
    const substring = "odo";

    console.log(string.includes(substring));

  }

  OnRegister(){
    if(this.prefixEmail===null || this.prefixEmail===undefined|| this.prefixEmail==="")
    {

      this.emailExists=false;
      this.invalidEmail=false

      this.isRegisterError=true;

    }
    else {

      this.user.role="collaborateur"
      console.log(this.user)
      this.user.email=this.prefixEmail+"@sofrecom.com"
      this.authService.register(this.user).subscribe(data => {

          this.router.navigate(['/login'])

        },
        (err : HttpErrorResponse)=>{
          if(err.status===422)
          {
            this.emailExists=false;
            this.invalidEmail=false

            this.isRegisterError=true;

          }
          else if(err.status===400)
          {
            this.emailExists=true;
            this.invalidEmail=false
            this.isRegisterError=false;
          }

          else if(err.status===406)
          {
            this.emailExists=false;
            this.invalidEmail=true
            this.isRegisterError=false;
          }


        });



    }




  }
}
