import { GenerateNewComponent } from "../generate-new/generate-new.component";
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

    mother : number;
    father: number;
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
        this.mother = null;
        this.father = null;
        this.picture = null;
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
      tmp.id = PeopleTree.broj+1;
      PeopleTree.broj=PeopleTree.broj + 1;
      return tmp;
    }

    draw() {
      //iscrtaj sve linije

      for(let l of this.lines){

        l.draw();
      }
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
     
      let temp = new Image();
      temp.src = this.picture;
      this.ctx.drawImage(temp,this.x-35,this.y-80,75,75)
      
    
      
      


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
    addMother(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, newX, newY, ovaj, translate){
      let koji = this;
      
      if(ovaj.id != this.id){
        koji = ovaj;
      }
      let novoX = newX;
      let novoY = newY;

      let t = koji.izracunaj(koji.x, koji.y, novoX, novoY);
      let tt = koji.izracunaj( novoX, novoY, koji.x, koji.y);
      

      let tmp = koji.createPerson(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, novoX, novoY);
      koji.mother = tmp.id;  
      tmp.children.push(koji);

      let nova = null;

      nova = new Line(koji.ctx, t[0] , t[1], tt[0] , tt[1],false, translate.instant('relatives.mother'), tmp);

      //add line to current node
      koji.lines.push(nova);

      //ako vec postoji tata, onda da ih spojim u vezu
      if(koji.father!=null){
        let otac =  this.getNodeWithId(koji.father);

        tmp.partner.push(otac);
        otac.partner.push(tmp);
        
        let t = this.izracunaj(tmp.x, tmp.y, otac.x, otac.y);
        let tt = this.izracunaj( otac.x, otac.y, tmp.x, tmp.y);
       
        
        let nova = null;

        nova = new Line(koji.ctx, t[0] , t[1], tt[0] , tt[1],true,translate.instant('relatives.partner'), otac );

        tmp.lines.push(nova);
      }
      return tmp;
    }
    addFather(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, newX, newY, ovaj, translate){
      let koji = this;
      
      if(ovaj.id != this.id){
        koji = ovaj;
      }
      let novoX = newX;
      let novoY = newY;

     
      let t = koji.izracunaj(koji.x, koji.y, novoX, novoY);
      let tt = koji.izracunaj( novoX, novoY, koji.x, koji.y);
     
      let tmp = koji.createPerson(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, novoX, novoY);
      koji.father = tmp.id;  
      tmp.children.push(koji);

      let nova = null;

      nova = new Line(koji.ctx, t[0] , t[1], tt[0] , tt[1],false, translate.instant('relatives.father'), tmp );

      //add line to current node
      koji.lines.push(nova);


      //ako vec postoji mama, onda da ih spojim u vezu
      if(koji.mother!=null){
        let majka =  this.getNodeWithId(koji.mother);

        tmp.partner.push(majka);
        majka.partner.push(tmp);
        
        let t = this.izracunaj(tmp.x, tmp.y, majka.x, majka.y);
        let tt = this.izracunaj( majka.x, majka.y, tmp.x, tmp.y);
       
        let nova = null;

        nova = new Line(koji.ctx, t[0] , t[1], tt[0] , tt[1],true, translate.instant('relatives.partner'), majka );

        tmp.lines.push(nova);
      }

      return tmp;
    }
    addPartner(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, newX, newY, translate){
     
      let novoX = newX;
      let novoY = newY;
      //add line to partner

      let t = this.izracunaj(this.x, this.y, novoX, novoY);
      let tt = this.izracunaj( novoX, novoY, this.x, this.y);

      let tmp = this.createPerson(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, novoX, novoY);
      this.partner.push(tmp);
      tmp.partner.push(this);

      let nova = null;

      nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],true,translate.instant('relatives.partner'), tmp );

      this.lines.push(nova);
      //console.log("added lines with heart");
      if(this.children.length == this.partner.length ){

        let dete = this.children[this.children.length-1];
        
        let t1 = this.izracunaj( dete.x, dete.y,  tmp.x, tmp.y);
        let tt1 = this.izracunaj(  tmp.x, tmp.y,  dete.x, dete.y);
        let nova1 = null;
        if(tmp.gender.toLowerCase()=='male'){

            nova1 = new Line(this.ctx, t1[0] , t1[1], tt1[0], tt1[1], false,translate.instant('relatives.father'), tmp );

        }
          
        else{

            nova1 = new Line(this.ctx, t1[0] , t1[1], tt1[0] , tt1[1], false,translate.instant('relatives.mother'), tmp );

        }
        dete.lines.push(nova1);
        tmp.children.push(dete);
      }

      return tmp;
    
    }
    addSibling(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, newX, newY, ovaj, translate){
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
    

      let tmp = koji.createPerson(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, novoX, novoY);
      koji.nextSibling = tmp;
      tmp.prevSibling = koji;

      let nova = null;

      nova = new Line(koji.ctx, t[0] , t[1], tt[0] , tt[1],false,translate.instant('relatives.sibling'), tmp );

      koji.lines.push(nova);

      return tmp;
    
    }

    addChild(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, newX, newY, translate){
      
      let novoX = newX;
      let novoY = newY;

      let tmp = this.createPerson(newName, newSurname, newDateOfBirth, newDateOfDeath, newGender, newPlaceOfBirth, newPicture, newProfession, novoX, novoY);


      if(this.children.length<this.partner.length){
        
        if(this.gender == 'male'){
         // tmp.father = this;
         // tmp.mother = this.partner[this.children.length];
        }
        else{
         // tmp.mother = this;
         // tmp.father = this.partner[this.children.length];
         // console.log(tmp.father.name);
         
        }

       
        let t = this.izracunaj(this.x, this.y, novoX, novoY);
        let tt = this.izracunaj( novoX, novoY, this.x, this.y);
        let nova = null;
        let nova2 = null;
        if(this.gender == 'male')
        {
            nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,translate.instant('relatives.father'), tmp );
            t = this.izracunaj(novoX, novoY, this.partner[this.children.length].x,this.partner[this.children.length].y);
            tt = this.izracunaj(this.partner[this.children.length].x,this.partner[this.children.length].y,novoX, novoY);
            nova2 = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,translate.instant('relatives.mother'), tmp );
        }
           
        else{
            nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,translate.instant('relatives.mother'), tmp );
            t = this.izracunaj(novoX, novoY, this.partner[this.children.length].x,this.partner[this.children.length].y);
            tt = this.izracunaj(this.partner[this.children.length].x,this.partner[this.children.length].y,novoX, novoY);
            nova2 = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,translate.instant('relatives.father'), tmp );
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

          nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,translate.instant('relatives.sibling'), tmp );

          q.lines.push(nova);
        }
        else{
          
          if(this.gender == 'male'){
            tmp.father = this.id;
          }
          else{
            tmp.mother = this.id;
          }
          this.children.push(tmp);
          let t = this.izracunaj(this.x, this.y, novoX, novoY);
          let tt = this.izracunaj( novoX, novoY, this.x, this.y);
          let nova = null;
          if(this.gender.toLocaleLowerCase()=='male') 
          {
              nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,translate.instant('relatives.father'), this );
          }
          else {

            nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,translate.instant('relatives.mother'), this );

          }
          
          tmp.lines.push(nova);
          
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

        nova = new Line(this.ctx, t[0] , t[1], tt[0] , tt[1],false,translate.instant('relatives.sibling'), tmp );

        q.lines.push(nova);
      }

      return tmp;
      
      
    
    }
    

    rastojanje (X1,Y1, X2,Y2){
      return Math.sqrt((X2-X1)*(X2-X1)+(Y2-Y1)*(Y2-Y1));
    }
    //dva kruga, koordinate (A,B) i (C,D)
    //vraca (x,y) koordinate tacke na obimu PRVOG kruga, najblize drugom krugu
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
    checkIfNodeWithIdExists(id){
      return GenerateNewComponent.getAllNodes().has(id);
    }
    pomeriSve(x, y){
      const visited = new Set();

      const queue = [this];
      visited.add(this);

      while (queue.length > 0) {

        const node = queue.shift(); // mutates the queue
        if(node==undefined) break;

        node.x = node.x + x;
        node.y = node.y + y;
        for(let l of node.lines){
          l.x0 = l.x0 + x;
          l.x1 = l.x1 + x;
          l.y0 = l.y0 + y;
          l.y1 = l.y1 + y;
        }
        
        const destinations = [];

        if(this.checkIfNodeWithIdExists(node.mother)) {
          //console.log("mother exists");
          destinations.push(this.getNodeWithId(node.mother));
        }
        if(this.checkIfNodeWithIdExists(node.father)) {
          //console.log("father exists");
          destinations.push(this.getNodeWithId(node.father));
        }
        if(node.children.length!=0 ) {
          node.children.forEach(element => {
            destinations.push(element);
          });
        }
        if(node.nextSibling!=null) {
          destinations.push(node.nextSibling);
        }
        if(node.partner.length!=0 ) {
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

    moveNode(x,y){
      //move the node itself
      this.x = x;
      this.y = y;
      for(let l of this.lines){
        l.x0 = l.x0 + x;
        l.x1 = l.x1 + x;
        l.y0 = l.y0 + y;
        l.y1 = l.y1 + y;
      }

      if(this.mother!=null){
        
      }
      if(this.father!=null){

      }
      //move all lines that are connected to that node
    }
    getNodeWithId(id){
      return(GenerateNewComponent.getAllNodes().get(id));
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
       /* this.mother.lines.forEach(line => {
          if(line.kind=='mother'|| line.kind == "мајка"){
            index = i;
          }
          i = i + 1;
        });
        this.mother.lines.splice(index,1);
        this.mother.children.pop();*/
      }
        
      if(this.father!=null){
       
        let index = 0;
        let i = 0;
       /* this.father.lines.forEach(line => {
          
          if(line.kind=='father' || line.kind == "отац"){
            index = i;
          }
          i = i + 1;
        });*/
        //this.father.lines.splice(index,1);
        //this.father.children.pop();
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