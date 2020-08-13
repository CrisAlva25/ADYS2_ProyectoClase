import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

// opciones de http
const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

// direccion de la api
const address = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private httpClient: HttpClient) { }

  GetRequest(service: string): Observable<any> {
    console.log(service);
    return this.httpClient.get<any>(address + service, httpOptions);
  }

  PostRequest(service: string, info: object): Observable<any> {
    console.log(service);
    return this.httpClient.post<any>(address + service, info, httpOptions);
  }

  PutRequest(service: string, info: object): Observable<any> {
    console.log(service);
    return this.httpClient.put(address + service, info, httpOptions);
  }

  DeleteRequest(service: string): Observable<any> {
    console.log(service);
    return this.httpClient.delete<any>(address + service, httpOptions);
  }
}
