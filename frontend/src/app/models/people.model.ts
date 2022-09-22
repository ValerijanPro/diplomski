import { Line } from "./line.model";

export class PeopleTree{
    
    id:number;
    static broj: number;
    name: string;
    surname: string;
    gender : string;
    date_of_birth: Date;
    place_of_birth: string;
    date_of_death: Date;
    picture: string;
    profession: string;
    other: string;

    mother : PeopleTree;
    father: PeopleTree;
    children: PeopleTree[]; //niz dece, iz razlicitih brakova
    nextSibling: PeopleTree;
    prevSibling: PeopleTree;
    
    partner: PeopleTree[]; //da bi moglo vise partnera, mora niz
    x: number;
    y: number;
    r : number;
    highlighted : boolean;
    lines: Line[];

    owner: string;

    constructor(private ctx: CanvasRenderingContext2D) {
        this.r = 100;
        this.highlighted = false;
        this.lines = [];
        this.partner = [];
        this.children = [];
    }
    getId(){
      return this.id;
    }
    createPerson(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, newX, newY){
      let tmp = new PeopleTree(this.ctx);
      tmp.name = newName;
      tmp.surname = newSurname;
      tmp.date_of_birth = newDateOfBirth;
      tmp.date_of_death = newDateOfDeath;
      tmp.gender = newGender;
      tmp.place_of_birth = newPlaceOfBirth;
      tmp.picture = newPicture;
      //tmp.picture = null;
      tmp.profession = newProfession;
      tmp.x = newX;
      tmp.y = newY;
      if(PeopleTree.broj==null) PeopleTree.broj = 0;
      this.id = PeopleTree.broj+1;
      PeopleTree.broj=PeopleTree.broj + 1;
      return tmp;
    }

    draw() {
        //console.log("Crtam se");
      this.ctx.beginPath();
      this.ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
      if(this.gender.toLowerCase() == "male")
        this.ctx.fillStyle = 'lightblue';
      else if(this.gender.toLowerCase() == "female")
        this.ctx.fillStyle = 'pink';
      if(this.highlighted) {
        this.ctx.fillStyle = 'gold';
      }
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.fillStyle = 'black';
      this.ctx.font = "italic 15px Unknown Font, sans-serif";
      this.ctx.fillText(this.name, this.x-30, this.y+50);   
      this.ctx.fillText(this.surname, this.x-30, this.y+75);
      let str = "";
      str = this.date_of_birth.getDate() + "."+(this.date_of_birth.getMonth()+1)+"."+this.date_of_birth.getFullYear();
      this.ctx.fillText(str, this.x-80, this.y+20);
      this.ctx.fillText(" - ", this.x-5, this.y+20);
      
      if(!this.date_of_death) this.ctx.fillText(" ? ", this.x+25, this.y+20);
      else {
        let str = "";
        str = this.date_of_death.getDate() + "."+(this.date_of_death.getMonth()+1)+"."+this.date_of_death.getFullYear()+"✞";
        this.ctx.fillText(str, this.x+10, this.y+20);
      }
      if(this.picture!=null){
        let temp = new Image();
        temp.src = this.picture;
        this.ctx.drawImage(temp,this.x-35,this.y-80,75,75)
      }
      else{
        //stavi podrazumevanu sliku neku zavisno od pola
      }

      //iscrtaj sve linije
      for(let l of this.lines){
        if(l.kind=="father"){
          //console.log(this.name);
        }
        l.draw();
      }


    }

    drawHighlightedGlitter(sw){
      if(sw==true){
        this.draw();
        return;
      }
      
      this.ctx.beginPath();
      this.ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
      this.ctx.fillStyle = "#FF0000";
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.fillStyle = 'black';
      this.ctx.font = "italic 15px Unknown Font, sans-serif";
      this.ctx.fillText(this.name, this.x-30, this.y+50);   
      this.ctx.fillText(this.surname, this.x-30, this.y+75);
      let str = "";
      str = this.date_of_birth.getDate() + "."+(this.date_of_birth.getMonth()+1)+"."+this.date_of_birth.getFullYear();
      this.ctx.fillText(str, this.x-80, this.y+20);
      this.ctx.fillText(" - ", this.x-5, this.y+20);
      
      if(!this.date_of_death) this.ctx.fillText(" ? ", this.x+25, this.y+20);
      else {
        let str = "";
        str = this.date_of_death.getDate() + "."+(this.date_of_death.getMonth()+1)+"."+this.date_of_death.getFullYear()+"✞";
        this.ctx.fillText(str, this.x+10, this.y+20);
      }
      if(this.picture!=null){
        let temp = new Image();
        temp.src = this.picture;
        this.ctx.drawImage(temp,this.x-35,this.y-80,75,75)
      }
      else{
        //stavi podrazumevanu sliku neku zavisno od pola
      }

      //iscrtaj sve linije
      for(let l of this.lines){
       // if(l.kind=="father"){
          //console.log(this.name);
       // }
        l.draw();
      }
    }

    //parametar 'ovaj' sam dodao da bi moglo dodavanje mame preko brace/sestara pravilno
    addMother(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, newX, newY, ovaj){
      let koji = this;
      
     
      if(ovaj.id != this.id){
        koji = ovaj;
      }
     
      let novoX = newX;
      let novoY = newY;
       /*
      if(novoX-100<0){
       
        this.pomeriSve(300,0);
        this.ctx.canvas.width = this.ctx.canvas.width+300;
        novoX = this.x-300;
      }
      if(novoY-100<0){ 
        //this.ctx.arc(100,100,this.r,0,2*Math.PI);
        //this.ctx.fill();
        //this.ctx.stroke();
        this.pomeriSve(0,300);
        this.ctx.canvas.height = this.ctx.canvas.height+300;
        novoY = this.y-300;
      }
      */
      //add line to mother
      //let nova = new Line(this.ctx, this.x - 70, this.y - 70, novoX + 70, novoY+70,false );
      let t = koji.izracunaj(koji.x, koji.y, novoX, novoY);
      let tt = koji.izracunaj( novoX, novoY, koji.x, koji.y);
      let language = sessionStorage.getItem("language");
      let nova = null;
      if(language=="English")
        nova = new Line(koji.ctx, t[0] , t[1], tt[0] , tt[1],false,'mother' );
      else if(language=="Srpski")
        nova = new Line(koji.ctx, t[0] , t[1], tt[0] , tt[1],false,'мајка' );

      koji.lines.push(nova);

      let tmp = koji.createPerson(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, novoX, novoY);
      koji.mother = tmp;
      tmp.children.push(koji);

      //ako vec postoji tata, onda da ih spojim u vezu
      if(koji.father!=null){
        koji.father.partner.push(  tmp);
        tmp.partner .push(koji.father);
        
        let t = this.izracunaj(koji.mother.x, koji.mother.y, koji.father.x, koji.father.y);
        let tt = this.izracunaj( koji.father.x, koji.father.y, koji.mother.x, koji.mother.y);
        //let nova = new Line(this.ctx, t[0] , t[1], novoX , novoY,true,'partner' );
        let language = sessionStorage.getItem("language");
        let nova = null;
        if(language=="English")
          nova = new Line(koji.ctx, t[0] , t[1], tt[0] , tt[1],true,'partner' );
        else if(language=="Srpski")
          nova = new Line(koji.ctx, t[0] , t[1], tt[0] , tt[1],true,'партнер' );
        koji.mother.lines.push(nova);
        
      }
      sessionStorage.setItem("language",language);
      return tmp;
    
    }
    addFather(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, newX, newY, ovaj){
      
      let koji = this;
      if(ovaj.id != this.id){
        koji = ovaj;
      }

      let novoX = newX;
      let novoY = newY;
       /*
      if(novoX-100<0){
       
        this.pomeriSve(300,0);
        this.ctx.canvas.width = this.ctx.canvas.width+300;
        novoX = this.x-300;
      }
      if(novoY-100<0){ 
        //this.ctx.arc(100,100,this.r,0,2*Math.PI);
        //this.ctx.fill();
        //this.ctx.stroke();
        this.pomeriSve(0,300);
        this.ctx.canvas.height = this.ctx.canvas.height+300;
        novoY = this.y-300;
      }
      */
      //add line to mother
      //let nova = new Line(this.ctx, this.x - 70, this.y - 70, novoX + 70, novoY+70,false );
      let t = koji.izracunaj(koji.x, koji.y, novoX, novoY);
      let tt = koji.izracunaj( novoX, novoY, koji.x, koji.y);
      let language = sessionStorage.getItem("language");
      let nova = null;
      if(language=="English")
        nova = new Line(koji.ctx, t[0] , t[1], tt[0] , tt[1],false,'father' );
      else if(language=="Srpski")
        nova = new Line(koji.ctx, t[0] , t[1], tt[0] , tt[1],false,'отац' );
      


      koji.lines.push(nova);

      let tmp = koji.createPerson(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, novoX, novoY);
      koji.father = tmp;
      tmp.children.push(koji);
  
   
      if(koji.mother!=null){
       
        koji.mother.partner.push(tmp);
        tmp.partner.push(koji.mother);
        
        let t = this.izracunaj(koji.mother.x, koji.mother.y, koji.father.x, koji.father.y);
        let tt = this.izracunaj( koji.father.x, koji.father.y, koji.mother.x, koji.mother.y);
        //let nova = new Line(this.ctx, t[0] , t[1], novoX , novoY,true,'partner' );
        let language = sessionStorage.getItem("language");
        let nova = null;
        if(language=="English")
          nova = new Line(koji.ctx, t[0] , t[1], tt[0] , tt[1],true,'partner' );
        else if(language=="Srpski")
          nova = new Line(koji.ctx, t[0] , t[1], tt[0] , tt[1],true,'партнер' );
        koji.father.lines.push(nova);
      }
      sessionStorage.setItem("language",language);
      return tmp;
    }
    addPartner(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, newX, newY){
      /*
      let novoX =null;
      if(newGender == 'male')
        novoX = this.x+900;
      else 
        novoX = this.x-900;
      let novoY = this.y;
       
      if(novoX-100<0){
       
        this.pomeriSve(700,0);
        this.ctx.canvas.width = this.ctx.canvas.width+700;
        if(newGender == 'male')
          novoX = this.x+900;
        else 
          novoX = this.x-900;
      }
      */
     let novoX = newX;
     let novoY = newY;
      //add line to partner

      let t = this.izracunaj(this.x, this.y, novoX, novoY);
      let tt = this.izracunaj( novoX, novoY, this.x, this.y);
      //let nova = new Line(this.ctx, t[0] , t[1], novoX , novoY,true,'partner' );
       let language = sessionStorage.getItem("language");
      let nova = null;
      if(language=="English")
        nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],true,'partner' );
      else if(language=="Srpski")
        nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],true,'партнер' );
      /*
      let nova = null;
      if(newGender=='male')
        nova = new Line(this.ctx, this.x +100, this.y , novoX -100, novoY,true, 'partner' );
      else 
        nova = new Line(this.ctx, novoX+100, novoY , this.x-100, this.y,true, 'partner' );
      */
      this.lines.push(nova);

      let tmp = this.createPerson(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, novoX, novoY);
      this.partner.push(tmp);
      tmp.partner .push(this);

      if(this.children.length == this.partner.length ){
        let dete = this.children[this.children.length-1];
        
        let t1 = this.izracunaj( dete.x, dete.y,  tmp.x, tmp.y);
        let tt1 = this.izracunaj(  tmp.x, tmp.y,  dete.x, dete.y);
        let nova1 = null;
        if(tmp.gender.toLowerCase()=='male'){
          if(language=="English")
            nova1 = new Line(this.ctx, t1[0] , t1[1], tt1[0], tt1[1], false,'father' );
          else if (language=="Srpski")
            nova1 = new Line(this.ctx, t1[0] , t1[1], tt1[0], tt1[1], false,'отац' );
          this.children[this.children.length-1].father = tmp;
        }
         
        else{
          if(language=="English")
            nova1 = new Line(this.ctx, t1[0] , t1[1], tt1[0] , tt1[1], false,'mother' );
          else if (language=="Srpski")
            nova1 = new Line(this.ctx, t1[0] , t1[1], tt1[0], tt1[1], false,'мајка' );
          
          this.children[this.children.length-1].mother = tmp;
        }
          
        
        this.children[this.children.length-1].lines.push(nova1);
        tmp.children.push(dete);
      }
      sessionStorage.setItem("language",language);
      return tmp;
    
    }
    addSibling(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, newX, newY, ovaj){
      let koji = this;
      if(ovaj.id != this.id){
        koji = ovaj;
      }
      let novoX = newX;
      let novoY = newY;
       /*
      if(novoX-100<0){
       
        this.pomeriSve(300,0);
        this.ctx.canvas.width = this.ctx.canvas.width+300;
        novoX = this.x-300;
      }
      if(novoY-100<0){ 
        //this.ctx.arc(100,100,this.r,0,2*Math.PI);
        //this.ctx.fill();
        //this.ctx.stroke();
        this.pomeriSve(0,300);
        this.ctx.canvas.height = this.ctx.canvas.height+300;
        novoY = this.y-300;
      }
      */
      //add line to mother
      //let nova = new Line(this.ctx, this.x - 70, this.y - 70, novoX + 70, novoY+70,false );
      let t = koji.izracunaj(koji.x, koji.y, novoX, novoY);
      let tt = koji.izracunaj( novoX, novoY, koji.x, koji.y);
      let nova = null;
      let language = sessionStorage.getItem("language");
      if(language=="English")
        nova = new Line(koji.ctx, t[0] , t[1], tt[0] , tt[1],false,'sibling' );
      else if(language=="Srpski")
        nova = new Line(koji.ctx, t[0] , t[1], tt[0] , tt[1],false,'brat/sestra' );

      koji.lines.push(nova);

      let tmp = koji.createPerson(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, novoX, novoY);
      koji.nextSibling = tmp;
      tmp.prevSibling = koji;
      sessionStorage.setItem("language",language);
      return tmp;
    
    }

    addChild(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, newX, newY){
      
      let novoX = newX;
      let novoY = newY;
       /*
      if(novoX-100<0){
       
        this.pomeriSve(300,0);
        this.ctx.canvas.width = this.ctx.canvas.width+300;
        novoX = this.x-300;
      }
      if(novoY-100<0){ 
        //this.ctx.arc(100,100,this.r,0,2*Math.PI);
        //this.ctx.fill();
        //this.ctx.stroke();
        this.pomeriSve(0,300);
        this.ctx.canvas.height = this.ctx.canvas.height+300;
        novoY = this.y-300;
      }
      */
      //add line to mother
      //let nova = new Line(this.ctx, this.x - 70, this.y - 70, novoX + 70, novoY+70,false );
     

      let tmp = this.createPerson(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, novoX, novoY);
      let language = sessionStorage.getItem("language");
      

      if(this.children.length<this.partner.length){
        
        if(this.gender == 'male'){
          tmp.father = this;
          tmp.mother = this.partner[this.children.length];
        }
        else{
          tmp.mother = this;
          tmp.father = this.partner[this.children.length];
          console.log(tmp.father.name);
          console.log(language);
        }

       
        let t = this.izracunaj(this.x, this.y, novoX, novoY);
        let tt = this.izracunaj( novoX, novoY, this.x, this.y);
        let nova = null;
        let nova2 = null;
        if(this.gender == 'male')
        {
          if(language=="English"){
            nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,'father' );
            t = this.izracunaj(novoX, novoY, this.partner[this.children.length].x,this.partner[this.children.length].y);
            tt = this.izracunaj(this.partner[this.children.length].x,this.partner[this.children.length].y,novoX, novoY);
            nova2 = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,'mother' );
          }
            
          else if(language=="Srpski"){
            nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,'отац' );
            t = this.izracunaj(novoX, novoY, this.partner[this.children.length].x,this.partner[this.children.length].y);
            tt = this.izracunaj(this.partner[this.children.length].x,this.partner[this.children.length].y,novoX, novoY);
            nova2 = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,'мајка' );
          }
            
        }
           
        else{
          if(language=="English"){
            nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,'mother' );
            t = this.izracunaj(novoX, novoY, this.partner[this.children.length].x,this.partner[this.children.length].y);
            tt = this.izracunaj(this.partner[this.children.length].x,this.partner[this.children.length].y,novoX, novoY);
            nova2 = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,'father' );
          }
            
          else if(language=="Srpski"){
            nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,'мајка' );
            t = this.izracunaj(novoX, novoY, this.partner[this.children.length].x,this.partner[this.children.length].y);
            tt = this.izracunaj(this.partner[this.children.length].x,this.partner[this.children.length].y,novoX, novoY);
            nova2 = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,'отац' );
          }
        }
         //console.log("Etna "+nova.kind);
         this.partner[this.children.length].children.push(tmp);
        
         
        this.lines.push(nova);
        this.partner[this.children.length].lines.push(nova2);
        this.children.push(tmp);
      }
      else if (this.children.length==this.partner.length){
       
        let q = null;
        if(this.children.length!=0) {
          q = this.children[this.children.length-1];
          while(q.nextSibling!=null){
            q=q.nextSibling;
          }
          q.nextSibling = tmp;
          tmp.prevSibling = q;

          let t = this.izracunaj(q.x, q.y, novoX, novoY);
          let tt = this.izracunaj( novoX, novoY, q.x, q.y);
          let nova = null;
          if(language=="English")
            nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,'sibling' );
          else if(language=="Srpski")
            nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,'брат/сестра' );
          q.lines.push(nova);
        }
        else{
          console.log("Etna");
          if(this.gender == 'male'){
            tmp.father = this;
          }
          else{
            tmp.mother = this;
          }
          this.children.push(tmp);
          let t = this.izracunaj(this.x, this.y, novoX, novoY);
          let tt = this.izracunaj( novoX, novoY, this.x, this.y);
          let nova = null;
          if(this.gender.toLocaleLowerCase()=='male') 
            {
              if(language=="English")
                nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,'father' );
              else if(language=="Srpski")
                nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,'отац' );
            }
          else {
            if(language=="English")
              nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,'mother' );
            else if(language=="Srpski")
              nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,'мајка' );
          }
          
          this.lines.push(nova);
          
        }
        

        
      }

      else if (this.children.length > this.partner.length){
        let q = this.children[this.children.length-1];
        while(q.nextSibling!=null){
          q=q.nextSibling;
        }
        q.nextSibling = tmp;
        tmp.prevSibling = q;

        let t = this.izracunaj(q.x, q.y, novoX, novoY);
        let tt = this.izracunaj( novoX, novoY, q.x, q.y);
        let nova = null;
        
        if(language=="English")
          nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,'sibling' );
        else if(language=="Srpski")
          nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,'брат/сестра' );
        
        
        q.lines.push(nova);
      }
      
      sessionStorage.setItem("language",language);

      return tmp;
      
      
    
    }

    rastojanje (X1,Y1, X2,Y2){
      return Math.sqrt((X2-X1)*(X2-X1)+(Y2-Y1)*(Y2-Y1));
    }
    izracunaj(A,B,C,D){
      let R = (D-B)/(C-A);
      let T = (B*C - A*D) / (C-A);
      let Q = 2 * R * T - 2 * B * R - 2 * A;
      let W = A*A + B*B - 2*B*T + T*T;
      let S = 1+R*R;

      let E1 = ((-1)*Q ) / (2*S) + (Math.sqrt(Q*Q - 4*S * (W-100*100)))/(2*S);
      let E2 = ((-1)*Q ) / (2*S) - (Math.sqrt(Q*Q - 4*S * (W-100*100)))/(2*S);

      let F1 = E1 * ((D-B)/(C-A)) + (B*C-A*D)/(C-A);
      let F2 = E2 * ((D-B)/(C-A)) + (B*C-A*D)/(C-A);

      if(this.rastojanje(E1,F1,C,D) < this.rastojanje(E2,F2,C,D))
        {
          let tmp = [];
          tmp.push(E1);
          tmp.push(F1);
          return tmp;
        }
      else{
        let tmp = [];
          tmp.push(E2);
          tmp.push(F2);
          return tmp;
      }
    }
    
    pomeriSve(x, y){
      const visited = new Set();

      const queue = [this];
      visited.add(this);

      while (queue.length > 0) {

          const node = queue.shift(); // mutates the queue
          
          node.x = node.x + x;
          node.y = node.y + y;
          for(let l of node.lines){
            l.x0 = l.x0 + x;
            l.x1 = l.x1 + x;
            l.y0 = l.y0 + y;
            l.y1 = l.y1 + y;
          }

          const destinations = [];
          if(node.mother != null) destinations.push(node.mother);
          if(node.father != null) destinations.push(node.father);
          if(node.children.length!=0 ) {
            node.children.forEach(element => {
              destinations.push(element);
            });
          }
          if(node.nextSibling != null) destinations.push(node.nextSibling);
          if(node.partner != null) {
            node.partner.forEach(element => {
              destinations.push(element);
            });
          }
          

          for (const destination of destinations) {

            
              
              if (!visited.has(destination)) {
                  visited.add(destination);
                  queue.push(destination);
              }
            
          }

          
      }
      return null;
    }
    isInside(x0,y0){
       return Math.sqrt( Math.pow(x0-this.x,2)+Math.pow(y0-this.y,2)) <= this.r;
    }


    removeNode() {
      if(this.children.length!=0){
      //  console.log("Ovde sam Djole4");
        for (let ind = 0; ind < this.children.length; ind++) {
          if(this.gender.toLowerCase()=='male'){
            let index = 0;
            let i = 0;
            this.children[ind].lines.forEach(line => {
              if(line.kind=='father' || line.kind == 'отац'){
                index = i;
              }
              i = i + 1;
            });
            this.children[ind].lines.splice(index,1);
            this.children[ind].father = null;
          }
          else{
            let index = 0;
            let i = 0;
            this.children[ind].lines.forEach(line => {
              if(line.kind=='mother'|| line.kind == 'мајка'){
                index = i;
              }
              i = i + 1;
            });
            this.children[ind].lines.splice(index,1);
            this.children[ind].mother = null;
          }   
          
        }
        
      }

      if(this.prevSibling!=null){
       // console.log("Ovde sam Djole3");
        let index = 0;
        let i = 0;
        this.prevSibling.lines.forEach(line => {
          if(line.kind=='sibling'){
            index = i;
          }
          i = i + 1;
        });
        this.prevSibling.lines.splice(index,1);
        this.prevSibling.nextSibling=null;
      }

      if(this.partner.length!=0){
       // console.log("Ovde sam Djole2");
        for (let ind = 0; ind < this.partner.length; ind++) {
          let index = 0;
          let i = 0;
          this.partner[ind].lines.forEach(line => {
            if(line.kind=='partner'){
              index = i;
            }
            i = i + 1;
          });
          this.partner[ind].lines.splice(index,1);
         
          this.partner.pop();
        }
        
      }

      if(this.mother!=null){
       
        
        let index = 0;
        let i = 0;
        this.mother.lines.forEach(line => {
          if(line.kind=='mother'|| line.kind == "мајка"){
            index = i;
          }
          i = i + 1;
        });
        this.mother.lines.splice(index,1);
        this.mother.children.pop();
      }
        
      if(this.father!=null){
       
        let index = 0;
        let i = 0;
        this.father.lines.forEach(line => {
          
          if(line.kind=='father' || line.kind == "отац"){
            index = i;
          }
          i = i + 1;
        });
        this.father.lines.splice(index,1);
        this.father.children.pop();
        //this.father.children=null;
      }
        
     // console.log("Duzina "+this.mother.children.length);
      //console.log("asd "+this.mother.children[this.mother.children.length-1].name);
      //this.mother.children[this.mother.children.length-1] = null;
      //this.mother.children.pop();
      //this.father.children.pop()
     // console.log("Duzina "+this.mother.children.length);
      //this.father.children[this.father.children.length-1] = null;
      
      this.mother = null;
      this.father = null;
      this.children = [];
      this.name = null;
      this.surname = null;
      this.date_of_birth = null;
      this.date_of_death = null;
      this.profession = null;
      this.id = null;
      this.highlighted = null;
      this.lines = [];
      this.partner = [];
      this.picture = null;
      this.prevSibling= null;
      this.nextSibling = null;
      this. x = null;
      this.y = null;
      this.r=null;
    }
    

} 