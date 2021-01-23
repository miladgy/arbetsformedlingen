import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:8080/api/countries";

  constructor(private httpClient: HttpClient) { }
  
  public sendGetRequest(){
    return this.httpClient.get(this.REST_API_SERVER).
    pipe(
      map((countries: []) => {
        return countries;
      }), catchError( error => {
        return throwError( 'Something went wrong!', error );
      })
   )
  }
  
}
