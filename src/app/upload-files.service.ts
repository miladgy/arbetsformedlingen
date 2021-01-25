import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const headers = new HttpHeaders();
      headers.set( 'Content-Type', "application/json");
      headers.set("Access-Control-Request-Method", "POST")
      headers.set("Access-Control-Request-Headers", "x-requested-with")
    const req = new HttpRequest('POST', `${this.baseUrl}/api/samordningsnummer`, formData, {
      headers,
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }

  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/`);
  }
}
