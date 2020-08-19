import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const address = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})

export class RestService {

  constructor(private httpClient: HttpClient) { }

  GetRequest(serverAddress: string): Observable<any> {
    return this.httpClient.get<any>(address + serverAddress, httpOptions);
  }

  PostRequest(serverAddress: string, info: object): Observable<any> {
    console.log(serverAddress);
    return this.httpClient.post<any>(address + serverAddress, info, httpOptions);
  }

  PutRequest(serverAddress: string, info: object): Observable<any> {
    return this.httpClient.put<any>(address + serverAddress, info, httpOptions);
  }

  DeleteRequest(serverAddress: string): Observable<any> {
    return this.httpClient.delete<any>(address + serverAddress, httpOptions);
  }

}