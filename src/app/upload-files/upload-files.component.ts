import { Component, OnInit } from '@angular/core';
import { UploadFilesService } from '../upload-files.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  selectedFile: File
  selectedFiles: FileList;
  selectedFileName: string;
  progressInfos = [];
  message: string = "";
  base64result: string
  fileJSON: Object;
  fileInfos: Observable<any>;

  constructor(private uploadService: UploadFilesService) { }

  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFile = event.target.files[0];
    this.selectedFileName = (this.selectedFile.name.split(".")[0])
    this.selectedFiles = event.target.files;
  }

  async convertFiletoJSON(file: File){
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = (): Object => 
       { 
        this.base64result = (reader.result as string).split(',')[1];
        const fileJSON: Object = {
          "file": this.selectedFileName,
          "data":  this.base64result
        }
        console.log(fileJSON)
        return fileJSON
      }
    }
  }

  /* convertBase64toJson(file:string, selectedFileName:string){
    const fileJSON: Object = {
      "file": `"${selectedFileName}"`,
      "data":  `"${file}"`
    }
    console.log(fileJSON)
    return fileJSON
  } */

   uploadFiles() {
    this.message = '';
  
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.convertFiletoJSON(this.selectedFiles[i])
      this.upload(i, this.selectedFiles[i]);
    }
  }

  upload(index, file) {
    this.progressInfos[index] = { value: 0, fileName: file.name };
  
    this.uploadService.upload(this.fileJSON).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[index].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');  // POSSIBLY SHOW IT IN THE FRONT
          console.log(event.body);
        }
      },
      err => {
        this.progressInfos[index].value = 0;
        this.message = 'Could not upload the file:' + file.name;  // POSSIBLY SHOW IT IN THE FRONT
      });
  }

  ngOnInit() {    // SHOULD I REMOVE IT IN CASE NOT USING IT?
    
  }

}
