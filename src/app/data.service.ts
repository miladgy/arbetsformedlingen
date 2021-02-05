import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  public sendGetRequest() {
    return this.httpClient.get(`${this.baseUrl}/api/countries`).pipe(
      map((countries: []) => {
        return countries;
      }),
      catchError((error) => {
        return throwError('Something went wrong!', error);
      })
    );
  }

  register(values: FormGroup): Observable<any> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers.set('Access-Control-Request-Method', 'POST');
    headers.set('Access-Control-Request-Headers', 'content-type');
    headers.set('Accept', 'application/json');
    headers.set('Accept', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');

    console.log(values)

    return this.httpClient
      .post(`${this.baseUrl}/api/samordningsnummer`, JSON.stringify(values), {
        headers,
      })
      .pipe(
        map((res) => {
          console.log('e', res);
          return res;
        })
      );
  }
}
