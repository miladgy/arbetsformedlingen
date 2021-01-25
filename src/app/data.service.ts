import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  postFile(filesToUpload: any[]): Observable<boolean> {
    const endpoint = 'http://localhost:8080/api/samordningsnummer';
    const formData: FormData = new FormData();
    for (var i = 0; i < filesToUpload.length; i++) { 
      formData.append("fileKey", filesToUpload[i]);
    }
   // formData.append('fileKey', filesToUpload, filesToUpload.name);
    return this.httpClient
      .post(endpoint, formData).pipe(
      map(() => { 
        console.log("uploaded successfully") 
        return true
    })
      , catchError((error) => {
        return throwError("something wend wrong in uploading the document", error)
      })
      )
}
  
}
