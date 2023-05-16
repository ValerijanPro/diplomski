import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenerateNewComponent } from '../generate-new/generate-new.component';

@Injectable({
  providedIn: 'root'
})
export class RelationsService {

  uri = 'http://localhost:4000';
  constructor(private http: HttpClient) { 
  }

  getNodeWithId(id){
    return(GenerateNewComponent.getAllNodes().get(id));
  }

  getLeftMostSibling(node){
    let tmp = node;
    while(tmp.prevSibling!=null) tmp=tmp.prevSibling;
    return tmp;
  }
  getRelative(relativeName, node){
  let ret = [];
  let tmp = node;
  if(relativeName=="father"){
    node = this.getLeftMostSibling(node);
    if(node.father!=null)
      ret.push(this.getNodeWithId(node.father));
  }
  if(relativeName=="mother"){
    node = this.getLeftMostSibling(node);
    if(node.mother!=null)
      ret.push(this.getNodeWithId(node.mother));
  }
  if(relativeName=="son"){
    for(let t = 0; t<tmp.children.length; t++){
      let c = tmp.children[t];
      while(c!=null){
        if(c.gender=="male"){
          ret.push(c);
        }
        c=c.nextSibling;
      }
      
    }
    
  }
  if(relativeName=="daughter"){
    for(let t = 0; t<tmp.children.length; t++){
      let c = tmp.children[t];
      while(c!=null){
        if(c.gender=="female"){
          ret.push(c);
        }
        c=c.nextSibling;
      }
      
    }
    
  }
  if(relativeName=="grandfather"){
     node = this.getLeftMostSibling(node);
     let a = this.getNodeWithId(node.mother);
     let b = this.getNodeWithId(node.father);
     if(a!=null)
      if(a.father!=null)
        ret.push(this.getNodeWithId(a.father));
     
     if(b!=null)
      if(b.father!=null)
        ret.push(this.getNodeWithId(b.father));
     
    
  }
  if(relativeName=="grandmother"){
    node = this.getLeftMostSibling(node);
    let a = this.getNodeWithId(node.mother);
    let b = this.getNodeWithId(node.father);
    if(a!=null)
      if(a.mother!=null)
        ret.push(this.getNodeWithId(a.mother));
    
    if(b!=null)
      if(b.mother!=null)
        ret.push(this.getNodeWithId(b.mother));
    
    
  }
  if(relativeName=="great grandfather"){
    node = this.getLeftMostSibling(node);
    let a = this.getNodeWithId(node.mother);
    let b = this.getNodeWithId(node.father);
    if(a!=null){
     let x = this.getNodeWithId(a.mother);
     let y = this.getNodeWithId(a.father);
     if(x!=null) if(x.father!=null)ret.push(this.getNodeWithId(x.father));
     if(y!=null) if(y.father!=null)ret.push(this.getNodeWithId(y.father));
    }
    if(b!=null){
      let x = this.getNodeWithId(b.mother);
      let y = this.getNodeWithId(b.father);
      if(x!=null) if(x.father!=null)ret.push(this.getNodeWithId(x.father));
      if(y!=null) if(y.father!=null)ret.push(this.getNodeWithId(y.father));
    }
    
  }
  if(relativeName=="great grandmother"){
    node = this.getLeftMostSibling(node);
    let a = this.getNodeWithId(node.mother);
    let b = this.getNodeWithId(node.father);
    if(a!=null){
     let x = this.getNodeWithId(a.mother);
     let y = this.getNodeWithId(a.father);
     if(x!=null) if(x.mother!=null)ret.push(this.getNodeWithId(x.mother));
     if(y!=null) if(y.mother!=null)ret.push(this.getNodeWithId(y.mother));
    }
    if(b!=null){
      let x = this.getNodeWithId(b.mother);
      let y = this.getNodeWithId(b.father);
      if(x!=null) if(x.mother!=null)ret.push(this.getNodeWithId(x.mother));
      if(y!=null) if(y.mother!=null)ret.push(this.getNodeWithId(y.mother));
    }
   
  }
  if(relativeName=="great great grandfather"){
    node = this.getLeftMostSibling(node);
    let a = node.mother;
    let b = node.father;
    if(a!=null){
     let x = a.mother;
     let y = a.father;
     if(x!=null) {
      if(x.father!=null){
        let z = x.father;
        if(z.father!=null) ret.push(z.father);
      }
      if(x.mother!=null){
        let z = x.mother;
        if(z.father!=null) ret.push(z.father);
      }
     }
     if(y!=null) {
      if(y.father!=null){
        let z = y.father;
        if(z.father!=null) ret.push(z.father);
      }
      if(y.mother!=null){
        let z = y.mother;
        if(z.father!=null) ret.push(z.father);
      }
     }
    }
    if(b!=null){
      let x = b.mother;
      let y = b.father;
      if(x!=null) {
       if(x.father!=null){
         let z = x.father;
         if(z.father!=null) ret.push(z.father);
       }
       if(x.mother!=null){
         let z = x.mother;
         if(z.father!=null) ret.push(z.father);
       }
      }
      if(y!=null) {
       if(y.father!=null){
         let z = y.father;
         if(z.father!=null) ret.push(z.father);
       }
       if(y.mother!=null){
         let z = y.mother;
         if(z.father!=null) ret.push(z.father);
       }
      }
     }
    
  }
  if(relativeName=="great great grandmother"){
    node = this.getLeftMostSibling(node);
    let a = node.mother;
    let b = node.father;
    if(a!=null){
     let x = a.mother;
     let y = a.father;
     if(x!=null) {
      if(x.father!=null){
        let z = x.father;
        if(z.mother!=null) ret.push(z.mother);
      }
      if(x.mother!=null){
        let z = x.mother;
        if(z.mother!=null) ret.push(z.mother);
      }
     }
     if(y!=null) {
      if(y.father!=null){
        let z = y.father;
        if(z.mother!=null) ret.push(z.mother);
      }
      if(y.mother!=null){
        let z = y.mother;
        if(z.mother!=null) ret.push(z.mother);
      }
     }
    }
    if(b!=null){
      let x = b.mother;
      let y = b.father;
      if(x!=null) {
       if(x.father!=null){
         let z = x.father;
         if(z.mother!=null) ret.push(z.mother);
       }
       if(x.mother!=null){
         let z = x.mother;
         if(z.mother!=null) ret.push(z.mother);
       }
      }
      if(y!=null) {
       if(y.father!=null){
         let z = y.father;
         if(z.mother!=null) ret.push(z.mother);
       }
       if(y.mother!=null){
         let z = y.mother;
         if(z.mother!=null) ret.push(z.mother);
       }
      }
     }
    
  }

  if(relativeName=="стриц"){
    node = this.getLeftMostSibling(node);
    let a = this.getNodeWithId(node.father);
    if(a!=null){
      let b = a;
      while(b!=null){
        if(b.gender=="male" && b.id != node.father) ret.push(b);
        b = b.prevSibling;
      }
      b = a.nextSibling;
      while(b!=null){
        if(b.gender=="male") ret.push(b);
        b = b.nextSibling;
      }
    }
  }

  if(relativeName=="стрина"){
    node = this.getLeftMostSibling(node);
    let a = this.getNodeWithId(node.father);
    let c = this.getNodeWithId(node.mother)
    if(a!=null){
      let b = a;
      while(b!=null){
        if(b.gender=="male") {
          for(let i=0; i<b.partner.length;i++)
            if(c.id!=b.partner[i].id) ret.push(b.partner[i]);
        }
        b = b.prevSibling;
      }
      b = a.nextSibling;
      while(b!=null){
        if(b.gender=="male"){
          for(let i=0; i<b.partner.length;i++)
            if(c.id!=b.partner[i].id) ret.push(b.partner[i]);
        }
        b = b.nextSibling;
      }
    }
  }

  if(relativeName=="ујак"){
    node = this.getLeftMostSibling(node);
    let a = this.getNodeWithId(node.mother);
    if(a!=null){
      let b = a;
      while(b!=null){
        if(b.gender=="male" && b.id != node.father) ret.push(b);
        b = b.prevSibling;
      }
      b = a.nextSibling;
      while(b!=null){
        if(b.gender=="male") ret.push(b);
        b = b.nextSibling;
      }
    }
  }

  if(relativeName=="ујна"){
    node = this.getLeftMostSibling(node);
    let a = this.getNodeWithId(node.mother);

    if(a!=null){
      let b = a;
      while(b!=null){
        if(b.gender=="male") {
          for(let i=0; i<b.partner.length;i++)
            if(a.id!=b.partner[i].id) ret.push(b.partner[i]);
        }
        b = b.prevSibling;
      }
      b = a.nextSibling;
      while(b!=null){
        if(b.gender=="male"){
          for(let i=0; i<b.partner.length;i++)
            if(a.id!=b.partner[i].id) ret.push(b.partner[i]);
        }
        b = b.nextSibling;
      }
    }
  }

  if(relativeName=="тетка"){
    node = this.getLeftMostSibling(node);
    let a = this.getNodeWithId(node.mother);
    let b = this.getNodeWithId(node.father);

    let x = a;
    while(x!=null){
      if(x.gender=="female" && x.id!=a.id) ret.push(x);
      x=x.prevSibling;
    }
    if(a!=null){
      x = a.nextSibling;
      while(x!=null){
        if(x.gender=="female" && x.id!=a.id) ret.push(x);
        x=x.nextSibling;
      }
    }

    x = b;
    while(x!=null){
      if(x.gender=="female") ret.push(x);
      x=x.prevSibling;
    }
    if(b!=null){
      x = a.nextSibling;
      while(x!=null){
        if(x.gender=="female") ret.push(x);
        x=x.nextSibling;
      }
    }
    
  }

  if(relativeName=="теча"){
    node = this.getLeftMostSibling(node);
    let a = this.getNodeWithId(node.mother);
    let b = this.getNodeWithId(node.father);

    let x = a;
    while(x!=null){
      if(x.gender=="female" && x.id!=a.id) {
        for(let i=0; i<x.partner.length; i++)
          ret.push(x.partner[i]);
      }
      x=x.prevSibling;
    }
    if(a!=null){
      x = a.nextSibling;
      while(x!=null){
        if(x.gender=="female" && x.id!=a.id) {
          for(let i=0; i<x.partner.length; i++)
            ret.push(x.partner[i]);
        }
        x=x.nextSibling;
      }
    }

    x = b;
    while(x!=null){
      if(x.gender=="female") {
        for(let i=0; i<x.partner.length; i++)
          ret.push(x.partner[i]);
      }
      x=x.prevSibling;
    }
    if(b!=null){
      x = a.nextSibling;
      while(x!=null){
        if(x.gender=="female") {
          for(let i=0; i<x.partner.length; i++)
            ret.push(x.partner[i]);
        }
        x=x.nextSibling;
      }
    }
    
  }

  if(relativeName=="brother"){
    let a = node;
    while(a!=null){
      if(a.gender=="male" && a.id != node.id) ret.push(a);
      a = a.prevSibling;
    }
    a=node.nextSibling;
    while(a!=null){
      if(a.gender=="male" && a.id != node.id) ret.push(a);
      a = a.nextSibling;
    }
  }

  if(relativeName=="sister"){
    let a = node;
    while(a!=null){
      if(a.gender=="female"&& a.id != node.id) ret.push(a);
      a = a.prevSibling;
    }
    a=node.nextSibling;
    while(a!=null){
      if(a.gender=="female" && a.id != node.id) ret.push(a);
      a = a.nextSibling;
    }
  }
  return ret;
  }

  saveTree(tree) {

    console.log(tree.picture);
    const body = {
      tree: {
        id: tree.id,
        name: tree.name,
        surname: tree.surname,
        gender: tree.gender,
        date_of_birth: tree.date_of_birth,
        picture: tree.picture
      }
    };
  

  
    this.http.post(`${this.uri}/saveTree`, body)
      .subscribe(
        (response) => {
          console.log('Tree saved successfully:', response);
          // Handle success
        },
        (error) => {
          console.error('Failed to save tree:', error);
          // Handle error
        }
      );
  }
  loadTree(){

  }
}
