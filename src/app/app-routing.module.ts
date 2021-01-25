import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuiformComponent } from './guiform/guiform.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';

const routes: Routes = [
  {path: "guiform", component: GuiformComponent},
  {path: "file-upload", component: UploadFilesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
