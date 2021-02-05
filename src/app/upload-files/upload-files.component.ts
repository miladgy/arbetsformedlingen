import { Component, OnInit } from '@angular/core';
import { UploadFilesService } from '../upload-files.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';

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
  message = '';
  base64result: string
  fileJSON: Object;
  data: any = [];
  @Output() filesEvent = new EventEmitter<any>();


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
          "file": file.name,
          "data":  this.base64result
        }
        this.data.push(fileJSON);
        this.filesEvent.emit(fileJSON);
        return fileJSON
      }
    }
  }

   async uploadFiles() {
    this.message = '';
  
    for (let i = 0; i < this.selectedFiles.length; i++) {
      await this.convertFiletoJSON(this.selectedFiles[i]);
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
          console.log('Filen är helt uppladdad!'); 
          this.message = 'Filen är helt uppladdad!';
        }
      },
      err => {
        this.progressInfos[index].value = 0;
        this.message = 'Det gick inte att ladda upp filen: ' + file.name;
      });
  }

  ngOnInit() {
    
  }

}
