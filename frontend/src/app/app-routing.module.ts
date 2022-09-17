import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenerateNewComponent } from './generate-new/generate-new.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [

  {path:'', component:WelcomeComponent},
  {path:'generate-new', component:GenerateNewComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
