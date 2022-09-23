import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelationsService {

  //s -> sibling
  //f -> father
  //m -> mother
  //c -> child
  uri = 'http://localhost:4000';
  constructor(private http: HttpClient) { 
  }
/*  
  parsePath(node,str, gender){
    let ret = [];
    let tmp = node;
    for(let i=0; i<str.length && tmp!=null; i++){
      let c = str.charAt(i);
      if(c=='s') tmp = tmp.sibling;
      else if(c=='m') tmp = tmp.mother;
      else if(c=='f') tmp = tmp.father;
      else if(c=='c') tmp = tmp.child;
    }
    if(tmp==null ) return null;
    let a = tmp;
    
    while(a!=null){
      if(tmp.gender == gender) ret.push(tmp);
      a = tmp.prevSibling;
    }
    a = tmp.nextSibling;
    while(a!=null){
      if(tmp.gender == gender) ret.push(tmp);
      a = tmp.nextSibling;
    }
    return ret;
  }

  initRelations(){
    this.relations = new Map();
    this.relations.set("father", "f");
    this.relations.set("mother", "m");
    this.relations.set("son", "c");
    this.relations.set("daughter", "c");
    this.relations.set("grandfather",)

  }
  */

 // relations: Map<string, string>;
 getRelative(relativeName, node){
  let ret = [];
  let tmp = node;
  if(relativeName=="father" || relativeName=="отац"){
    if(node.father!=null)
      ret.push(node.father);
  }
  if(relativeName=="mother" || relativeName=="мајка"){
    if(node.mother!=null)
      ret.push(node.mother);
  }
  if(relativeName=="son" || relativeName=="син"){
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
  if(relativeName=="daughter" || relativeName=="ћерка"){
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
  if(relativeName=="grandfather" || relativeName=="деда"){
     let a = node.mother;
     let b = node.father;
     if(a!=null)
      if(a.father!=null)
        ret.push(a.father);
     
     if(b!=null)
      if(b.father!=null)
        ret.push(b.father);
     
    
  }
  if(relativeName=="grandmother" || relativeName=="баба"){
    let a = node.mother;
    let b = node.father;
    if(a!=null)
      if(a.mother!=null)
        ret.push(a.mother);
    
    if(b!=null)
      if(b.mother!=null)
        ret.push(b.mother);
    
    
  }
  if(relativeName=="great grandfather" || relativeName=="прадеда"){
    let a = node.mother;
    let b = node.father;
    if(a!=null){
     let x = a.mother;
     let y = a.father;
     if(x!=null) if(x.father!=null)ret.push(x.father);
     if(y!=null) if(y.father!=null)ret.push(y.father);
    }
    if(b!=null){
      let x = b.mother;
      let y = b.father;
      if(x!=null) if(x.father!=null) ret.push(x.father);
      if(y!=null) if(y.father!=null) ret.push(y.father);
    }
    
  }
  if(relativeName=="great grandmother" || relativeName=="прабаба"){
    let a = node.mother;
    let b = node.father;
    if(a!=null){
     let x = a.mother;
     let y = a.father;
     if(x!=null) if(x.mother!=null)ret.push(x.mother);
     if(y!=null) if(y.mother!=null)ret.push(y.mother);
    }
    if(b!=null){
      let x = b.mother;
      let y = b.father;
      if(x!=null) if(x.mother!=null) ret.push(x.mother);
      if(y!=null) if(y.mother!=null) ret.push(y.mother);
    }
   
  }
  if(relativeName=="great great grandfather" || relativeName=="чукундеда"){
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
  if(relativeName=="great great grandmother" || relativeName=="чукунбаба"){
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

  if(relativeName=="uncle" || relativeName=="стриц"){
    let a = node.father;
    if(a!=null){
      let b = a;
      while(b!=null){
        if(b.gender=="male") ret.push(b);
        b = b.prevSibling;
      }
      b = a.nextSibling;
      while(b!=null){
        if(b.gender=="male") ret.push(b);
        b = b.nextSibling;
      }
    }
  }

  if(relativeName=="aunt" || relativeName=="стрина"){
    let a = node.father;
    let c = node.mother;
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

  if(relativeName=="uncle" || relativeName=="ујак"){
    let a = node.mother;
    if(a!=null){
      let b = a;
      while(b!=null){
        if(b.gender=="male") ret.push(b);
        b = b.prevSibling;
      }
      b = a.nextSibling;
      while(b!=null){
        if(b.gender=="male") ret.push(b);
        b = b.nextSibling;
      }
    }
  }

  if(relativeName=="aunt" || relativeName=="ујна"){
    let a = node.mother;

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

  if(relativeName=="aunt" || relativeName=="тетка"){
    let a = node.mother;
    let b = node.father;

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

  if(relativeName=="uncle" || relativeName=="теча"){
    let a = node.mother;
    let b = node.father;

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
      if(a.gender=="male") ret.push(a);
      a = a.prevSibling;
    }
    a=node.nextSibling;
    while(a!=null){
      if(a.gender=="male") ret.push(a);
      a = a.nextSibling;
    }
  }

  if(relativeName=="sister"){
    let a = node;
    while(a!=null){
      if(a.gender=="female") ret.push(a);
      a = a.prevSibling;
    }
    a=node.nextSibling;
    while(a!=null){
      if(a.gender=="female") ret.push(a);
      a = a.nextSibling;
    }
  }
  return ret;
 }

 saveNode(node){
  const data={
    node: node
  }
  return this.http.post(`${this.uri}/saveNode`, data);
 }
 loadTree(){

 }
}
