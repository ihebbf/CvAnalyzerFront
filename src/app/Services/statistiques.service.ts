import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {


  constructor(private httpClient: HttpClient) { }

  countOffreCategory(): Observable<any>
  {
    return this.httpClient.get<any>(`${environment.apiUrl}/stat/countOffreCategory`);

  }

  countCvsCategory(): Observable<any>
  {
    return this.httpClient.get<any>(`${environment.apiUrl}/stat/countCVsCategory`);

  }

  countAll(): Observable<any>
  {
    return this.httpClient.get<any>(`${environment.apiUrl}/stat/countAll`);

  }

  countCVPerMonth(): Observable<any>
  {
    return this.httpClient.get<any>(`${environment.apiUrl}/stat/countCVPerMounth`);

  }
  countOffrePerMonth(): Observable<any>
  {
    return this.httpClient.get<any>(`${environment.apiUrl}/stat/countOffrePerMounth`);

  }

}
