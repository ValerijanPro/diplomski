import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private ruter: Router, private translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
    
   }

  ngOnInit(): void {
   
  }
 
  generate(){
    this.ruter.navigate(['generate-new']);
  }
 
  language: string;

  jezik(b){
    if(b==1){
      sessionStorage.setItem("language","English");
      this.language = "English";
    }
    else if (b==2){
      sessionStorage.setItem("language","Srpski");
      this.language = "Srpski";
    }
  }

  switchLanguage(a){
    this.translate.use(a);
    sessionStorage.setItem("language", a);
  }

  isEnglish(){
    return this.language=="English" || this.language==null;
  }

  isSerbian(){
    return this.language=="Srpski";
  }

  tree = "assets/images/treeImage.jpg";

}
