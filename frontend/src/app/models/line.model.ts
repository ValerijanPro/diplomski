export class Line {



    constructor(private ctx: CanvasRenderingContext2D,
      public x0:number,public y0:number,public x1:number,public y1:number, public love: boolean, public kind: string) {
     
    }
  
    draw() {
     
      this.ctx.beginPath();
      this.ctx.moveTo(this.x0, this.y0);
      this.ctx.lineTo(this.x1, this.y1);
      let t = this.ctx.lineWidth;
      this.ctx.lineWidth = 5;
      this.ctx.stroke();
      this.ctx.lineWidth = t;
      if(this.love){
        
        this.drawHeart((this.x1+this.x0)/2, this.y0-20, (this.x1+this.x0+40)/2, this.y0-20, 40,40, "#ff0000");
      }
      this.ctx.stroke();
      //stilizovati liniju i ovaj tekst za svaki tip veze
      let language = sessionStorage.getItem("language");
      if(!this.love){
          this.ctx.fillText(this.kind, Math.abs( this.x0 + this.x1)/2, Math.abs( this.y0 + this.y1)/2);
      }

    }

    drawHeart(fromx, fromy, tox, toy,lw,hlen,color) {

      var x = fromx;
      var y = fromy;
      var width = lw ;
      var height = hlen;
    
      this.ctx.save();
      this.ctx.beginPath();
      var topCurveHeight = height * 0.3;
      this.ctx.moveTo(x, y + topCurveHeight);
      // top left curve
      this.ctx.bezierCurveTo(
        x, y, 
        x - width / 2, y, 
        x - width / 2, y + topCurveHeight
      );
    
      // bottom left curve
      this.ctx.bezierCurveTo(
        x - width / 2, y + (height + topCurveHeight) / 2, 
        x, y + (height + topCurveHeight) / 2, 
        x, y + height
      );
    
      // bottom right curve
      this.ctx.bezierCurveTo(
        x, y + (height + topCurveHeight) / 2, 
        x + width / 2, y + (height + topCurveHeight) / 2, 
        x + width / 2, y + topCurveHeight
      );
    
      // top right curve
      this.ctx.bezierCurveTo(
        x + width / 2, y, 
        x, y, 
        x, y + topCurveHeight
      );
    
      this.ctx.closePath();
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.restore();
    
    }
    
  }