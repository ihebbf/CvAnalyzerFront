import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {User} from '../Models/User'
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private header: HttpHeaders;

  constructor(private httpClient: HttpClient) { }

  login(user:User) {
    return this.httpClient.post<any>(`${environment.apiUrl}/user/login`,JSON.stringify(user));
  }

getCurrentUser()
{
  return this.httpClient.get<any>(`${environment.apiUrl}/user/secret`,{headers:new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('userToken')})})
}

register(user){

  return this.httpClient.post<any>(`${environment.apiUrl}/user/add`,JSON.stringify(user));

}

editProfil(user,id)
{

  return this.httpClient.put<any>(environment.apiUrl+"/user/update/"+id,JSON.stringify(user));


}



}
