import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  constructor(private httpClient: HttpClient) { }



  add(offre): Observable<any>
  {

    return this.httpClient.post<any>(`${environment.apiUrl}/offre/add`,JSON.stringify(offre));

  }



  getAllSkills()
  {

    return this.httpClient.get<any>(environment.apiUrl+"/offre/getAllSkills/");


  }

  getAllManager()
  {

    return this.httpClient.get<any>(environment.apiUrl+"/user/getAllManager/");


  }
  getEquipesByManager(id)
  {
    return this.httpClient.get<any>(environment.apiUrl+"/equipe/getByManager/"+id);


  }

  getAllOffre(): Observable<any>
  {

    return this.httpClient.get<any>(environment.apiUrl+"/offre/getAll/");


  }

  getAllActif(): Observable<any>
  {

    return this.httpClient.get<any>(environment.apiUrl+"/offre/getAllActif/");


  }
  getOffre(id): Observable<any>
  {
    return this.httpClient.get<any>(`${environment.apiUrl}/offre/get/`+id)
  }


  getUser(id): Observable<any>
  {
    return this.httpClient.get<any>(`${environment.apiUrl}/user/get/`+id)
  }

  editOffre(offre,id) : Observable<any>
  {

    return this.httpClient.put<any>(environment.apiUrl+"/offre/update/"+id,JSON.stringify(offre));


  }


  search(offre): Observable<any>
  {

    return this.httpClient.post<any>(`${environment.apiUrl}/offre/search`,JSON.stringify(offre));

  }

  matching(id): Observable<any>
  {

    return this.httpClient.get<any>(`${environment.apiUrl}/offre/matching/`+id);

  }
  countCategory(): Observable<any>
  {
    return this.httpClient.get<any>(`${environment.apiUrl}/offre/countCategory`);

  }
}
