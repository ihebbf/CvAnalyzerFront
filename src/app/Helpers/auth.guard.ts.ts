import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
    if (localStorage.getItem('userToken'))
    {
      if (route.data.roles && route.data.roles==="false") {
        // role not authorised so redirect to home page
        this.router.navigate(['/cvs']);
        return false;
      }
      return true;

    }
    this.router.navigate(['/login']);
    return false;
  }
}
