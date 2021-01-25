import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GuiformComponent } from './guiform/guiform.component';
import { HttpClientModule } from '@angular/common/http';
import { UploadFilesComponent } from './upload-files/upload-files.component';

@NgModule({
  declarations: [AppComponent, GuiformComponent, UploadFilesComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
