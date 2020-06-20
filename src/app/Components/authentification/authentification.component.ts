import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from '../../Services/authentification.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {User} from '../../Models/User';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

   isLogError: boolean=false;
   user: User;

  constructor(private authService: AuthentificationService,private router:Router) { }

  ngOnInit(): void {
    this.user=new User();
    if(localStorage.getItem("userToken"))
    {

      this.router.navigate( ["/cvs"])
    }
  }

  Onlogin(){

    this.authService.login(this.user).subscribe(data => {

    localStorage.setItem('userToken',data.access_token)
      this.router.navigate(['/cvs'])

    },
      (err : HttpErrorResponse)=>{
      this.isLogError=true;
      });
  }

}
