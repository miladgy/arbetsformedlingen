import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  private baseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) { }

  upload(file: Object): Observable<HttpEvent<any>> {
    /* const formData: FormData = new FormData();
    formData.append('file', file); */

    const headers = new HttpHeaders();
      headers.set( 'Content-Type', "application/json");
      headers.set("Access-Control-Request-Method", "POST")
      headers.set("Access-Control-Request-Headers", "x-requested-with")
    const req = new HttpRequest('POST', `${this.baseUrl}/api/samordningsnummer`, file, {
      headers,
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }
}

// ANOTHER IMPLEMENTATION OF UPLOADING, IF NECCESSARY
/* postFile(filesToUpload: any[]): Observable<boolean> {
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
} */