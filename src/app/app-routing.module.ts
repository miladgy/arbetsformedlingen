import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuiformComponent } from './guiform/guiform.component';

const routes: Routes = [
  {path: "guiform", component: GuiformComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
