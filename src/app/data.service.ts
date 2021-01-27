import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})


export class DataService {

  private baseUrl = "http://localhost:8080";

  constructor(private httpClient: HttpClient) { }
  
  public sendGetRequest(){
    return this.httpClient.get(`${this.baseUrl}/api/countries`).
    pipe(
      map((countries: []) => {
        return countries;
      }), catchError( error => {
        return throwError( 'Something went wrong!', error );
      })
   )
  }


register(values: FormGroup): Observable<any> {
  const headers = new HttpHeaders();
  headers.set( 'Content-Type', "application/json");
  headers.set("Access-Control-Request-Method", "POST")
  headers.set("Access-Control-Request-Headers", "content-type")
  headers.set('Accept', 'application/json');
  
//   headers.set("Access-Control-Request-Headers", "x-requested-with")
// const req = new HttpRequest('POST', `localhost:8080/api/samordningsnummer`, JSON.stringify(values), {
//   headers,
//   reportProgress: true,
//   responseType: 'json'
// });
//return this.httpClient.request(req);

return this.httpClient
    .post(`${this.baseUrl}/api/samordningsnummer`, JSON.stringify(values), {headers}).pipe(
    map(r => {
      console.log("do I come here")
      console.log("e", r)
      return r;
    })) 
  }
}


  