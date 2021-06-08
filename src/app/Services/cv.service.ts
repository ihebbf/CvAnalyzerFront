import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CvService {

  constructor(private httpClient: HttpClient) {
  }


  upload(file) {
    return this.httpClient.post<any>(`${environment.apiUrl}/cv/uploadfiles`, file);
  }

  getAllCv()
  {
    return this.httpClient.get<any>(`${environment.apiUrl}/cv/getAll`)
  }

  getCv(id)
  {
    return this.httpClient.get<any>(`${environment.apiUrl}/cv/get/`+id)
  }

  editCv(cv,id) : Observable<any>
  {

    return this.httpClient.put<any>(environment.apiUrl+"/cv/update/"+id,JSON.stringify(cv));


  }
}


